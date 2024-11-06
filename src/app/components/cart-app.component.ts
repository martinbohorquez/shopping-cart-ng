import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';
import { CartItemService } from '../services/cart-item.service';
import { ProductService } from '../services/product.service';
import { SharingDataService } from '../services/sharing-data.service';
import { CatalogComponent } from './catalog/catalog.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
	selector: 'cart-app',
	standalone: true,
	imports: [CatalogComponent, NavbarComponent, RouterOutlet],
	templateUrl: './cart-app.component.html',
	styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {
	products: Product[] = [];
	items: CartItem[] = [];
	total: number = 0;

	constructor(
		private sharingDataService: SharingDataService,
		private productService: ProductService,
		private cartItemService: CartItemService
	) {}

	ngOnInit(): void {
		this.products = this.productService.findAll();
		this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
		this.calculateTotal();
		this.onAddCart(); //El método realiza una suscripción
		this.onDeleteCart(); //El método realiza una suscripción
	}

	onAddCart(): void {
		this.sharingDataService.productEventEmitter.subscribe((product) => {
			this.items = this.cartItemService.addProduct(this.items, product);
			this.calculateTotal();
			this.saveSession();
		});
	}

	onDeleteCart(): void {
		this.sharingDataService.idProductEventEmitter.subscribe((id) => {
			this.items = this.cartItemService.removeProduct(this.items, id);
			if (this.items.length == 0) {
				sessionStorage.removeItem('cart');
			}
			this.calculateTotal();
			this.saveSession();
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
