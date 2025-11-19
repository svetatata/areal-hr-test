import express from "express"
import { getSotrudniki, getOtdels, getPos } from "./database.js"

const app = express()
const port = 8080
app.set("view engine", "ejs")
app.use(express.static("views"))

app.get('/', async (req, res) => {
    const sotrudniki = await getSotrudniki()
    const otdels = await getOtdels()
    const positions = await getPos()
    res.render("index.ejs", {
    sotrudniki,
    otdels, 
    positions,
    thisOtdel: req.query.otdel || '', 
    thisPos: req.query.position || ''
    })
})

app.listen(port, () => {
    console.log('порт http://localhost:' + port)
})