@echo off
title Multimodal Construction Intelligence - FastAPI Backend
echo ======================================================================
echo Launching Multimodal Construction Intelligence Platform - FastAPI (8000)
echo ======================================================================

set PATH=%LOCALAPPDATA%\Programs\Python\Python311;%LOCALAPPDATA%\Programs\Python\Python311\Scripts;%PATH%
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
pause
