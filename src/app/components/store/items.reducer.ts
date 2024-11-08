import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../models/cartItem';
import { CartItemService } from './../../services/cart-item.service';
import { add, remove, total } from './items.action';

export interface ItemsState {
	items: CartItem[];
	total: number;
}

const cartItemService = new CartItemService();

export const initialState: ItemsState = {
	items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
	total: 0
};

export const itemsReducer = createReducer(
	initialState,
	on(add, (state, { product }) => {
		const updatedItems = cartItemService.addProduct(state.items, product);
		const newTotal = calculateTotal(updatedItems);
		return {
			...state,
			items: updatedItems,
			total: newTotal
		};
	}),

	on(remove, (state, { id }) => {
		const updatedItems = cartItemService.removeProduct(state.items, id);
		const newTotal = calculateTotal(updatedItems);
		return {
			...state,
			items: updatedItems,
			total: newTotal
		};
	}),

	on(total, (state) => {
		return {
			...state,
			total: calculateTotal(state.items)
		};
	})
);

function calculateTotal(items: CartItem[]): number {
	return items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
}
