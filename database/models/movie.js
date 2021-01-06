const Sequelize = require("sequelize");
const db = require("../db");

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  overview: {
    type: Sequelize.TEXT(),
  },
  movieAPIid: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //     isNumeric: true,
    // }
  },
  releaseDate: {
    type: Sequelize.STRING,
    validate: {
      isDate: true,
    },
  },
  vote_count: {
    type: Sequelize.INTEGER,
  },
  vote_average: {
    type: Sequelize.DECIMAL,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/256x256?text=Placeholder",
  },
});

module.exports = Movie;
