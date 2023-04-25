# jedlik-vizsgaremek

## IT Webshop project

### Content

- Github: [Link](https://github.com/xKeiro/jedlik-vizsgaremek)
- Documentation: [Link](https://docs.google.com/document/d/1Yr7cOVb5YnQZE8FiTCjsjiG3QIeLOKl3hKt94gyOdZ8/edit?usp=sharing)
- Database: MSSQL
- Backend: ASP.NET 7
- Frontend: React v18
- Design: Material UI v5

### Requirements

- ASP.NET 7 [Link](https://www.python.org/downloads/](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- Node.js 18.12+ [Link](https://nodejs.org/en/)
- Docker [Link](https://www.docker.com/)

## Team members

- Kevin Németh
- Dávid István Tercs

# Project guides

## How to run the project

### Database

UNDER CONSTRUCTION

### Backend

```
cd ./backend/
dotnet run
```

Backend shortcut: [http://localhost:5000](http://localhost:5000/)

### Frontend

```
cd ./frontend/
npm start
```

Frontend shortcut: [http://localhost:3000](http://localhost:3000/)

## How to set up the backend and database

UNDER CONSTRUCTION

## How to set up the frontend

0. Install the latest Node.js

```
# or set up WSL environment:

sudo apt update && sudo apt upgrade
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm install node
```

1. Install the dependencies:

```
cd ./frontend/
npm ci
```

2. Run the app:

```
npm start
```

**Userful commands:**

- `nvm ls` List installed Node.js versions in Node Version Manager.
- `node --version` Check current Node.js version in use.
- `npm --version` Check current npm version in use.

**Useful links:**

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Material UI documentation](https://mui.com/material-ui/getting-started/overview/)
