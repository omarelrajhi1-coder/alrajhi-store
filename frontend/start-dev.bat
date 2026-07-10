@echo off
chcp 65001 >nul
title ALRAJHI Store - Dev Server
cd /d "%~dp0"
echo ============================================
echo   ALRAJHI Store - تشغيل المتجر
echo ============================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo [!] Node.js غير مثبت. حمّله من https://nodejs.org ثم اعد المحاولة.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo [1/2] تثبيت الحزم... قد يستغرق دقيقة او اكثر
  call npm install
  if errorlevel 1 ( echo [x] فشل التثبيت. & pause & exit /b 1 )
) else (
  echo [i] الحزم مثبتة بالفعل.
)
echo.
echo [2/2] تشغيل الخادم على http://localhost:3000
echo (اترك هذه النافذة مفتوحة. للايقاف اضغط Ctrl+C)
echo.
start "" http://localhost:3000
call npm run dev
pause
