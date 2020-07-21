# EZFlix Backend Express Server

EZFlix is a full stack web application completed for the CUNY2X bootcamp. The backend portion of the project was built with Node.js, Express.js, Passport.js, Sequelize, and PostgreSQL.

## Deployed Website

[The deployed website is located here.](https://ezflix.netlify.app/)

## Local App Set-up

### Configure the ```.env``` file

Please make sure to create a `.env` file. You can copy [```.env.example```](./env.example) and fill in the correct information as follows:

You must define an API key to run the app locally:

```shell
API_KEY=thekey
```

You may use ElephantSQL and copy their database URL as follows:

```shell
DATABASE_URL=theurl
```

If you are not using ElephantSQL and prefer a local postgres database, use the `LOCAL_DATABASE_PASSWORD` variable instead of ```DATABASE_URL```:

```shell
LOCAL_DATABASE_PASSWORD=somePassword123
```

Define the database password. If you have no password, please pass an empty string in single-quotes like so:

```shell
LOCAL_DATABASE_PASSWORD=''
```

### Run the App Locally

In the command line:

```
npm install
```

To start up dev server with nodemon, run the appropriate command based on your system:

On Mac/Linux:

```shell
npm run dev
```

On Windows:

```shell
npm run dev_windows
```

---

# Frontend Repository 

[The frontend repository can be accessed here.](https://github.com/JohnAKASquib/capstone-project-client)

# APIs

[themoviedb.org](https://www.themoviedb.org/documentation/api)

# Endpoints

| HTTP Method | Path Endpoint | Parameters | Body | Description | HTTP Status Codes |
| --- | --- | --- | --- | --- | --- |
| GET | ```/auth/me``` | | | Returns a JSON representation of the currently logged in user if the user is logged-in. | ```200``` |
| POST | ```/auth/signup``` | | <ul><li>email ```string```</li><li>password ```string```</li><li>imageUrl ```string```</li></ul> | Creates a user based on the body of the request. If the user exists, return a status of ```401```. Otherwise, the account is created and a json representation of the new user is returned with a status of ```200```. | ```200```  ```401``` |
| POST | ```/auth/login``` | | <ul><li>email ```string```</li><li>password ```string```</li></ul> | Uses passport to login based on the body of the request. If the user doesn't exist or the password/email is incorrect, return a status of ```401```. Otherwise, the account is logged-in and a json representation of the logged-in user is returned with a status of ```200```. | ```200```  ```401``` |
| DELETE | ```/auth/logout``` | | | Uses passport to logout and destroy the current session. | ```204``` |
| GET | ```/api/movies``` | | | Returns a list of trending movies using themoviedb's API. Returns a json representation of the array of movies. | ```200``` |
| GET | ```/api/movies/:id``` | ```id``` <br /> The ID of a movie | | Returns a single movie using themoviedb's API route that searches for a movie with the ID in the parameter. Returns a json representation of the single movie. | ```200``` |
| GET | ```/api/movies/search/:term``` | ```term``` <br /> The search term for movies | | Returns a list of movies recieved through a call to themoviedb's API route with the given search terms. Returns a json representation of the list of movies. | ```200``` |
| GET | ```/api/movies/search/genre/:id``` | ```id``` <br /> The genre ID | | Returns a list of movies recieved through a call to themoviedb's API route with the given genre ID. Returns a json representation of the list of movies. | ```200``` |
| GET | ```/api/movies/search/genre/:id/:term``` | <ul><li>```id``` The genre ID</li><li>```term``` The search terms for movies</li></ul> | | Returns a list of movies recieved through a call to themoviedb's API route with the given genre ID and search terms. Returns a json representation of the list of movies. | ```200``` |
| POST | ```/api/users/favorite/:id``` | ```id``` <br /> The movie ID |  | Adds a movie to the user's list of favorite movies based on the ID of the parameter, which calls themoviedb's API route for searching a movie with an ID. If there is no user logged-in, return a status of ```403```. Otherwise, return a json representation of the movie returned with a status of ```200``` | ```200```  ```403``` |.
 | DELETE | ```/api/users/:id/movies/remove/:movieID``` | <ul><li>```id``` The logged-in user ID</li><li>```movieID``` The movie ID</li></ul> | | Removes the movie (given by parameter movieID) associated with the logged-in user. The route performs a database query to see if the movie exists and if the movie is associated with the user. If there is no user logged-in, return a status of ```403```. If the movie doesn't exist or isn't associated with the user, return a status of ```401```. Otherwise, remove the association and return a status of ```204```. | ```204```  ```401```  ```403``` | 
| GET | ```/api/users/:id/movies``` | ```id``` <br /> The logged-in user ID | | Returns a list of a user's favorite movie, where the user is given by the parameter ID.  If the user is not logged-in, return a status of ```403```. Otherwise, return a json representation of the list of movies with a status of ```200```. | ```200```  ```403``` |
