import { Component, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-anamnese';
  private swUpdate = inject(SwUpdate);
	needToReload = false;
	swDownloadInProgress = false;
	startPeriodicalUpdateCheck: any = null; // Needed for unit testing
  popupText = '';
	showReloadConfirmationPopup = false;
  readonly FIRST_UPDATE_CHECK = 20 * 1000; // 20 seconds
  readonly UPDATE_CHECK_INTERVAL =  1 * 60 * 1000; // 1 minute

	ngOnInit() {
    console.log('[AppComponent] =============== Initializing app ===============');
    // Catch update related events
    if (window.location.hostname === 'localhost') {
      console.log('Running on localhost domain - skipping Service Worker update checks!');
    } else {
      console.log('Not running on localhost domain - starting Service Worker update checks!');
      this.swUpdate.versionUpdates.subscribe((event) => {
			switch (event.type) {
				case 'VERSION_DETECTED':
					console.log(`[AppComponent] New Service Worker version detected. Downloading ...`);
					this.swDownloadInProgress = true;
					break;

				case 'VERSION_READY':
					console.log(`[AppComponent] New Service Worker version is ready to use. Asking user to reload ...`);
					this.needToReload = true;
					this.popupText = 'Uma nova versão do questionário está disponível. Por favor, recarregue a página para concluir a atualização do software!';
					this.showReloadConfirmationPopup = true;
					this.swDownloadInProgress = false;
					break;

				/* istanbul ignore next */
				case 'VERSION_INSTALLATION_FAILED':
					console.log(`[AppComponent] Failed to install new Service Worker!`);
					break;
			  }
      });

      /* istanbul ignore next */
      this.swUpdate.unrecoverable.subscribe((event) => {
        console.log(`[AppComponent] An error occured during Service Worker update. Please reload the app manually!`);
      });

      // Check for new Service Worker after FIRST_UPDATE_CHECK ms and then periodically after
      // every UPDATE_CHECK_INTERVAL ms
      this.startPeriodicalUpdateCheck = () => {
        timer(this.FIRST_UPDATE_CHECK, this.UPDATE_CHECK_INTERVAL).subscribe(async () => {
          if (this.swDownloadInProgress) {
            console.log(`[AppComponent] Skipping Service Worker update check. Download in progress!`);
            return;
          }

          /* istanbul ignore next */
          try {
            // According to the spec, a service worker will not run after the user did a hard refresh
            // (SHIFT-F5).This strange behavior also means that we can't start the
            // update check for the Service Worker. There is a workaround described here, on how to
            // un-register and then re-register the Service Worker after a hard reload in order to get
            // running:
            // See https://stackoverflow.com/questions/51597231/register-service-worker-after-hard-refresh
            // Nevertheless the Service Worker doesn't seem to run as it should after this procedure. Even
            // though it should then be registered, notification popups don't work. There is an error telling
            // that there is no Service Worker registration. So the only way to get it working properly is,
            // to ask the user to reload again after SHIFT-F5 (hard reload) was pressed. Very ugly!
            if (!navigator.serviceWorker.controller) {
              console.log(`[AppComponent] Service Worker is not running! User probably did a hard refresh (SHIFT-F5)!`);
              console.log(`[AppComponent] Unregistering existing Service Worker ...`);
              const registrations = await navigator.serviceWorker.getRegistrations();
              await Promise.all(registrations.map((r) => r.unregister()));

              console.log(`[AppComponent] Trying to re-registering Service Worker ...`);
              const registration = await navigator.serviceWorker.register('ngsw-worker.js');

              if (registration) {
                console.log(`[AppComponent] Successfully re-registered Service Worker.`);
                console.log(
                  `[AppComponent] Service Worker is not fully functional yet (e.g. popups don't work)! Asking user to reload ...`
                );
                //this.needToReload = true;
                //this.popupText = 'Por favor, recarregue a página para concluir a atualização do software!';
                //this.showReloadConfirmationPopup = true;
              } else {
                console.log(`[AppComponent] Failed to re-register Service Worker.`);
                return;
              }
            }

            console.log(`[AppComponent] Checking for Service Worker update ...`);

            this.swUpdate.checkForUpdate().then((updateFound) => {
              if (!updateFound) {
                console.log(
                  `[AppComponent] Service Worker is up to date${
                    this.needToReload ? ' (reload pending!!)' : ''
                  }. Next check in ${this.UPDATE_CHECK_INTERVAL / 60000} minutes.`
                );
              } else {
                // Don't do anything if a new Service Worker update was already
                // signaled by an event. The problem is that after doing a hard reload
                // (SHIFT-F5) and then re-registering the Service Worker, the events do not
                // fire (only after F5). In that case we handle the update here.
                if (!this.swDownloadInProgress && !this.needToReload) {
                  console.log(`[AppComponent] Downloaded new Service Worker version. Asking user to reload ...`);
                  this.needToReload = true;
                  this.popupText = 'Por favor, recarregue a página para concluir a atualização do software!';
                  this.showReloadConfirmationPopup = true;
                }
              }
            });
          } catch (err) {
            console.log(`[AppComponent] Failed to check for Service Worker update: ${err}`);
          }
        });
      };

      this.startPeriodicalUpdateCheck();
    }
	}

	/* istanbul ignore next */
	reloadPage = () => {
		// Need for unit testing
		location.reload();
	};

	/**
	 * Handle result of Service Worker update popup
	 * @param event Service Worker update popup result
	 */
	handleServiceWorkerUpdatePopupResult(event: any): void {
		if (event.confirm) {
			console.log('[AppComponent] User confirmed app reload.');
			this.reloadPage();
		} else {
			console.log('[AppComponent] User denied app reload.');
			this.showReloadConfirmationPopup = false;
		}
	}
}
