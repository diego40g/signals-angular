export interface User {
  id: number;
  name: string;
  age: number;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
}
