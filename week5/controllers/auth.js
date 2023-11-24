const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
const path = require("path");
const app = express()
const port = 5000;



const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



exports.register = (req,res)=>{
    console.log(req.body);
    const {name,email,password,passwordConfirm} =req.body;

    db.query("SELECT email FROM users WHERE email = ?",[email], async(error,result) => {
        if (error) {
            console.log(error)
        }
        if (result.length >0){
            return res.render("register"),{
                message: 'This email is already taken'
        }}
            else if (password != passwordConfirm){
                return res.render("register"),{
                    message: "Passwords do not match"
                }};

         let hasedPassword = await bcrypt.hash(password,8);
         console.log(hasedPassword)

         db.query("INSERT INTO users SET ?", {name:name, email:email , password:hasedPassword},(error,results) => {
         if (error) {
            console.log(error);
         }
         else{
            console.log(results);
            return res.render("register",{
                message: "User registered"
            });
         }
        })
        })
}

exports.login = (req, res) => {
    const { email, password } = req.body;
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.sendStatus(500);
      }
  
      if (results.length > 0) {
        const user = results[0];
  
        bcrypt.compare(password, user.password, (bcryptErr, match) => {
          if (bcryptErr) {
            console.error('Bcrypt error:', bcryptErr);
            return res.sendStatus(500);
          }
  
          if (match) {
  
            db.query('SELECT id, name, email FROM users WHERE id = ?', [user.id], (error, profileResults) => {
              if (error) {
                console.error('Database query error:', error);
                return res.sendStatus(500);
              }
  
              if (profileResults.length > 0) {
                const userProfile = profileResults[0];
  
      
                res.render("profile", { user: userProfile });
              } else {
                res.render("login", {
                  message: "Invalid username or password: User not found"
                });
              }
            });
          } else {
            res.render("login", {
              message: "Invalid username or password"
            });
          }
        });
      } else {
        res.render("login", {
          message: "Invalid username or password: User not found"
        });
      }
    });
  };

exports.isLoggedIn = (req, res, next) => {
 
  const token = req.cookies.token;
  if (token) {
    try {
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      db.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id],
        (error, results) => {
          if (error) {
            
            console.log(error);
            res.redirect("/error");
          } else {
            if (results.length > 0) {
              
              req.user = results[0];
              next(); 
            } else {
              
              res.redirect("/login");
            }
          }
        }
      );
    } catch (error) {
     
      console.log(error);
      res.redirect("/error");
    }
  } else {
   
    res.redirect("/login");
  }
};