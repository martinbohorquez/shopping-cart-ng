import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { CartItem } from '../models/cartItem';
import { CartItemService } from '../services/cart-item.service';
import { SharingDataService } from '../services/sharing-data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { add, remove } from './store/items.action';
import { ItemsState } from './store/items.reducer';

@Component({
	selector: 'cart-app',
	standalone: true,
	imports: [NavbarComponent, RouterOutlet],
	templateUrl: './cart-app.component.html',
	styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {
	items: CartItem[] = [];

	constructor(
		private store: Store<{ items: ItemsState }>,
		private router: Router,
		private sharingDataService: SharingDataService,
		private cartItemService: CartItemService
	) {
		this.store.select('items').subscribe((state) => {
			this.items = state.items;
			this.saveSession();
		});
	}

	ngOnInit(): void {
		this.onAddCart(); //El método realiza una suscripción
		this.onDeleteCart(); //El método realiza una suscripción
	}

	onAddCart(): void {
		this.sharingDataService.productEventEmitter.subscribe((product) => {
			this.store.dispatch(add({ product }));

			this.router.navigate(['/cart']);
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
					this.store.dispatch(remove({ id }));

					this.router.navigate(['/cart']);

					Swal.fire({
						title: 'Eliminado!',
						html: 'Se ha <b><u>eliminado</u></b> el item: <strong>' + productName + '</strong>',
						icon: 'success'
					});
				}
			});
		});
	}

	saveSession(): void {
		sessionStorage.setItem('cart', JSON.stringify(this.items));
	}
}
