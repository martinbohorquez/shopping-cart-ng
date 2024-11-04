import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private themeSubject = new BehaviorSubject<string>(this.detectTheme());
	theme$ = this.themeSubject.asObservable();

	constructor(@Inject(DOCUMENT) private document: Document) {
		this.setInitialTheme();
	}

	detectTheme(): string {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	private setInitialTheme() {
		this.document.body.setAttribute('data-bs-theme', this.themeSubject.value);
	}

	toggleTheme(): void {
		const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
		this.themeSubject.next(newTheme);
		this.document.body.setAttribute('data-bs-theme', newTheme);
	}
}
