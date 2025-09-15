@echo off
echo.
echo ============================================
echo Reiniciando Backend de Agenda App
echo ============================================
echo.

echo Deteniendo procesos de Node.js...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

cd ../backend
echo Reiniciando backend...
echo Backend disponible en: http://localhost:3001
echo Los logs del backend se muestran a continuacion.
echo Presiona Ctrl+C para detener.
echo.

call npm start