/**
 * Utils class
 */
export default class Utils {
	/**
	 * Global variable used to control the small screen layout
	 */
	static isSmallScreen = false;

	/**
	 * Global variable used to control the small screen Height layout
	 */
	static isSmallScreenHeight = false;

	/**
	 * Global variable used to show the header when the small screen Height layout is active
	 */
	static isSmallScreenHeightShowHeader = false;

	/**
	 * Check if input is a valid number
	 *
	 * @param {string} phoneNumber to be checked
	 * @returns {boolean} true
	 */
	static isValidNumber(phoneNumber: string): boolean {
		if (phoneNumber) {
			return /^\+?[\s\-\u2012\u2013\u2014()*.#/0-9]*$/.test(phoneNumber);
		}
		return false;
	}

	/**
	 * Check if input is a valid e-mail
	 *
	 * @param {string} eMail to be checked
	 * @returns {boolean} true
	 */
	static isValidEMail(eMail: string): boolean {
		if (eMail) {
			return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(eMail);
		}
		return false;
	}

	/**
	 * Check the Edge browser
	 *
	 * @returns {boolean} true for Edge
	 */
	static isEdge() {
		const agent = window.navigator.userAgent.toLowerCase();
		return agent.indexOf('edge') > -1;
	}

	/**
	 * Check the Opera browser
	 *
	 * @returns {boolean} true for Opera
	 */
	static isOpera() {
		const agent = window.navigator.userAgent.toLowerCase();
		return agent.indexOf('opr') > -1 && !!(<any>window).opr;
	}

	/**
	 * Check the Chrome browser
	 *
	 * @returns {boolean} true for Chrome
	 */
	static isChrome() {
		const agent = window.navigator.userAgent.toLowerCase();
		return agent.indexOf('chrome') > -1 && !!(<any>window).chrome;
	}

	/**
	 * Check the IE browser
	 *
	 * @returns {boolean} true for Internet Explorer
	 */
	static isIe() {
		const agent = window.navigator.userAgent.toLowerCase();
		return agent.indexOf('trident') > -1;
	}

	/**
	 * Check the Firefox browser
	 *
	 * @returns {boolean} true for Firefox
	 */
	static isFirefox() {
		const agent = window.navigator.userAgent.toLowerCase();
		return agent.indexOf('firefox') > -1;
	}

	/**
	 * Check the Safari browser
	 *
	 * @returns {boolean} true for Safari
	 */
	static isSafari() {
		const agent = window.navigator.userAgent.toLowerCase();
		return agent.indexOf('safari') > -1;
	}

	/**
	 * Check if is Mac OS
	 *
	 * @returns {boolean} true for MacOS
	 */
	static isMacOs() {
		return navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
	}

	/**
	 * get browser accesskey
	 *
	 * @returns {string} access key
	 */
	static getAccesskey(): string {
		let accesskey = 'Alt';
		if (this.isFirefox()) {
			accesskey = 'Shift+' + accesskey;
		}
		if (this.isMacOs()) {
			accesskey = '⌘+' + accesskey;
		}
		return accesskey;
	}
}
