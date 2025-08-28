# quiz-platform

## Environment setup

Create an `.env` file in `server/` with:

```
MONGO_URI=mongodb://localhost:27017/quizApp
JWT_SECRET=replace-with-strong-secret
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
```

Create an `.env` file in `client/` with:

```
REACT_APP_API_BASE_URL=http://localhost:5000
```

Then run:

```
cd server && npm install && npm start
```

In another terminal:

```
cd client && npm install && npm start
```