import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
	selector: 'div[product-card]',
	standalone: true,
	imports: [],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
	@Input() product!: Product;

	constructor(private sharingDataService: SharingDataService) {}

	onAddCart(product: Product) {
		this.sharingDataService.productEventEmitter.emit(product);
	}

	priceFormat(price: number): string {
		return price.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	}
}
