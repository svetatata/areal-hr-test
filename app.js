import express from "express"
import { getSotrudniki, getOtdels, getPos } from "./database.js"

const app = express()
const port = 8080
app.set("view engine", "ejs")
app.use(express.static("views"))
app.use("/vendor", express.static("node_modules/imask/dist"))
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    const thisOtdel = req.query.otdel || ''
    const thisPos = req.query.position || ''
    const searchQ = req.query.searchQ || ''

    const sotrudniki = await getSotrudniki(thisOtdel, thisPos, searchQ)
    const otdels = await getOtdels()
    const positions = await getPos()
    res.render("index.ejs", {
        sotrudniki,
        otdels,
        positions,
        thisOtdel,
        thisPos,
        searchQ
    })
})
app.get("/createSotrudnik", async (req, res) => {
    const otdels = await getOtdels()
    const positions = await getPos()
    
    res.render("createSotrudnik.ejs", {
        otdels,
        positions,
        sotr: null 
    })
  } 
)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('ломай ломай мы же миллионеры')
})
app.listen(port, () => {
    console.log('корабль прибыл в порт http://localhost:' + port)
})