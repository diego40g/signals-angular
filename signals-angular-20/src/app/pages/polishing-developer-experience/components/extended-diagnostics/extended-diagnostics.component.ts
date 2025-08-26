import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { User } from '../../models/user';

@Component({
  selector: 'app-extended-diagnostics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './extended-diagnostics.component.html',
  styleUrl: './extended-diagnostics.component.sass'
})
export class ExtendedDiagnosticsComponent {
  // Datos de usuarios
  users = signal<User[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', age: 28, isActive: true },
    { id: 2, name: 'María García', email: 'maria@email.com', age: 32, isActive: false },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com', age: 25, isActive: true },
    { id: 4, name: 'Ana Martínez', email: 'ana@email.com', age: 30, isActive: true },
    { id: 5, name: 'Luis Rodríguez', email: 'luis@email.com', age: 35, isActive: false }
  ]);

  // Datos de productos
  products = signal<Product[]>([
    { id: 'P001', name: 'Laptop Gaming', price: 1200, category: 'Electronics', inStock: true },
    { id: 'P002', name: 'Smartphone', price: 800, category: 'Electronics', inStock: false },
    { id: 'P003', name: 'Escritorio', price: 300, category: 'Furniture', inStock: true },
    { id: 'P004', name: 'Silla Ergonómica', price: 250, category: 'Furniture', inStock: true }
  ]);

  // Signal para mostrar ejemplos
  showCorrectExamples = signal(true);
  showIncorrectExamples = signal(false);

  nullValue = signal<string | null>(null);
  undefinedValue = signal<string | undefined>(undefined);
  emptyString = signal('');
  validString = signal('Valor válido');

  // ✅ CORRECTO: Track functions que SÍ se invocan
  trackUserById(index: number, user: User): number {
    return user.id;
  }

  trackProductById(index: number, product: Product): string {
    return product.id;
  }

  trackByIndex(index: number): number {
    return index;
  }

  // ❌ INCORRECTO: Track functions que NO se invocan (para demostrar el diagnóstico)
  // Estas funciones muestran el error que detecta Angular 20
  incorrectTrackFn(): (index: number, user: User) => number {
    return (index: number, user: User) => user.id;
  }

  badTrackFn(): (index: number, product: Product) => string {
    return (index: number, product: Product) => product.id;
  }

  // Métodos para manipular datos
  addUser() {
    const newId = Math.max(...this.users().map(u => u.id)) + 1;
    const newUser: User = {
      id: newId,
      name: `Usuario ${newId}`,
      email: `user${newId}@email.com`,
      age: Math.floor(Math.random() * 40) + 20,
      isActive: Math.random() > 0.5
    };
    this.users.update(users => [...users, newUser]);
  }

  removeUser(id: number) {
    this.users.update(users => users.filter(u => u.id !== id));
  }

  toggleUserStatus(id: number) {
    this.users.update(users => 
      users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u)
    );
  }

  addProduct() {
    const newId = `P${String(Date.now()).slice(-3)}`;
    const categories = ['Electronics', 'Furniture', 'Clothing', 'Books'];
    const newProduct: Product = {
      id: newId,
      name: `Producto ${newId}`,
      price: Math.floor(Math.random() * 1000) + 100,
      category: categories[Math.floor(Math.random() * categories.length)],
      inStock: Math.random() > 0.3
    };
    this.products.update(products => [...products, newProduct]);
  }

  toggleProductStock(id: string) {
    this.products.update(products => 
      products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p)
    );
  }

  // Métodos para controlar la visualización
  toggleCorrectExamples() {
    this.showCorrectExamples.update(show => !show);
  }

  toggleIncorrectExamples() {
    this.showIncorrectExamples.update(show => !show);
  }

  // Métodos para nullish coalescing examples
  setNullValue() {
    this.nullValue.set(null);
  }

  setValidValue() {
    this.nullValue.set('Ahora tiene valor');
  }

  setUndefinedValue() {
    this.undefinedValue.set(undefined);
  }

  setDefinedValue() {
    this.undefinedValue.set('Valor definido');
  }
}
