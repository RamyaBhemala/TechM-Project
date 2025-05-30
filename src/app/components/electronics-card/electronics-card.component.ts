import { Component, Input } from '@angular/core';
import CatalogProduct from '../../model/CatalogProduct';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import CartProduct, { Severity } from '../../model/CartProduct';
import { ToastService } from '../../services/toast/toast.service';
import { CartService } from '../../services/cart/cart.service';
import { ElectronicsColorPipe } from '../../pipes/electronics-color/electronics-color.pipe';

@Component({
  selector: 'app-electronics-card',
  standalone: true,
  imports: [CommonModule, ElectronicsColorPipe],
  templateUrl: './electronics-card.component.html',
  styleUrl: './electronics-card.component.scss',
})
export class ElectronicsCardComponent {
  constructor(
    private router: Router,
    private toastService: ToastService,
    private cartService: CartService
  ) {}

  @Input() product!: CatalogProduct;

  redirectToShopDetails(id: string) {
    this.router.navigate([`/shop/${id}`]);
  }

  addToCart(event: Event) {
    event.stopPropagation(); // Prevent navigation when clicking the add to cart button
    
    this.cartService.addToCart(this.product);
    this.toastService.displayGenericToast({
      severity: Severity.success,
      summary: 'Success',
      detail: 'Product added to cart',
    });
  }
} 