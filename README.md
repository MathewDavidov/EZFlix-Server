# [Name] Backend Express Server

[Name] is a full stack web application completed for the CUNY2X bootcamp. The backend portion of the project was built with Node.js, Express.js, Passport.js, Sequelize, and PostgreSQL.

## Run the App Locally

In the command line:

```
npm install
```

To start up dev server with nodemon, run the appropriate command based on your system:

On Mac/Linux:

```npm run dev```

On Windows:

```npm run dev_windows```

Please make sure to create a `.env` file and save the `LOCAL_DATABASE_PASSWORD` variable if you are working locally.

```shell
LOCAL_DATABASE_PASSWORD=somePassword123
```

If you have no password, please pass an empty string in single-quotes like so:

```shell
LOCAL_DATABASE_PASSWORD=''
```

You may also use ElephantSQL and copy their database URL in the ```.env``` as follows:

```shell
DATABASE_URL=theurl
```

Additionally, you must define an API key to run the app locally:

```shell
API_KEY=thekey
```

---

# Frontend Repository 

[The frontend repository can be accessed here.](https://github.com/JohnAKASquib/capstone-project-client)

# APIs

[themoviedb.org](https://www.themoviedb.org/documentation/api)

# Routes

```GET: /auth/me``` returns a json representation of the currently logged in user if the user is logged-in with a response of ```200```.

```POST: /auth/signup``` creates a user based on the body of the request. If the user exists, return a status of ```401```. Otherwise, the account is created and a json representation of the new user is returned with a status of ```200```.

```POST: /auth/login``` uses passport to login based on the body of the request. If the user doesn't exist or the password/email is incorrect, return a status of ```401```. Otherwise, the account is logged-in and a json representation of the logged-in user is returned with a status of ```200```.

```DELETE: /auth/logout``` uses passport to logout and destroy the current session. Returns a status of ```204```.

```GET /api/movies``` returns a list of trending movies using themoviedb's API. Returns a json representation of the array of movies with a status of ```200```.

```GET /api/movies/:id``` returns a single movie using themoviedb's API route that searches for a movie with the ID in the parameter. Returns a json representation of the single movie with a status of ```200```.

```GET /api/movies/search/:term``` returns a list of movies recieved through a call to themoviedb's API route with the given search terms. Returns a json representation of the list of movies with a status of ```200```.

```POST /api/users/favorite/:id``` adds a movie to the user's list of favorite movies based on the ID of the parameter, which calls themoviedb's API route for searching a movie with an ID. If there is no user logged-in, return a status of ```403```. Otherwise, return a json representation of the movie returned with a status of ```200```.

```GET /api/users/:id/movies``` returns a list of a user's favorite movie, where the user is given by the parameter ID.  If the user is not logged-in, return a status of ```403```. Otherwise, return a json representation of the list of movies with a status of ```200```.
