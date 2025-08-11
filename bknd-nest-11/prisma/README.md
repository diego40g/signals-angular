# Prisma

Este directorio contiene la configuración y los archivos relacionados con Prisma ORM para este proyecto.

## Estructura

- **schema.prisma**: Esquema principal de la base de datos. Define los modelos y la configuración de la conexión.
- **dev.db**: Base de datos SQLite utilizada para desarrollo local (no subir a producción).
- **generated/**: Código generado automáticamente por Prisma Client.
- **migrations/**: Migraciones de la base de datos generadas por Prisma.
- **data/**: Carpeta para datos de ejemplo, assets o archivos JSON de pruebas.
- **scripts/**: Scripts relacionados con la gestión de la base de datos o seeds.
- **seeds/**: Archivos para poblar la base de datos con datos iniciales.

## Comandos útiles

- Generar Prisma Client:
  ```bash
  yarn prisma:generate
  ```
- Ejecutar migraciones:
  ```bash
  yarn prisma:migrate
  ```
- Abrir Prisma Studio:
  ```bash
  yarn prisma:studio
  ```
- Formatear el esquema:
  ```bash
  yarn prisma:format
  ```
- Resetear la base de datos:
  ```bash
  yarn prisma:reset
  ```
- Ejecutar seeds:
  ```bash
  yarn prisma:seed
  ```
## Notas

- No subas archivos generados automáticamente ni bases de datos locales al repositorio (`dev.db`, `generated/`, `data/`).
- Sube siempre el archivo [`schema.prisma`](schema.prisma) y las migraciones para mantener el control de versiones del esquema.

Para más información, consulta la [documentación oficial de Prisma](https://www.prisma.io/docs/).
