CorrectOCR
==========

Run locally
=======
Backend:
-------------
- extract Bootstrap.zip into root folder
- Prep ini file
- run docker-compose up
- run docker exec backend python -m CorrectOCR prepare --all --step server --loglevel DEBUG

Frontend:
=======
1: npm install
2: ng serve -o
