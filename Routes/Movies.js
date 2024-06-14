const express = require("express");
const router = express.Router();
const { verify, verifyAdmin } = require("../auth.js");
const Movie = require("../Controllers/Movies.js");

router.post("/addMovie", verify, verifyAdmin, Movie.addMovie);
router.get("/getMovies", Movie.getMovies);
router.get("/getMovie/:movieId", Movie.getSingleMovie);
router.patch("/updateMovie/:movieId", verify, verifyAdmin, Movie.updateMovie);
router.delete("/deleteMovie/:movieId", verify, verifyAdmin, Movie.deleteMovie);
router.patch("/addComment/:movieId", verify, Movie.addComment);
router.get("/getComments/:movieId", verify, Movie.getComments);

module.exports = router;
