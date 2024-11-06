import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
	selector: 'catalog',
	standalone: true,
	imports: [ProductCardComponent],
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
	products!: Product[];

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.products = this.productService.findAll();
	}
}
