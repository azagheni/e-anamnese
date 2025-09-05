import { Router } from '@angular/router';
import { NavCallInProgress } from '../models/nav-call-in-progress';
import { NavConferenceInProgress } from '../models/nav-conference-in-progress';
import { CallService } from '../services/call.service';
import { CallState } from '../models/call/call-in-progress-data';

/**
 * Shortcuts class
 */
export default class Shortcuts {
	/**
	 * perform accesskey navigation
	 * @param router Angular router
	 * @param route route destination
	 * @param fragment fragment data of destination
	 */
	static navigate(router: Router, route: string, fragment: string) {
		router.navigate([route], { fragment: fragment });
	}

	/**
	 * new call
	 *
	 * @param router native Angular Router
	 * @param navCalls current calls
	 * @param navConferences current conference
	 */
	static newCall(router: Router, navCalls: NavCallInProgress[], navConferences: NavConferenceInProgress) {
		if (navCalls.length === 0 && navConferences.conference.data.participants.length === 0) {
			router.navigate(['call-control'], { fragment: 'search-input' });
		}
	}

	/**
	 * Show call in active state
	 *
	 * @param router native Angular Router
	 * @param navCalls current calls
	 * @param navConferences current conference
	 */
	static showActiveCall(router: Router, navCalls: NavCallInProgress[], navConferences: NavConferenceInProgress) {
		//	first action after triggering the shortcut is placing the focus outside the main view,
		//		as to force the screen reader to read new information when the main veiw reagains focus
		document.getElementById('navigation-shortcut-helper')?.focus();
		const currentRoute: string = router.url;
		//	´pageAlreadyOpen´ checks for if the page for the call the user is trying to access is already open
		//	This check is important, as it defines if this function will have to redirect focus in order to launch the screen reading,
		//		or if the action of focus redirection will be delegated to the component initiators
		let pageAlreadyOpen: boolean;

		// check if there is an active call
		for (const navCall of navCalls) {
			if (navCall.call.state == CallState.CONNECTED) {
				//	definition of ´pageAlreadyOpen´, after the call to be accessed is found
				pageAlreadyOpen = currentRoute.indexOf('/call-control/' + navCall.call.uid) > -1;
				document.getElementById('redirect-shortcut-to-a-call')?.focus();
				router.navigate(['call-control', navCall.call.uid]).then((navigated) => {
					if (navigated && pageAlreadyOpen) {
						setTimeout(() => {
							document.getElementById('main')?.focus();
						}, 100);
					}
				});
				return;
			}
		}
		// if there is a conference, set focus on it
		if (navConferences.conference.data.title && navConferences.conference.type === 'PBX') {
			//	definition of ´pageAlreadyOpen´, after the conference to be accessed is found
			pageAlreadyOpen = currentRoute.indexOf('/call-control/conference') > -1;
			document.getElementById('redirect-shortcut-to-a-call')?.focus();
			router.navigate(['call-control', 'conference']).then((navigated) => {
				if (navigated && pageAlreadyOpen) {
					setTimeout(() => {
						document.getElementById('main')?.focus();
					}, 100);
				}
			});
			return;
		}

		if (navCalls.length) {
			//	if no active call was found, but there is still an ongoing call, then a call in the waiting state will have to be opened
			this.showWaitingCall(router, navCalls, navConferences);
		} else {
			router.navigate(['call-control']);
		}
	}

