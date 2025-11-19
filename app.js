import express from "express"
import { getSotrudniki } from "./database.js"

const app = express()
const port = 8080
app.set("view engine", "ejs")
app.use(express.static("views"))

app.get('/', async (req, res) => {
    const sotrudniki = await getSotrudniki()
    res.render("index.ejs", {
    sotrudniki
    })
})

app.listen(port, () => {
    console.log('порт http://localhost:' + port)
})