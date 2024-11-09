import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { products } from './../data/product.data';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	constructor() {}

	findAll(): Observable<Product[]> {
		return of(products);
	}
}
