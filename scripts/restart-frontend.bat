@echo off
echo.
echo ============================================
echo Reiniciando Frontend de Agenda App
echo ============================================
echo.

echo Deteniendo procesos de Node.js...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

cd ../frontend
echo Reiniciando frontend...
echo Frontend disponible en: http://localhost:3000
echo Los logs del frontend se muestran a continuacion.
echo Presiona Ctrl+C para detener.
echo.

call npm start