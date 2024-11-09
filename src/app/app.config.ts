import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ProductsEffects } from './store/effects/products.effects';
import { itemsReducer } from './store/items.reducer';
import { productsReducer } from './store/products.reducer';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideStore({
			items: itemsReducer,
			products: productsReducer
		}),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideEffects(ProductsEffects)
	]
};
