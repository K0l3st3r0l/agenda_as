@echo off
taskkill /f /im node.exe
cd ..
git pull
call scripts\start.bat