const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

// top
app.get("/", (req, res) => {
  res.render("top.ejs");
});

// 一覧画面に対応するルーティングです
// URLと画面を表示するための処理を確認してください
app.get('/list', (req, res) => {
  connection.query(
    'SELECT * FROM articles',
    (error, results) => {
      // EJSファイルに渡すデータとプロパティ名を確認してください
      res.render('list.ejs', { articles: results });
    }
  );
});


// 閲覧画面に対応するルーティングです
// URLと画面を表示するための処理を確認してください
app.get('/article/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM articles WHERE id = ?',
    [id],
    (error, results) => {
      // EJSファイルに渡すデータとプロパティ名を確認してください
      res.render('article.ejs', { article: results[0] });
    }
  );
});


// Code to start the server
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening to port ${port}`));
