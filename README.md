SPARFINDER APP
This app was built for my software engineering capstone at WGU.
The purpose of the app is to connect coaches and boxers through organized sparring events.

It is built with
NextJs, Typescript, TailwindCSS
Flask, Python, MongoDB

CREATE BACKEND VENV
python3 -m venv .venv

RUN BACKEND VENV MACOS
source .venv/bin/activate

RUN BACKEND VENV WINDOWS
source .venv/Scripts/activate

INSTALL REQUIREMENTS
pip install -r requirements.txt

RUN BACKEND
python3 app.py

DEACTIVATE VENV
deactivate

RUN FRONTEND
npm install
npm run dev