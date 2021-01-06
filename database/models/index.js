// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;
const User = require("./user");
const Movie = require("./movie");

User.belongsToMany(Movie, { through: "UsersMovies" });
Movie.belongsToMany(User, { through: "UsersMovies" });

module.exports = {
  User,
  Movie,
};
