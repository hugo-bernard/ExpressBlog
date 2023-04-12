const express = require("express");
const User = require("../models/userModel");
const Article = require("../models/articleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = router;

//PostUser Method
router.post("/postUser", async (req, res) => {
  const data = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PostArticle Method
router.post("/postArticle", async (req, res) => {
  const data = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    critics: req.body.critics,
    audience: req.body.audience,
    rating: req.body.rating,
    genre: req.body.genre,
    director: req.body.director,
    producer: req.body.producer,
    writer: req.body.writer,
    release: req.body.release,
    runtime: req.body.runtime,
    distributor: req.body.distributor,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all articles Method
router.get("/getAll", async (req, res) => {
    try{
        const data = await Article.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});


//Get by last ten articles Method
router.get("/getTen", async (req, res) => {
  try{
    req.setTimeout(60 * 1000)
    const data = await Article.find().limit(10);
      res.json(data)
    }
  catch(error){
      res.status(500).json({message: error.message})
  }
});

//Update by ID Method
router.patch("/update/", (req, res) => {
  res.send("Update by ID API");
});

//Delete article by ID Method
router.delete("/deleteArticle:id", async (req, res) => {
  try {
    const data = await Article.findByIdAndDelete(req.params.id);
    res.json(data)
  } catch(error) {
    res.status(400).json({ message: error.message });
  }
});

const SECRET = "my-super-secret";

// Signup route to create a new user
router.post("/signup", async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    // send new user as response
    const token = await jwt.sign({ username: user.username }, SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route to verify a user and get a token
router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Get User from token
router.get("/getUser", async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try{
    const decoded = jwt.verify(token.slice(1, -1), SECRET);
  
    // query the database to get the user's data based on the extracted user ID
    const user = await User.findOne ({username: decoded.username});
    res.json(user)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
});