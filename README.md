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

# Description

The project guidelines provided were somewhat ambiguous. According to the instructions, I was expected to commit changes sequentially from stages B to E. However, as I am working within a Scrum/Agile framework, the project involves full-stack development with incremental testing. Consequently, I did not commit and push changes for each individual stage because not all features from stage B were completed prior to proceeding with stages C and D. The features were developed incrementally, and testing was conducted continuously rather than solely at the conclusion of the development process.


# Docker
RUN WITH:
docker-compose up --build