import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
	selector: 'div[product-card]',
	standalone: true,
	imports: [],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
	@Input() product!: Product;

	@Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

	onAddCart(product: Product) {
		this.productEventEmitter.emit(product);
	}

	priceFormat(price: number): string {
		return price.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	}
}
