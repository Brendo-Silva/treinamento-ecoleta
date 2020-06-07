const express = require("express");
const server = express();
const db = require("./database/db")
const nunjucks = require("nunjucks")

server.use(express.static("public"))

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get ("/", (req, res) => {
    return res.render("index.html");
})

server.get("/create-point", (req, res) => {

    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    res.send("ok")
})



server.get("/search", (req, res) => {

    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length
        return res.render("search.html", { places: rows, total })
    })

})

server.listen(3000);