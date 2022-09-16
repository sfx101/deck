curl -L -C - https://github.com/deck-app/wsl-installer/releases/download/v1.0.0/deck-app.tar --output deck-app.tar
echo "a8f8e03ab0fe59d5afca54e60ee08340"
wsl --import deck-app C:\deck-app deck-app.tar
echo "ab0f19608898ffcf5b0b98ce4c4b0020"
wsl --set-version deck-app 2
@REM del deck-app.tar
echo "8b0d91e308eb47824c275ef16376adc9"
wsl -s deck-app
wsl -d deck-app mkdir /home/deck-projects
