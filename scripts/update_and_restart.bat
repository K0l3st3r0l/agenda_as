@echo off
echo Actualizando y reiniciando agenda-app...
taskkill /f /im node.exe >nul 2>&1
cd ..
echo Actualizando desde Git...
git pull
echo Instalando dependencias...
cd backend
npm install
echo.
echo ============================================
echo Actualizacion completada!
echo ============================================
echo.
echo API Backend: http://localhost:3001
echo.
echo Los logs del servidor se muestran a continuacion.
echo Presiona Ctrl+C para detener el servidor.
echo.
echo Iniciando servidor...
npm startActualizando y reiniciando agenda-app...
set ROOT_DIR=%~dp0..
powershell -Command "Start-Process cmd.exe -ArgumentList '/k', 'taskkill /f /im node.exe && cd /d %ROOT_DIR% && echo Actualizando desde Git... && git pull && echo Instalando dependencias... && cd backend && npm install && echo Iniciando servidor... && npm start'"

echo.
echo ============================================
echo Actualizacion completada!
echo ============================================
echo.
echo API Backend: http://localhost:3001
echo.
echo Los logs del servidor se muestran en el nuevo terminal.
echo Presiona Ctrl+C en ese terminal para detener el servidor.
echo.
pause