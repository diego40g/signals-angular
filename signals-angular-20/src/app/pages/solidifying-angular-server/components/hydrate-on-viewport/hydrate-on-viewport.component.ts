import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { HydrateRestService } from '../../services/hydrate-rest.service';
import { LoadingIndicatorComponent } from '@app/shared/components/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-hydrate-on-viewport',
  standalone: true,
  imports: [CommonModule, ShoppingCartComponent, LoadingIndicatorComponent],
  templateUrl: './hydrate-on-viewport.component.html',
  styleUrl: './hydrate-on-viewport.component.sass'
})
export class HydrateOnViewportComponent {
  productsService = inject(HydrateRestService)
}