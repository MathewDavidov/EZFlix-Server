var express = require("express");
var router = express.Router();
const { User, Movie } = require("../database/models");
const { default: Axios } = require("axios");

const API_KEY = process.env.API_KEY;
const MOVIE_API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`

router.get("/", async (req, res, next) => {
    let results = [];
    await Axios
        .get(MOVIE_API_URL)
        .then((res) => {
            results = res.data.results;
            // console.log(res.data.results);
            for (const obj of results) {
                Movie.create({
                    title: obj.title,
                    overview: obj.overview,
                    movieAPIid: obj.id,
                    releaseDate: obj.release_date,
                })
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

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    let results = {};
    await Axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
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

module.exports = router;