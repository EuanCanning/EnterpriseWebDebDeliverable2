git add -A
set /p COMMITTEXT="Commit: "
git commit -a -m "%COMMITTEXT%"
git push
