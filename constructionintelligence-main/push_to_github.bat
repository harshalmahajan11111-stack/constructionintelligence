@echo off
title Push Project to GitHub - pradhumngeel/project-1
cd /d "%~dp0"
echo ======================================================================
echo Pushing AI Construction Intelligence Platform to GitHub
echo Repository: https://github.com/pradhumngeel/project-1.git
echo ======================================================================
echo.
git branch -M main
git remote set-url origin https://github.com/pradhumngeel/project-1.git
git push -u origin main --force
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo [SUCCESS] Project successfully pushed to GitHub!
    echo View at: https://github.com/pradhumngeel/project-1
    echo ======================================================================
) else (
    echo.
    echo ======================================================================
    echo [FAILED] Push encountered an error.
    echo If prompted to sign in, complete the browser login and run again.
    echo ======================================================================
)
echo.
pause
