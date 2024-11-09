import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.action';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from './../../models/product';

@Component({
	selector: 'catalog',
	standalone: true,
	imports: [ProductCardComponent],
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
	products!: Product[];

	constructor(private store: Store<{ products: any }>) {
		this.store.select('products').subscribe((state) => (this.products = state.products));
	}

	ngOnInit(): void {
		this.store.dispatch(load());
	}
}
