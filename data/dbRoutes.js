const express = require("express");
const dbs = require("./db.js");
const router = express.Router();

router.post("/", (req, res) => {
  if (req.body.title && req.body.contents) {
    dbs
      .insert(req.body)
      .then((item) => {
        console.log(item.id);
        dbs
          .findById(item.id)
          .then((db) => {
            res.status(201).json(db);
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .json({
                message:
                  "There was an error while saving the post to the database",
              });
          });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({
            message: "There was an error while saving the post to the database",
          });
      });
  } else {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post.",
      });
  }
});

router.post("/:id/comments", (req, res) => {
  if (req.body.text && req.params.id > 0) {
    const comment = { text: req.body.text, post_id: req.params.id };
    dbs
      .insertComment(comment)
      .then((item) => {
        res.status(200).json(comment);
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            error:
              "There was an error while saving the comment to the database",
          });
      });
  } else {
    res.status(400).json({ error: "bisey eksik" });
  }
});

router.get("/", (req, res) => {
  dbs
    // .find(req.query)
    .find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

router.get("/:id", (req, res) => {
  dbs
    .findById(req.params.id)
    .then((item) => {
      if (item) {
        res.status(200).json({ item });
      } else
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  dbs
    .findCommentById(req.params.id)
    .then((item) => {
      if (item) {
        res.status(200).json(item);
      } else {
        res
          .status(404)
          .json({
            message: "The comment with the specified ID does not exist.",
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  dbs
    .remove(req.params.id)
    .then((item) => {
      if (item > 0) {
        res.status(200).json({ message: "succesfully deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  if (req.params.id > 0 && req.body.title && req.body.contents) {
    dbs
      .update(req.params.id, req.body)
      .then((krz) => {
        console.log(krz);
        dbs
          .findById(req.params.id)
          .then((itm) => {
            res.status(200).json(itm);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  } else if (req.params.id <= 0) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    res
      .status(404)
      .json({
        errorMessage: "Please provide title and contents for the post.",
      });
  }
});

module.exports = router;
