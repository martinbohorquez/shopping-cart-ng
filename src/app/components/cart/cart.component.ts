import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/cartItem';
import { total } from '../../store/items.action';
import { ItemsState } from '../../store/items.reducer';
import { SharingDataService } from './../../services/sharing-data.service';

@Component({
	selector: 'cart',
	standalone: true,
	imports: [],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
	items: CartItem[] = [];
	total: number = 0;

	constructor(private store: Store<{ items: ItemsState }>, private sharingDataService: SharingDataService) {
		this.store.select('items').subscribe((state) => {
			this.items = state.items;
			this.total = state.total;
		});
	}

	ngOnInit(): void {
		if (this.total == 0) this.store.dispatch(total());
	}

	onDeleteCart(id: number) {
		this.sharingDataService.idProductEventEmitter.emit(id);
	}

	priceFormat(price: number): string {
		return price.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	}

	getTotal(): number {
		return this.items.reduce((acumulator, item) => acumulator + item.quantity, 0);
	}
}
