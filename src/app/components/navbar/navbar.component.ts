import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { ThemeService } from '../../services/theme.service';

@Component({
	selector: 'navbar',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
	modeIcon!: string;
	@Input() items: CartItem[] = [];
	@Input() total: number = 0;

	constructor(private themeService: ThemeService) {}

	ngOnInit() {
		this.themeService.theme$.subscribe((theme) => {
			this.modeIcon = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
		});
	}

	getTotal(): number {
		return this.items.reduce((acumulator, item) => acumulator + item.quantity, 0);
	}

	changeMode(): void {
		this.themeService.toggleTheme();
	}
}
