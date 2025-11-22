// Importing necessary modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
require("dotenv").config();

// Creating server
const app = express();

// Using middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Creating databse Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database Connected Successfully");
    }
});

// Routings
app.get("/", (req, res) => {
    res.send("Hi this is my sample server side message");
});
app.post("/registerUser", async (req, res) => {
    const { email, password } = req.body;
    const checkQuery = `SELECT * FROM users WHERE email = ?`;
    db.query(checkQuery, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }
        if (results.length > 0) {
            return res.status(400).send("User Already Exists");
        }
        let hashedpwd;
        try {
            hashedpwd = await bcrypt.hash(password, 10);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Password Encryption Error");
        }
        const insertQuery = `INSERT INTO users (email, password) VALUES (?, ?)`;
        db.query(insertQuery, [email, hashedpwd], (err2) => {
            if (err2) {
                console.log(err2);
                return res.status(500).send("Database Insert Error");
            }
            return res.status(200).send("User Registered Successfully");
        });
    });
});

app.post("/loginUser", async (req, res) => {
    const { email, password } = req.body;
    const checkQuery = `SELECT * FROM users WHERE email = ?`;
    db.query(checkQuery, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }
        if (results.length === 0) {
            return res.status(404).send("Invalid email or password");
        }
        const user = results[0];
        let isMatch;
        try {
            isMatch = await bcrypt.compare(password, user.password);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Error comparing passwords");
        }
        if (!isMatch) {
            return res.status(401).send("Invalid email or password");
        }
        res.status(200).send({"userId" : user.userId});
    });
});

app.get("/fetchPosts/:id",async (req,res)=>{
    const userId = Number(req.params.id);
    const query = `SELECT * FROM posts WHERE userId=?`;
    db.query(query,[userId],(err,results)=>{
        if(err){
            console.log(err);
            return res.status(400).send("Internal Error");
        }
        return res.status(200).json(results);
    });
});

app.post("/addPost",(req,res)=>{
    const {postTitle,postContent,userId} = req.body;
    // console.log(req.body);
    console.log(userId,postTitle,postContent);
    if(!userId || !postTitle || !postContent){
        return res.status(400).send("Missing required feilds");
    }
    const insertquery = `INSERT INTO posts(userId,postTitle,postContent) VALUES (?,?,?)`;
    db.query(insertquery,[userId,postTitle,postContent],(err,results)=>{
        if(err){
            return res.status(400).send("Internal error");
        }
        return res.status(200).send("Post Created Successfully");
    });
});

app.delete("/deletePost/:id",(req,res)=>{
    const postId = req.params.id;
    const deleteQuery = `DELETE FROM posts WHERE postId = ?`;
    db.query(deleteQuery, [postId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database Error while deleting post");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Post not found");
        }
        res.status(200).send("Post deleted successfully");
    });
});
app.get("/:id",(req,res)=>{
    const postId = req.params.id;
    const query = `SELECT postTitle,postContent FROM posts WHERE postId=?`;
    db.query(query,[postId],(err,results)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal server error");
            return;
        }
        console.log(results);
        if(results.length == 0){
            return res.status(400).send("No post found");
        }
        return res.status(200).json(results[0]);
    });
});

// Port listening
app.listen(5000, () => {
    console.log("Server is running at Port : 5000");
});