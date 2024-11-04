import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
	selector: 'cart',
	standalone: true,
	imports: [],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css'
})
export class CartComponent {
	@Input() items: CartItem[] = [];
	@Input() total: number = 0;

	@Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();

	onDeleteCart(id: number) {
		this.idProductEventEmitter.emit(id);
	}

	priceFormat(price: number): string {
		return price.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	}
}
