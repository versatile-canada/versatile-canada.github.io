@echo off
chcp 65001 >nul
REM ==========================================================================
REM  deploy.bat
REM
REM  What this does:
REM    1. If this folder isn't connected to your GitHub repo yet, it
REM       reconnects it automatically
REM    2. Commits your current changes
REM    3. Pushes to GitHub, which triggers the auto-build/deploy workflow
REM
REM  HOW TO USE:
REM    Just double-click this file whenever you want to publish your
REM    changes. It'll ask you to briefly describe what changed.
REM ==========================================================================

cd /d "%~dp0."

if not exist ".git" (
    echo No Git connection found in this folder - setting it up...
    git init
    git branch -M main
    git remote add origin https://github.com/versatile-canada/versatile-canada.github.io.git
    echo Connected to https://github.com/versatile-canada/versatile-canada.github.io
    echo.
)

echo.
set /p COMMITMSG="Briefly describe what changed, or just press Enter: "
if "%COMMITMSG%"=="" set "COMMITMSG=Update site"

git add .
git commit -m "%COMMITMSG%"
git push -u origin main
set PUSH_RESULT=%errorlevel%

if %PUSH_RESULT% neq 0 goto push_failed
goto push_ok

:push_failed
echo.
echo ==========================================================================
echo The push was rejected. This usually means the GitHub repo has commits
echo your local folder doesn't - for example, something was changed directly
echo on GitHub.com, or a different folder pushed here before.
echo.
echo If you are SURE your local files are the ones you want live, overwrite
echo what's on GitHub by running this command manually:
echo.
echo     git push --force origin main
echo ==========================================================================
pause
exit /b 1

:push_ok
echo.
echo ==========================================================================
echo Pushed! GitHub is now rebuilding your site automatically.
echo Watch it build here:
echo   https://github.com/versatile-canada/versatile-canada.github.io/actions
echo.
echo Once you see a green checkmark, your changes are live at:
echo   https://versatile-canada.github.io/
echo   Hard refresh with Ctrl+Shift+R if your browser shows an old version.
echo ==========================================================================
pause
