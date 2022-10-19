# jedlik-vizsgaremek

## IT Webshop project

- Documentation: [link](https://docs.google.com/document/d/1Yr7cOVb5YnQZE8FiTCjsjiG3QIeLOKl3hKt94gyOdZ8/edit?usp=sharing)
- Database: PostgreSQL  
- Backend: FastAPI  
- Frontend: Angular vagy React

## Team members

- Kevin Németh 
- Dávid István Tercs

## How to run the backend:
1. Download the latest python (min 3.10.8) [link](https://www.python.org/downloads/)
2. Create a copy of the `.env.example` file, and fill out the fields.
3. Create a new virtual environment 
```
py -m venv env
.\env\Scripts\activate
```
4. Install the requirements `pip install -r .\requirements.txt`
5. Create a new docker container for the database and install the UUID extension
```
docker-compose up -d
docker exec -it postgres bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
6. Run the app
```
uvicorn app.main:app --host localhost --port 8000 --reload
```

**Other userful commands:**
- On database model change use alembic to create a new revision of the database
```
alembic revision --autogenerate -m "creat users table"
alembic upgrade head
```

**Useful links:**
- [Online RSA Key Generator](http://travistidwell.com/jsencrypt/demo/)
- [Encode RSA Key to Base64](https://www.base64encode.org/)
