import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
	selector: 'catalog',
	standalone: true,
	imports: [ProductCardComponent],
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.css'
})
export class CatalogComponent {
	@Input() products!: Product[];
	@Input() showCart!: boolean;

	@Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

	onAddCart(product: Product) {
		this.productEventEmitter.emit(product);
	}
}
