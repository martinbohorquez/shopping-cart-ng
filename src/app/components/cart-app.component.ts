import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { CartItem } from '../models/cartItem';
import { CartItemService } from '../services/cart-item.service';
import { SharingDataService } from '../services/sharing-data.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
	selector: 'cart-app',
	standalone: true,
	imports: [NavbarComponent, RouterOutlet],
	templateUrl: './cart-app.component.html',
	styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {
	items: CartItem[] = [];
	total: number = 0;

	constructor(
		private router: Router,
		private sharingDataService: SharingDataService,
		private cartItemService: CartItemService
	) {}

	ngOnInit(): void {
		this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
		this.onAddCart(); //El método realiza una suscripción
		this.onDeleteCart(); //El método realiza una suscripción
	}

	onAddCart(): void {
		this.sharingDataService.productEventEmitter.subscribe((product) => {
			this.items = this.cartItemService.addProduct(this.items, product);
			this.calculateTotal();
			this.saveSession();
			this.router.navigate(['/cart'], {
				state: { items: this.items, total: this.total }
			});
			Swal.fire({
				title: 'Agregado!',
				html: 'Se ha <b><u>agregado</u></b> el item: <strong>' + product.name + '</strong>',
				icon: 'success'
			});
		});
	}

	onDeleteCart(): void {
		this.sharingDataService.idProductEventEmitter.subscribe((id) => {
			const productName = this.cartItemService.findProduct(this.items, id).name;
			Swal.fire({
				title: 'Está seguro que desea eliminar ' + productName + '?',
				html: 'Cuidado el item se <b><u>eliminará</u></b> del carro de compras!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sí, eliminar!'
			}).then((result) => {
				if (result.isConfirmed) {
					this.items = this.cartItemService.removeProduct(this.items, id);
					this.calculateTotal();
					this.saveSession();

					this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
						this.router.navigate(['/cart'], {
							state: { items: this.items, total: this.total }
						});
					});

					Swal.fire({
						title: 'Eliminado!',
						html: 'Se ha <b><u>eliminado</u></b> el item: <strong>' + productName + '</strong>',
						icon: 'success'
					});
				}
			});
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
