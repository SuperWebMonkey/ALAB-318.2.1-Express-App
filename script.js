const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const mustache = require("mustache-express");
const { JSDOM } = require("jsdom");

// Create a new JSDOM instance
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

// Access the document object
const document = dom.window.document;

// Register .mustache extension with Mustache Express
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname + "/views")); // Set views directory

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "pic")));

// main route
app.get("/", (req, res) => {
  const data = {
    title: "Hello, World!",
    message: "Welcome to Mustache with Express!",
  };
  res.render("index", data); // Render index.mustache
});

// about route
app.get("/about", (req, res) => {
  res.render("about");
});

// download route
app.get("/download", (req, res) => {
  const file = path.join(__dirname, "pic/", "negative-man-pic.png"); // path to image
  res.download(file);
});

// post route
app.post("/submit", (req, res) => {
  console.log("Form Data:", req.body);
  res.send("success");
});

// route with route parameter
// Route with a route parameter
app.get("/videogame/:character", (req, res) => {
  const { character } = req.params;
  res.send(`Hello, ${character}!`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

document.addEventListener("DOMContentLoaded", () => {
  const charBtn = document.getElementById("charSubmit");
  console.log(charBtn);

  charBtn.addEventListener("click", () => {
    const character = document.getElementById("charInput").value;
    fetch(`/videogame/${character}`)
      .then((response) => response.text())
      .then((data) => {
        alert(data);
      });
  });
});
