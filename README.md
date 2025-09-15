# Agenda App

A full-stack web application for managing a service agenda, including clients, cars, and jobs.

## Tech Stack

- **Backend**: Node.js, Express.js, SQLite
- **Frontend**: React, FullCalendar
- **Other**: Nodemailer for notifications, Node-cron for scheduled tasks

## Project Structure

- `/backend`: Server-side code
- `/frontend`: Client-side React app
- `/scripts`: Automation scripts

## Quick Start

### Primera vez:
```bash
# Inicia el backend (desde la carpeta scripts)
.\scripts\start.bat
```

### Desarrollo diario:
```bash
# Reinicia solo el backend después de cambios
.\scripts\restart-backend.bat

# Reinicia solo el frontend después de cambios
.\scripts\restart-frontend.bat

# Reinicia ambos servicios
.\scripts\restart-all.bat
```

## URLs de Acceso

- **Backend API**: http://localhost:3001
- **Frontend App**: http://localhost:3000

## Features

### 🗓️ **Dashboard con Calendario Interactivo**
- **Vista de Mes**: Visualiza todos los servicios del mes
- **Vista de Semana**: Enfoque semanal detallado
- **Vista de Día**: Detalles completos del día
- **Agregar Servicios**: Click en fecha para crear nuevo servicio
- **Editar Servicios**: Click en servicio existente para modificar
- **Estados Visuales**: Colores por estado (pendiente, completado, cancelado)

### 👥 **Gestión de Clientes**
- Crear, editar y eliminar clientes
- Información completa: nombre, email, teléfono

### 🚗 **Gestión de Vehículos**
- Asociar vehículos a clientes
- Detalles: marca, modelo, año, matrícula

### 🔧 **Programación de Servicios**
- Crear trabajos/citas
- Asignar cliente y vehículo
- Fechas y descripciones detalladas
- Seguimiento de estados

### 📧 **Notificaciones Automáticas**
- Recordatorios por email
- Configurable para días/horas antes del servicio

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `start.bat` | Primera instalación: instala dependencias y inicia backend |
| `start-frontend.bat` | Inicia el frontend (usar después de start.bat) |
| `restart-backend.bat` | Reinicia solo el backend (para desarrollo) |
| `restart-frontend.bat` | Reinicia solo el frontend (para desarrollo) |
| `restart-all.bat` | Reinicia backend y frontend |
| `update_and_restart.bat` | Actualiza desde Git y reinicia |

## Desarrollo

### **Dashboard (Calendario)**
1. **Vista Principal**: Calendario interactivo con servicios
2. **Navegación**: Mes/Semana/Día con botones intuitivos
3. **Interacción**:
   - Click en fecha → Crear nuevo servicio
   - Click en servicio → Ver/editar detalles
   - Estados con colores diferenciados

### **Flujo de Trabajo**
1. **Backend**: Modifica código en `/backend`, luego ejecuta `restart-backend.bat`
2. **Frontend**: Modifica código en `/frontend`, luego ejecuta `restart-frontend.bat`
3. **Ambos**: Usa `restart-all.bat` para reiniciar todo

## API Endpoints

### Clientes
- `GET /api/clients` - Listar todos
- `POST /api/clients` - Crear nuevo
- `PUT /api/clients/:id` - Actualizar
- `DELETE /api/clients/:id` - Eliminar

### Vehículos
- `GET /api/cars` - Listar todos
- `POST /api/cars` - Crear nuevo
- `PUT /api/cars/:id` - Actualizar
- `DELETE /api/cars/:id` - Eliminar

### Servicios
- `GET /api/jobs` - Listar todos
- `POST /api/jobs` - Crear nuevo
- `PUT /api/jobs/:id` - Actualizar
- `DELETE /api/jobs/:id` - Eliminar

### Notificaciones
- `POST /api/notifications/send` - Enviar email

## Notas

- Los scripts detienen automáticamente procesos anteriores de Node.js
- El backend muestra logs en la terminal principal
- El frontend se ejecuta en terminales separadas
- Presiona `Ctrl+C` en cualquier terminal para detener el servicio
- El calendario usa FullCalendar para una experiencia moderna