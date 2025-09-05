import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import Utils from '../common/utils';

/**
 * Navigation bar of the app
 */
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
	currentRoute = '';
	private subscription: Subscription = new Subscription();
	public readonly Utils: typeof Utils = Utils;

	/**
	 * Creates a NavbarComponent instance.
	 *
	 * @param router native Angular Router
	 * @param snackBar popup for showing call ended info
	 */
	constructor(
		public router: Router
	) {}

	/**
	 * Subscribes to NavigationEnd events so that currentRoute is always based in the current url.
	 */
	ngOnInit() {
		this.subscription.add(
			this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
				this.currentRoute = (event as NavigationEnd).url;
			})
		);
	}

	/**
	 * Unsubscribes all subscriptions
	 */
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	/**
	 * Check if navigation tab is active
	 *
	 * @param {string} route to be checked
	 * @param {boolean} isDefault set to true for the tab that shall show active if no route is set
	 * @returns {boolean} true if tab is active, otherwise false
	 */
	isTabActive(route: string, isDefault?: boolean) {
		if (this.currentRoute === '/' && isDefault) {
			return true;
		}

		if (this.currentRoute.indexOf(route) === 0) {
			return true;
		}

		return false;
	}
}
