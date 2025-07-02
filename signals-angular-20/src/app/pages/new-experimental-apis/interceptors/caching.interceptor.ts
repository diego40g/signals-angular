import { HttpInterceptorFn } from '@angular/common/http';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Caching interceptor - URL:', req.url);
  
  // Aquí puedes agregar lógica de caché
  // Por ejemplo, verificar si la respuesta está en caché
  // y devolver la respuesta cacheada o continuar con la petición
  
  return next(req);
};
