const express = require("express");
const Movie = require("../Models/Movies.js");
const { errorHandler } = require("../auth.js");

module.exports.addMovie = (req, res) => {
     const { title, director, year, description, genre } = req.body;

     Movie.findOne({ title: req.body.title })
          .then((result) => {
               console.log(result);
               if (result) {
                    return res.status(409).send({
                         message: "Movie already exist",
                    });
               }
               let newMovie = new Movie({
                    title,
                    director,
                    year,
                    description,
                    genre,
               });

               newMovie
                    .save()
                    .then((result) => res.status(201).send(result))
                    .catch((err) => errorHandler(err, req, res));
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.getMovies = (req, res) => {
     Movie.find({})
          .then((result) => {
               if (!result) {
                    return res.status(404).send({ message: "Failed to get movies" });
               }

               return res.status(200).send({
                    movies: result,
               });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.getSingleMovie = (req, res) => {
     Movie.findOne({ _id: req.params.movieId })
          .then((result) => {
               if (!result) {
                    return res.status(404).send({ message: "Failed to get movie" });
               }

               return res.status(200).send(result);
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.updateMovie = (req, res) => {
     const { title, director, year, description, genre } = req.body;

     let update = {
          title,
          director,
          year,
          description,
          genre,
     };

     Movie.findByIdAndUpdate({ _id: req.params.movieId }, update, { extended: true })
          .then((result) => {
               if (!result) {
                    return res.status(400).send({ message: "Failed to update the movie" });
               }

               return res.status(200).send({
                    message: "Movie updated successfully",
                    updatedMovie: result,
               });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.deleteMovie = (req, res) => {
     Movie.findByIdAndDelete({ _id: req.params.movieId })
          .then((result) => {
               if (!result) {
                    return res.status(400).send({
                         message: "Failed to delete movie",
                    });
               }

               return res.status(200).send({ message: "Movie deleted successfully" });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.addComment = (req, res) => {
     const { comment } = req.body;
     console.log(comment);
     const newComment = {
          userId: req.user.id,
          comment: comment,
     };

     Movie.findByIdAndUpdate({ _id: req.params.movieId }, { $push: { comments: newComment } }, { new: true })
          .then((result) => {
               if (!result) {
                    return res.status(400).send({ message: "Cannot get movies" });
               }
               return res.status(201).send({
                    message: "Comment Added Successfully",
                    updatedMovie: result,
               });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.getComments = (req, res) => {
     Movie.findOne({ _id: req.params.movieId })
          .then((result) => {
               console.log(result);
               if (!result) {
                    return res.status(400).send({ message: "Failed to get comment" });
               }

               return res.status(200).send(result.comments);
          })
          .catch((err) => errorHandler(err, req, res));
};
