import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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

	ngOnChanges(changes: SimpleChanges): void {
		let itemsChanges = changes['items'];
		this.calculateTotal();
		if (!itemsChanges.isFirstChange()) {
			this.saveSession();
		}
	}

	onDeleteCart(id: number) {
		this.idProductEventEmitter.emit(id);
	}

	priceFormat(price: number): string {
		return price.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	}

	calculateTotal(): void {
		this.total = this.items.reduce((accumulator, item) => {
			return accumulator + item.quantity * item.product.price;
		}, 0);
	}

	saveSession(): void {
		sessionStorage.setItem('cart', JSON.stringify(this.items));
	}
}
