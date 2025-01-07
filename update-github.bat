@echo off
echo Updating GitHub repository...

:: Check if .git directory exists
IF NOT EXIST ".git" (
    git init
    git remote add origin https://github.com/MCERQUA/CATALYST.git
) ELSE (
    :: Only remove and add remote if needed
    git remote get-url origin || (
        git remote remove origin
        git remote add origin https://github.com/MCERQUA/CATALYST.git
    )
)

:: Fetch and set up branch
git fetch
git branch -M main

:: Add all files except those in .gitignore
git add .

:: Check if there are changes to commit
git diff --cached --quiet
IF %ERRORLEVEL% NEQ 0 (
    :: Commit changes with message and timestamp
    git commit -m "Auto-update %date% %time%"
    
    :: Force push to main branch
    git push -f origin main
    echo Update complete with new changes!
) ELSE (
    echo No changes detected to commit
)

pause