import { afterNextRender, Component, input, signal } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.sass'
})
export class ShoppingCartComponent {
  products = input.required<Product[]>();

  constructor() {
    //this.heavyComputation();
    afterNextRender(() => {
      this.heavyComputation();
      console.log('first render complete');
    });
  }

  private heavyComputation() {
    console.log('Starting heavy computation...');
    const startTime = performance.now();
    let result = 0;
    for (let i = 0; i < 2000000000; i++) {
      result += Math.sqrt(i);
    }
    const endTime = performance.now();
    console.log(`Heavy computation finished in ${endTime - startTime} ms`);
  }

  addToCart(product: Product) {
    alert(`Product added to cart: ${product.name}`);
  }
}
