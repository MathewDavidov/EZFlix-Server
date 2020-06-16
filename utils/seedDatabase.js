const { User, Movie } = require("../database/models");

const seedDatabase = async () => {
  await Promise.all([
    User.create({
      email: "joshua@gmail.com",
      password: "2hf92h9fh2",
    }),
    User.create({
      email: "dame@gmail.com",
      password: "f20nhf02$f",
    }),
    User.create({
      email: "jake@yahoo.com",
      password: "fn3fh93dfu3",
    }),
    // Movie.create({
    //   title: "Avengers",
    //   overview: "Team",
    //   movieAPIid: 240334,
    //   releaseDate: "2015-06-06",
    // }),
    // Movie.create({
    //   title: "Endgame",
    //   overview: "No Team",
    //   movieAPIid: 240301,
    //   releaseDate: "2019-06-06",
    // }),
  ]);
};

module.exports = seedDatabase;
