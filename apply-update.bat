@echo off
chcp 65001 >nul
REM ==========================================================================
REM  apply-update.bat
REM
REM  What this does, every time you get a new polo-designs.zip from Claude:
REM    1. Unzips it to a temp folder
REM    2. Copies the updated files into THIS project folder, without
REM       touching .git (your GitHub connection/history) or node_modules
REM       (your installed packages), so nothing breaks
REM    3. Runs npm install, in case any package changed
REM    4. Frees up port 5173 if an old preview window is still running
REM    5. Opens a new window running the local preview at localhost:5173
REM
REM  HOW TO USE:
REM    Easiest - drag the downloaded polo-designs.zip file directly onto
REM    this apply-update.bat file (drag it onto the icon, not into a window).
REM
REM    Or - double-click this file, and when it asks, paste the full path
REM    to the zip.
REM ==========================================================================

cd /d "%~dp0."

set "ZIPPATH=%~1"
if not "%ZIPPATH%"=="" goto have_zip
set /p ZIPPATH="Drag the polo-designs.zip file here, or paste its full path, then press Enter: "

:have_zip
REM Strip any quote characters the path might already have (e.g. pasted
REM from "Copy as path"), so we don't end up double-quoting it below.
set "ZIPPATH=%ZIPPATH:"=%"

if exist "%ZIPPATH%" goto zip_found
echo.
echo Could not find that file: %ZIPPATH%
echo Double-check the path and try again.
pause
exit /b 1

:zip_found
echo.
echo Extracting %ZIPPATH% ...
set "TEMPDIR=%TEMP%\polo-designs-update"
if exist "%TEMPDIR%" rmdir /s /q "%TEMPDIR%"
powershell -NoProfile -Command "Expand-Archive -LiteralPath '%ZIPPATH%' -DestinationPath '%TEMPDIR%' -Force"

if exist "%TEMPDIR%\polo-designs" goto extract_ok
echo.
echo Something looked off inside the zip - couldn't find the polo-designs folder.
echo No files were changed. Nothing to worry about, just double check the zip.
pause
exit /b 1

:extract_ok
echo.
echo Copying updated files in, keeping .git and node_modules untouched...
robocopy "%TEMPDIR%\polo-designs" "%~dp0." /E /XD .git node_modules /NFL /NDL /NJH

echo Cleaning up temp files...
rmdir /s /q "%TEMPDIR%"

echo.
echo Installing any new or updated packages, quick if nothing changed...
call npm install

echo.
echo Freeing up port 5173 in case an old preview window is still running...
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }"

echo.
echo All done. Opening the local preview...
start "polo-designs - local preview" cmd /k "npm run dev"

echo.
echo A new window just opened running the site. Open this in your browser:
echo   http://localhost:5173/
echo.
echo Review the changes there. When you're happy with them, run deploy.bat
echo to publish them to GitHub.
pause
