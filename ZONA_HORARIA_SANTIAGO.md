# Configuración de Zona Horaria - Santiago, Chile

## Información General
Esta aplicación está configurada para usar la zona horaria de **Santiago, Chile** (America/Santiago).

## Configuración Técnica

### Backend (Node.js)
- **Archivo**: `backend/app.js`
- **Configuración**: `process.env.TZ = 'America/Santiago'`
- **Scripts**: Los scripts en `package.json` incluyen `TZ=America/Santiago`

### Frontend (React)
- **Archivo**: `frontend/src/index.js`
- **Configuración**: `process.env.TZ = 'America/Santiago'`
- **Calendario**: FullCalendar configurado con `timeZone="America/Santiago"`

### Utilidades de Fecha
- **Archivo**: `frontend/src/utils/dateUtils.js`
- **Funciones disponibles**:
  - `getCurrentDateTimeSantiago()`: Obtiene fecha y hora actual en Santiago
  - `convertToSantiagoDateTime(date, time)`: Convierte fecha a formato datetime
  - `formatDateSantiago(date)`: Formatea fecha para display
  - `formatDateTimeSantiago(dateTime)`: Formatea fecha y hora para display
  - `getCurrentDateSantiago()`: Obtiene fecha actual en Santiago

## Comportamiento de la Aplicación

### Al seleccionar una fecha en el calendario:
1. Se obtiene la fecha en formato `YYYY-MM-DD`
2. Se convierte automáticamente a `YYYY-MM-DDTHH:MM` usando zona horaria de Santiago
3. Se establece hora por defecto de 09:00 si no se especifica

### Al hacer clic en "Nuevo Servicio":
1. Se obtiene la fecha y hora actual en zona horaria de Santiago
2. Se formatea para el input `datetime-local`

### Al editar un servicio existente:
1. Se mantiene la fecha y hora original del servicio
2. Se asegura formato correcto para zona horaria de Santiago

## Zona Horaria de Santiago
- **Nombre IANA**: `America/Santiago`
- **UTC Offset**: UTC-4 (hora estándar) / UTC-3 (horario de verano)
- **Horario de verano**: Segundo domingo de octubre al segundo sábado de marzo

## Verificación
Para verificar que la zona horaria está funcionando correctamente:
1. Abre la consola del navegador
2. Ejecuta: `new Date().toLocaleString('es-CL', {timeZone: 'America/Santiago'})`
3. Debería mostrar la hora actual de Santiago

## Notas Importantes
- Todas las fechas se almacenan en la base de datos en formato UTC
- La conversión a zona horaria de Santiago se hace en el frontend
- Los recordatorios programados (cron jobs) también usan zona horaria de Santiago