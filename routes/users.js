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

module.exports = router;