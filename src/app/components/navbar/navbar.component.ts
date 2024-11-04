import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { ThemeService } from '../../services/theme.service';

@Component({
	selector: 'navbar',
	standalone: true,
	imports: [],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
	modeIcon!: string;
	@Input() items: CartItem[] = [];

	@Output() openCloseCartEventEmitter: EventEmitter<void> = new EventEmitter();

	constructor(private themeService: ThemeService) {}

	ngOnInit() {
		this.themeService.theme$.subscribe((theme) => {
			this.modeIcon = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
		});
	}

	getTotal(): number {
		return this.items.reduce((acumulator, item) => acumulator + item.quantity, 0);
	}

	openCloseCart(): void {
		this.openCloseCartEventEmitter.emit();
	}

	changeMode(): void {
		this.themeService.toggleTheme();
	}
}
