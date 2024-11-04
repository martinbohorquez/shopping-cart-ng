import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';
import { CartItemService } from '../services/cart-item.service';
import { ProductService } from '../services/product.service';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
	selector: 'cart-app',
	standalone: true,
	imports: [CatalogComponent, CartComponent, NavbarComponent],
	templateUrl: './cart-app.component.html',
	styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {
	products: Product[] = [];
	items: CartItem[] = [];
	total: number = 0;
	showCart: boolean = false;

	constructor(private productService: ProductService, private cartItemService: CartItemService) {}

	ngOnInit(): void {
		this.products = this.productService.findAll();
		this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
		this.calculateTotal();
	}

	onAddCart(product: Product): void {
		this.items = this.cartItemService.addProduct(this.items, product);
		this.calculateTotal();
		this.saveSession();
	}

	onDeleteCart(id: number): void {
		this.items = this.cartItemService.removeProduct(this.items, id);
		this.calculateTotal();
		this.saveSession();
		if (this.items.length == 0) {
			sessionStorage.removeItem('cart');
		}
	}

	saveSession(): void {
		sessionStorage.setItem('cart', JSON.stringify(this.items));
	}

	openCloseCart(): void {
		this.showCart = !this.showCart;
	}

	calculateTotal(): void {
		this.total = this.items.reduce((accumulator, item) => {
			return accumulator + item.quantity * item.product.price;
		}, 0);
	}
}
