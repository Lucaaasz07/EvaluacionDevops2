Una API sencilla para crear y ver notas con fecha.

## Ramas y flujo
- **main**: versión estable.
- **develop**: integración de cambios.
- **feature/***: nuevas funciones.
- **hotfix/***: arreglos rápidos.

Usamos GitFlow para organizar el trabajo con ramas.

## Commits
- `feat:` nueva función
- `fix:` arreglo de error
- `docs:` cambios en docs

## Cómo trabajamos
- Hacemos Pull Requests para revisar cambios.
- Se prueba en `develop` y luego se pasa a `main`.

## GitHub Actions
Corre en cada push a `develop` y PR a `main`.
Instala dependencias y revisa que todo funcione.

