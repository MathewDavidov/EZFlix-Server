var express = require("express");
var router = express.Router();
const { User, Movie } = require("../database/models");
const { default: Axios } = require("axios");

// Route to get all favorited movies of a user
router.get("/:id/movies", async (req, res, next) => {
  // NOTE: If you want to restrict this to only the user logged in, add the commented lines below:
  // if (!req.user) {
  //   res.status(403).send("User is not logged in.");
  // }

  // Find the logged in user
  let foundUser;

  try {
    foundUser = await User.findOne({ where: { id: req.params.id } });
  } catch (err) {
    next(err);
  }

  // Find all the movies associated with the user retrieved above
  let moviesOfUser;

  try {
    moviesOfUser = await foundUser.getMovies();
  } catch (err) {
    next(err);
  }

  // Provide a JSON response all of the assoicated movies
  res.status(200).json(moviesOfUser);
});

// Route for adding a favorite movie based on given ID and the logged in user.
router.post("/favorite/:id", async (req, res, next) => {
  // If there is no user logged in, send a forbidden HTTP status
  if (!req.user) {
    res.status(403).send("User is not logged in.");
  }
  try {
    const { id } = req.params;
    let results = {};

    // Use an axios call to the movie API to get a movie based on the ID
    await Axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`)
      .then((result) => {
        console.log(result.data);
        results = result.data;
      })
      .catch((error) => console.log(error));

    // If the movie doesn't already exist in the database, add the movie. Otherwise, get the movie row.
    const movie = await Movie.findOrCreate({
      where: {
        title: results.title,
        overview: results.overview,
        movieAPIid: id,
        releaseDate: results.release_date,
        image: results.poster_path,
        vote_count: results.vote_count,
        vote_average: results.vote_average,
      },
    });

    // Find the logged in user and add the movie
    const currentUser = await User.findByPk(req.user.id, { include: Movie });
    await currentUser.addMovie(movie[0]);
    res.json(movie[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;