@echo off
title Multimodal Construction Intelligence Platform Launcher
echo ======================================================================
echo Starting Full-Stack Multimodal Construction Intelligence Platform
echo ======================================================================

start "FastAPI Backend Service" cmd /k run_backend.bat
timeout /t 3 /nobreak >nul
start "React Vite Frontend" cmd /k run_frontend.bat
timeout /t 2 /nobreak >nul

echo Both services launched!
echo Opening http://localhost:5173 in browser...
start http://localhost:5173
pause
