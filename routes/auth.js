const router = require("express").Router();
const articleValidation = require("../validation").articleValidation;
const Article = require("../models").articleModel;
//const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is coming in to auth.js");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working.",
  };
  return res.json(msgObj);
});

router.get("/", (req, res) => {
  Article.find({})
    .then((course) => {
      res.send(course);
    })
    .catch(() => {
      res.status(500).send("Error!! Cannot get course!!");
    });
});

router.get("/instructor/:_instructor_id", (req, res) => {
  let { _instructor_id } = req.params;
  Article.find({ instructor: _instructor_id })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send("Cannot get course data.");
    });
});

router.get("/findByName/:name", (req, res) => {
  let { name } = req.params;
  Article.find({ title: name })
    .then((course) => {
      res.status(200).send(course);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/student/:_student_id", (req, res) => {
  let { _student_id } = req.params;
  Article.find({ students: _student_id })
    .then((courses) => {
      res.status(200).send(courses);
    })
    .catch(() => {
      res.status(500).send("Cannot get data.");
    });
});

router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Article.findOne({ _id })
    .then((course) => {
      res.send(course);
    })
    .catch((e) => {
      res.send(e);
    });
});

module.exports = router;
