import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

@Injectable({
	providedIn: 'root'
})
export class CartItemService {
	constructor() {}

	addProduct(items: CartItem[], product: Product): CartItem[] {
		const hasItem = items.find((item: CartItem) => item.product.id === product.id);
		if (hasItem) {
			return items.map((item: CartItem) => {
				if (item.product.id === product.id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
		} else {
			return [...items, { product: { ...product }, quantity: 1 }];
		}
	}

	removeProduct(items: CartItem[], id: number): CartItem[] {
		return items.filter((item) => item.product.id != id);
	}

	findProduct(items: CartItem[], id: number): Product {
		return items.find((item) => item.product.id == id)!.product;
	}
}
