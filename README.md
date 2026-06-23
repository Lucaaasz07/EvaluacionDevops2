# Notas API - CI/CD DevOps

## Descripción
Microservicio desarrollado con Node.js y Express que permite gestionar notas mediante una API REST.

## Tecnologías utilizadas
- Node.js
- Express
- Docker
- Kubernetes (K3s)
- GitHub Actions
- Dependabot
- AWS CloudWatch
- AWS EC2

## Docker

### Construir imagen
docker build -t notas-api .

### Ejecutar contenedor
docker run -p 3000:3000 notas-api

## Despliegue en Kubernetes (K3s)

El microservicio se despliega en un clúster de Kubernetes (K3s) sobre una instancia EC2 de AWS.

- `deployment.yaml`: define 2 réplicas del pod `notas-api`, con límites de CPU (300m) y memoria (256Mi).
- `service.yaml`: expone el servicio mediante NodePort en el puerto 30080.

### Aplicar manifiestos
sudo k3s kubectl apply -f deployment.yaml
sudo k3s kubectl apply -f service.yaml

### Verificar estado
sudo k3s kubectl get pods
sudo k3s kubectl get svc

## Pipeline CI/CD

El pipeline implementado en GitHub Actions realiza:

1. Descarga del código fuente.
2. Configuración del entorno Node.js.
3. Instalación de dependencias.
4. Ejecución de pruebas automatizadas con cobertura (Jest).
5. Configuración de credenciales AWS.
6. Envío de la métrica de cobertura de pruebas a CloudWatch.
7. Auditoría de seguridad con `npm audit` (bloqueante ante vulnerabilidades críticas).
8. Construcción de la imagen Docker.
9. Validación de Docker Compose.
10. Envío de la métrica de tiempo de despliegue a CloudWatch.

## Monitoreo con AWS CloudWatch

Se utiliza el **CloudWatch Agent** (unificado) instalado en la instancia EC2 para capturar:

- **Métricas de infraestructura**: uso de CPU, memoria y disco del servidor.
- **Logs de la aplicación**: salida estándar de los contenedores (`/var/log/containers/notas-api-*.log`), enviados al grupo de logs `/microservicio-notas/app-logs`.
- **Métricas personalizadas del pipeline**: `CoveragePercent` (cobertura de pruebas) y `DeploymentTimeSeconds` (duración del pipeline), enviadas vía AWS CLI (`put-metric-data`) desde GitHub Actions.

### Dashboard
Se construyó un dashboard llamado **Microservicio-Notas** en CloudWatch con los siguientes widgets:
- Uso de CPU
- Uso de memoria
- Uso de disco
- Cobertura de pruebas (CoveragePercent)
- Tiempo de despliegue (DeploymentTimeSeconds)

Esto permite tomar decisiones técnicas como: detectar degradación de cobertura tras un cambio, identificar pipelines que se vuelven más lentos con el tiempo, o anticipar saturación de recursos en el servidor antes de que afecte la disponibilidad del servicio.

## Cumplimiento y control de calidad

- **`npm audit --audit-level=critical`**: detiene el pipeline si se detecta una vulnerabilidad crítica en las dependencias, evitando que código inseguro llegue a producción.
- **Branch protection en GitHub**: la rama `feature/login` requiere que el pipeline pase exitosamente y que exista al menos una aprobación de revisión antes de poder fusionar un Pull Request. Esto impide que código sin pruebas, sin auditoría de seguridad, o sin revisión, se integre a la rama principal del proyecto.
- **Dependabot**: monitorea semanalmente actualizaciones de dependencias npm y de GitHub Actions.

## Demostración: el pipeline se detiene ante una falla crítica

Si `npm audit --audit-level=critical` detecta una vulnerabilidad crítica, el comando retorna un código de salida distinto de cero, lo que hace fallar el step y detiene la ejecución del job — los pasos siguientes (build de Docker, despliegue, envío de métricas) no se ejecutan.

De forma similar, el branch protection impide el merge de un Pull Request si el check del pipeline no pasa, bloqueando código defectuoso antes de que llegue a la rama protegida.

## Trazabilidad

- Registro de commits y autoría en Git.
- Historial de ejecuciones del pipeline en GitHub Actions.
- Logs de aplicación e infraestructura en CloudWatch.
- Historial de actualizaciones de Dependabot.
- Historial de Pull Requests con revisiones y checks asociados.

## Autor

Lucas Javier Pizarro Hernández
