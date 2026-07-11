# Sistema Crem

Este repositorio contiene la arquitectura completa (Frontend en Next.js, Backend en Laravel y Base de Datos MySQL) dockerizada para el Sistema Crem.

## 🚀 Entorno de Desarrollo (Local)

El entorno de desarrollo utiliza volúmenes de Docker, lo que significa que cualquier cambio que hagas en el código de tu computadora se reflejará instantáneamente en el servidor sin tener que reiniciar.

### 1. Iniciar los contenedores
Para levantar el proyecto en tu máquina local, abre tu terminal en la raíz del proyecto y ejecuta:
```bash
docker-compose -f docker-compose.dev.yml up -d --build
```
*Tus aplicaciones estarán disponibles en:*
- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:8000
- **Base de Datos:** localhost:3306

### 2. Solucionar Permisos (Solo la primera vez)
Dado que estamos usando volúmenes, los archivos creados por Docker (como los logs o migraciones) pueden generar conflictos de permisos con el sistema operativo anfitrión. 
Si ves un error como `tempnam(): file created in the system's temporary directory` o `Permission denied`, ejecuta el siguiente comando para darle permisos de escritura al contenedor:

```bash
docker exec -u root sistema-crem-backend-dev chmod -R 777 storage bootstrap/cache database
```

### 3. Ejecutar Migraciones
Para crear o actualizar las tablas en tu base de datos de desarrollo, ejecuta:
```bash
docker exec -it sistema-crem-backend-dev php artisan migrate
```
*(Si quieres borrar toda la base de datos y recrearla desde cero, usa `migrate:fresh` en lugar de `migrate`).*

---

## 🌍 Entorno de Producción

En producción, el código se encapsula permanentemente dentro de las imágenes de Docker para garantizar seguridad y rendimiento óptimo. No se utilizan volúmenes para el código, solo para los datos de la base de datos.

### 1. Iniciar los contenedores
Para desplegar el proyecto en tu servidor de producción, ejecuta:
```bash
docker-compose up -d --build
```

### 2. Ejecutar Migraciones en Producción
A diferencia de desarrollo, en producción **no tienes que preocuparte por los permisos de archivos** (eso ya lo soluciona el `Dockerfile` internamente). Sin embargo, cada vez que subas cambios estructurales a la base de datos, debes correr las migraciones:

```bash
docker exec -it sistema-crem-backend-prod php artisan migrate --force
```
*(Se usa `--force` porque Laravel te pedirá una confirmación extra de seguridad al detectar que estás en producción).*

---

## ⚙️ Variables de Entorno y Configuración

El proyecto utiliza variables de entorno inyectadas directamente a través de Docker (`docker-compose.yml` y `docker-compose.dev.yml`) para asegurar que la comunicación entre contenedores funcione automáticamente:

- `NEXT_PUBLIC_API_URL`: Usada por el Frontend (Next.js) para saber a qué URL hacer las peticiones al backend (por defecto: `http://localhost:8000/api`).
- `FRONTEND_URL`: Usada por el Backend (Laravel) para configurar el CORS y permitir que el frontend pueda consumir la API sin bloqueos de seguridad (por defecto: `http://localhost:3001`).

> [!WARNING]
> **Recordatorio para Producción**: Cuando vayas a desplegar a un servidor real o plataforma (como Vercel/DigitalOcean), deberás cambiar estas variables en el `docker-compose.yml` (o en el panel de control de tu hosting) por los dominios reales (ej. `NEXT_PUBLIC_API_URL=https://api.midominio.com` y `FRONTEND_URL=https://midominio.com`).
