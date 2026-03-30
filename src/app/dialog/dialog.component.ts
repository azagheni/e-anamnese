import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

/**
 *
 */
@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {
	@Output() confirmationResult = new EventEmitter();
	@ViewChild('dialog') private dialog: ElementRef | undefined;
	@Input() id = '';
	@Input() description = '';

	/**
	 * Add event listeners and focus button after dialog was fully initialized
	 */
	ngAfterViewInit() {
		if (!this.dialog?.nativeElement.hasAttribute('open')) {
			this.dialog?.nativeElement.showModal();

			this.dialog?.nativeElement.addEventListener('cancel', (event: Event) => {
				this.confirmationResult.emit({ confirm: false, id: this.id });
			});

			this.dialog?.nativeElement.addEventListener('close', (event: Event) => {
				this.confirmationResult.emit({ confirm: false, id: this.id });
			});

			// Need to use plain Javascript here because Angular's focus() does not set
			// the visible focus border.
			document.getElementById('okButton')?.focus({ focusVisible: true } as FocusOptions);
		}
	}

	/**
	 * Handler that escapes from the dialog buttons
	 *
	 * @param event keyboard's keydown event
	 */
	onKeyDown(event: KeyboardEvent): void {
		if (event.code === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			this.confirmationResult.emit({ confirm: false, id: this.id });
		}
	}
}
