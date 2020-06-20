var express = require("express");
var router = express.Router();
const { User, Movie } = require("../database/models");
const { default: Axios } = require("axios");
const { response } = require("express");

const API_KEY = process.env.API_KEY;
const MOVIE_API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`; //Jack+Reacher"
const DISCOVER_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=`;

router.get("/", async (req, res, next) => {
  let results = [];
  await Axios.get(MOVIE_API_URL)
    .then((res) => {
      results = res.data.results;
      // console.log(res.data.results);
      for (const obj of results) {
        Movie.create({
          title: obj.title,
          overview: obj.overview,
          movieAPIid: obj.id,
          releaseDate: obj.release_date,
        });
      }
    })
    .catch((error) => console.log(error));

  try {
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }

  // try {
  //     const movies = await Movie.findAll({ include: User });
  //     console.log(movies);
  //     res.status(200).json(movies);
  // } catch (err) {
  //     next(err);
  // }
});

//route to serve up searched movies
router.get("/search/:term", async (req, res, next) => {
  const { term } = req.params;
  console.log(term);
  let results = [];
  await Axios.get(`${SEARCH_API_URL}${term}`)
    .then((response) => {
      results = response.data;
    })
    .catch((error) => console.log(error));

  try {
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

//route to serve up movies from their genre id no.
router.get("/search/genre/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  let results = [];
  await Axios.get(`${DISCOVER_API_URL}${id}`)
    .then((response) => {
      results = response.data;
    })
    .catch((error) => console.log(error));

  try {
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

//route to serve up movies based on both search term and genre id
router.get("/search/genre/:id/:term", async (req, res, next) => {
  const { id, term } = req.params;
  console.log("Genre ID: " + id + " and Search Term is: " + term);
  let results = [];
  await Axios.get(`${SEARCH_API_URL}${term}&with_genres=${id}`)
    .then((response) => {
      results = response.data;
    })
    .catch((error) => console.log(error));

  try {
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let results = {};
  await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then((result) => {
      results = result.data;
    })
    .catch((error) => console.log(error));

  try {
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

//router.get("/search/:genreId/:searchTerm", async(req, res,))
module.exports = router;
