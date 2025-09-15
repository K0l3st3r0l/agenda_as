@echo off
echo Deteniendo procesos de Node.js anteriores...
taskkill /f /im node.exe >nul 2>&1

echo.
echo ============================================
echo Iniciando Agenda App - Backend + Frontend
echo ============================================
echo.

cd ../backend
echo Instalando dependencias del backend...
call npm install
echo Dependencias del backend instaladas.

echo.
echo Iniciando backend...
echo Backend disponible en: http://localhost:3001
echo Los logs del backend se muestran a continuacion.
echo.

echo Presiona Ctrl+C en cualquier momento para detener el backend.
echo.

echo OPCIONES PARA INICIAR EL FRONTEND:
echo -----------------------------------
echo Cuando el backend este listo, puedes:
echo.
echo 1. Ejecutar en OTRA terminal: .\scripts\start-frontend.bat
echo 2. O manualmente: cd frontend && npm start
echo.
echo Frontend disponible en: http://localhost:3000
echo.

echo Iniciando backend...
call npm start