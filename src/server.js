const express = require("express");
const server = express();
const db = require("./database/db")
const nunjucks = require("nunjucks")

server.use(express.static("public"))
server.use(express.urlencoded({
    extended: true
}))

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get ("/", (req, res) => {
    return res.render("index.html");
})

server.get("/create-point", (req, res) => {   

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?)
`
    const valuesArr = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,       
       req.body.items,


    ];

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }       

        res.render("create-point.html", { saved: true })
    }

    db.run(query, valuesArr, afterInsertData )    
})



server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == ""){
        return res.render("search.html", { total: 0 })
    }



    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length
        return res.render("search.html", { places: rows, total })
    })

})

server.listen(3000);