import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
	selector: 'catalog',
	standalone: true,
	imports: [ProductCardComponent],
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.css'
})
export class CatalogComponent {
	products!: Product[];

	constructor(private sharingDataService: SharingDataService, private router: Router) {
		this.products = this.router.getCurrentNavigation()?.extras.state!['products'];
	}
}
