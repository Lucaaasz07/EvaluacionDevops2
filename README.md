# Notas API - CI/CD DevOps

## Descripción
Microservicio desarrollado con Node.js y Express que permite gestionar notas mediante una API REST.

## Tecnologías utilizadas
- Node.js
- Express
- Docker
- Docker Compose
- GitHub Actions
- Dependabot
- Snyk

## Docker
La aplicación se encuentra contenerizada mediante Docker utilizando un Dockerfile.

### Construir imagen
docker build -t notas-api .

### Ejecutar contenedor
docker run -p 3000:3000 notas-api

## Orquestación con Docker Compose

### Levantar servicio
docker compose up -d

### Detener servicio
docker compose down

## Pipeline CI/CD

El pipeline implementado en GitHub Actions realiza:

1. Descarga del código fuente.
2. Configuración del entorno Node.js.
3. Instalación de dependencias.
4. Ejecución de pruebas automatizadas.
5. Escaneo de seguridad con Snyk.
6. Construcción de la imagen Docker.
7. Validación de Docker Compose.

## Seguridad

Se utilizó Snyk para analizar las dependencias del proyecto y detectar posibles vulnerabilidades. Además, Dependabot permite monitorear y mantener actualizadas las dependencias utilizadas.

Actualmente Snyk genera reportes de seguridad durante la ejecución del pipeline, mientras que en un entorno productivo podría configurarse para bloquear despliegues con vulnerabilidades críticas.

## Trazabilidad

La trazabilidad se garantiza mediante GitHub Actions y Git:

- Registro de commits.
- Historial de ejecuciones del pipeline.
- Identificación del autor de cada cambio.
- Registro de errores y resultados de pruebas.
- Historial de actualizaciones de Dependabot.

## Calidad

La calidad del software se garantiza mediante:

- Integración continua (CI).
- Ejecución automática de pruebas.
- Escaneo de vulnerabilidades con Snyk.
- Validación de la configuración Docker.
- Automatización de despliegue y construcción.

## Autor

Lucas Javier Pizarro Hernández