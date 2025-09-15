@echo off
echo.
echo ============================================
echo Reiniciando Agenda App Completa
echo ============================================
echo.

echo Deteniendo procesos de Node.js...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo Reiniciando backend...
cd ../backend
start cmd /k "cd /d %~dp0..\backend && echo Backend corriendo en http://localhost:3001 && echo Presiona Ctrl+C para detener && npm start"

timeout /t 3 /nobreak >nul

echo Reiniciando frontend...
cd ../frontend
start cmd /k "cd /d %~dp0..\frontend && echo Frontend corriendo en http://localhost:3000 && echo Presiona Ctrl+C para detener && npm start"

echo.
echo ============================================
echo ¡Reinicio completado!
echo ============================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Servicios reiniciados en terminales separadas.
echo.
pause