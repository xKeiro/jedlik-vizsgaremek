# jedlik-vizsgaremek

## IT Webshop project

- Documentation: [link](https://docs.google.com/document/d/1Yr7cOVb5YnQZE8FiTCjsjiG3QIeLOKl3hKt94gyOdZ8/edit?usp=sharing)
- Database: PostgreSQL
- Backend: FastAPI
- Frontend: React

## Team members

- Kevin Németh
- Dávid István Tercs

## How to run the backend

0. Set up environment (WSL)

```
sudo apt update && sudo apt upgrade
sudo apt upgrade python3
sudo apt install python3-pip
sudo apt install python3-dev
sudo apt install python3-venv
sudo apt install libpq-dev
sudo apt install uvicorn

# update python 3.8 to 3.10
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python3.10
sudo apt-get install python3.10-dev
sudo apt-get install python3.10-venv
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 2
sudo update-alternatives --config python3
python3 -V
```

1. Create a copy of the `.env.sample` file, and fill out the fields.
2. Create a new virtual environment:

```
py -m venv env
.\env\Scripts\activate

# OR in WSL:

python3 -m venv .venv
source .venv/bin/activate
```

3. Install the requirements:

```
pip install -r ./backend/requirements.txt
```

4. Create a new docker container for the database and install the UUID extension:

```
docker-compose up -d
docker exec -it postgres bash
psql -U postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

5. Run the app:

```
uvicorn backend.main:app --host localhost --port 8000 --reload
```

**Userful commands:**

- On database model change use alembic to create a new revision of the database

```
alembic revision --autogenerate -m "creat users table"
alembic upgrade head
```

**Useful links:**

- [Online RSA Key Generator](http://travistidwell.com/jsencrypt/demo/)
- [Encode RSA Key to Base64](https://www.base64encode.org/)

## How to run the frontend

0. Set up environment (WSL)

```
sudo apt update && sudo apt upgrade
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm install node
```

1. Install the dependencies:

```
cd ./frontend/
npm i
```

2. Run the app:

```
npm start
```

**Userful commands:**

- `nvm ls` List installed Node.js versions.
- `node --version` Check current Node.js version in use.
- `npm --version` Check current npm version in use.

**Useful links:**

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Material UI documentation](https://mui.com/material-ui/getting-started/overview/)
