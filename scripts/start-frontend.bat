@echo off
echo.
echo ============================================
echo Iniciando Frontend de Agenda App
echo ============================================
echo.

cd ../frontend
echo Instalando dependencias del frontend...
call npm install
echo Dependencias del frontend instaladas.

echo.
echo Iniciando frontend...
echo Frontend disponible en: http://localhost:3000
echo Los logs del frontend se muestran a continuacion.
echo Presiona Ctrl+C para detener el frontend.
echo.

call npm start