	/**
	 * Show call in waiting state
	 *
	 * @param router native Angular Router
	 * @param navCalls current calls
	 * @param navConferences current conference
	 */
	static showWaitingCall(router: Router, navCalls: NavCallInProgress[], navConferences: NavConferenceInProgress) {
		//	first action after triggering the shortcut is placing the focus outside the main view,
		//		as to force the screen reader to read new information when the main veiw reagains focus
		document.getElementById('navigation-shortcut-helper')?.focus();
		const currentRoute: string = router.url;
		//	´pageAlreadyOpen´ checks for if the page for the call the user is trying to access is already open
		//	This check is important, as it defines if this function will have to redirect focus in order to launch the screen reading,
		//		or if the action of focus redirection will be delegated to the component initiators
		let pageAlreadyOpen: boolean;

		// check if there is a non-active call
		for (const navCall of navCalls) {
			if (navCall.call.state == CallState.HOLD) {
				//	definition of ´pageAlreadyOpen´, after the call to be accessed is found
				pageAlreadyOpen = currentRoute.indexOf('/call-control/' + navCall.call.uid) > -1;
				document.getElementById('redirect-shortcut-to-a-call')?.focus();
				router.navigate(['call-control', navCall.call.uid]).then((navigated) => {
					if (navigated && pageAlreadyOpen) {
						setTimeout(() => {
							document.getElementById('main')?.focus();
						}, 100);
					}
				});
				return;
			}
			if (navCall.call.state != CallState.CONNECTED) {
				//	definition of ´pageAlreadyOpen´, after the call to be accessed is found
				pageAlreadyOpen = currentRoute.indexOf('/call-control/' + navCall.call.uid) > -1;
				document.getElementById('redirect-shortcut-to-a-call')?.focus();
				router.navigate(['call-control', navCall.call.uid]).then((navigated) => {
					if (navigated && pageAlreadyOpen) {
						setTimeout(() => {
							document.getElementById('main')?.focus();
						}, 100);
					}
				});
				return;
			}
		}
		// if there is a conference, set focus on it
		if (navConferences.conference.data.title && navConferences.conference.type === 'PBX') {
			//	if no active call was found, but there is still an ongoing call, then a call in the waiting state will have to be opened
			pageAlreadyOpen = currentRoute.indexOf('/call-control/conference') > -1;
			document.getElementById('redirect-shortcut-to-a-call')?.focus();
			router.navigate(['call-control', 'conference']).then((navigated) => {
				if (navigated && pageAlreadyOpen) {
					setTimeout(() => {
						document.getElementById('main')?.focus();
					}, 100);
				}
			});
			return;
		}

		if (navCalls.length) {
			//	if no waiting call was found, but there is still an ongoing call, then a call in the active state will have to be opened
			this.showActiveCall(router, navCalls, navConferences);
		} else {
			router.navigate(['call-control']);
		}
	}

	/**
	 * Accept call
	 *
	 * @param router native Angular Router
	 * @param callService service providing call data
	 * @param navCalls current calls
	 * @param navConferences current conference
	 */
	static acceptCall(
		router: Router,
		callService: CallService,
		navCalls: NavCallInProgress[],
		navConferences: NavConferenceInProgress
	) {
		const callId = this.getCallId(router, navCalls, navConferences);
		if (callId) {
			callService.acceptCall(callId).subscribe();
		}
	}

	/**
	 * Drop call
	 *
	 * @param router native Angular Router
	 * @param callService service providing call data
	 * @param navCalls current calls
	 * @param navConferences current conference
	 */
	static dropCall(
		router: Router,
		callService: CallService,
		navCalls: NavCallInProgress[],
		navConferences: NavConferenceInProgress
	) {
		const callId = this.getCallId(router, navCalls, navConferences);
		if (callId) {
			callService.dropCall(callId).subscribe();
		}
	}

	/* istanbul ignore next */
	/**
	 * Get callId to handle the call action
	 *
	 * @param router native Angular Router
	 * @param navCalls current calls
	 * @param navConferences current conference
	 * @returns {string} current CallID or empty if no call was found
	 */
	static getCallId(router: Router, navCalls: NavCallInProgress[], navConferences: NavConferenceInProgress): string {
		const pathArr = router.url.split('/');
		let uid = '';

		if (pathArr.length > 2) {
			uid = pathArr[pathArr.length - 1].split('#')[0];
			uid = uid.split('?')[0];
		}

		// If the call is being showed, handle the action to it
		if (uid) {
			if (uid === 'conference') {
				const idx = navConferences.conference.data.participants.findIndex((participant) => participant.isDeviceA);
				if (idx > -1) {
					const id = navConferences.conference.data.participants[idx].id;
					return id;
				}
			}
			for (const navCall of navCalls) {
				if (uid === navCall.call.uid) {
					return navCall.call.connectionId;
				}
			}
		}

		// call is not being showed, handle action for active call
		for (const navCall of navCalls) {
			if (navCall.call.active === true) {
				return navCall.call.connectionId;
			}
		}
		if (navConferences.conference.data.title && navConferences.conference.type === 'PBX') {
			const idx = navConferences.conference.data.participants.findIndex((participant) => participant.isDeviceA);
			if (idx > -1) {
				const id = navConferences.conference.data.participants[idx].id;
				return id;
			}
		}

		// no call was found, return empty
		return '';
	}
}
