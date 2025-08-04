import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class HydrateRestService {
  products = httpResource<Product[]>(
    () => '/data/products.json'
  )
}
