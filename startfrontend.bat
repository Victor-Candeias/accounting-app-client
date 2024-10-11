@Echo off

cd C:\_MyWork\Formacao\accounting-app-client\build

start /min cmd /c python -m http.server 8000
