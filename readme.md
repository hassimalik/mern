# Steps in Creating a Full Stack MERN App

1. **Create a folder named `backend`**
2. **Go to `backend` and install the dependencies:**
   ```bash
   npm i express mongoose dotenv cors
   npm install -d nodemon
   ```
3. **Create a file named `server.js`**
   
   The `server.js` file handles the following core responsibilities:
   * Starts Application
   * Load Environment variables
   * Create Express App
   * Connect database
   * Start Listening

4. **Import and use Express** inside the `server.js` file to start the app on your desired port.
5. **Create a directory named `src`** and create a file named `app.js` inside it.
6. **Import and export Express** inside `app.js` to use it cleanly in the `server.js` file.

7. **Now we use reference from app.js**: We saved the import and export and express framework usage in the `app.js` and we use its instant in the `server.js`

8. **Creating MiddleWare**: Browser -> Middleware -> Route -> Response
- Every request passes through middleware first.
- A middleware is a function that runs between the request arriving and the route handling it.

9. **Creating a route folder**: Create index.js inside it. Import, export and use the express router feature.
- Browser -> Express App -> Router -> Route -> Response

