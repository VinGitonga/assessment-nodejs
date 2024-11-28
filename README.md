## Application
- Simple application that saves customer transactions from MPESA.

## Tech Stack
- Node JS
- Express
- Typeorm
- PostgresSQL
- Typescript
- Winston & Morgan - for loggin
- Jsonwebtoken - For Authenticating Users

## Prequisites
Node JS - 18 and above
Yarn

### How to run
1. Clone the repo
```bash
git clone https://github.com/VinGitonga/assessment-nodejs.git
```
2. Install dependencies
```bash
yarn
npm i -g nodemon // for run dev
```
3. Setup environment variables
- Create a .env file at the root of the directory
Add the following 
```txt
APP_PORT=5097
DB_HOST=<your db host>
DB_USERNAME=<your db username>
DB_PASSWORD=<your db password>
DB_DATABASE=<your db name>
JWT_SECRET=cr8FsosxeaoxXywuPphS+Mcb+bRq4UkO/qBG7hqK
```

4. Start the application
```bash
yarn start:dev
```

5. Access the API at `http://localhost:5097`
