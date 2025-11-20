import express from "express"
import { getSotrudniki, getOtdels, getPos, createSotrudnik, updateSotrudnik } from "./database.js"

const app = express()
const port = 8080
app.set("view engine", "ejs")
app.use(express.static("src"))
app.use("/vendor", express.static("node_modules/imask/dist"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    const thisOtdel = req.query.otdel || ''
    const thisPos = req.query.position || ''
    const searchQ = req.query.searchQ || ''

    const sotrudniki = await getSotrudniki(thisOtdel, thisPos, searchQ)
    const otdels = await getOtdels()
    const positions = await getPos()
    const filtered = (thisOtdel || thisPos || searchQ) ? true : false
    const status = sotrudniki.length === 0 && filtered ? 404 : 200
    res.status(status).render("index.ejs", {
        sotrudniki,
        otdels,
        positions,
        thisOtdel,
        thisPos,
        searchQ,
        status
    })
})
app.get("/sotrudnik", async (req, res) => {
    const otdels = await getOtdels()
    const positions = await getPos()
    
    res.render("sotrudnik.ejs", {
        otdels,
        positions,
        sotr: null 
    })
  } 
)
app.post("/sotrudnik", async (req, res) => {
    const data = req.body
    const passport = data.passport.replace(/\D/g, '').slice(0, 10)
    await createSotrudnik(
      data.last_name,
      data.first_name,
      data.middle_name,
      data.birth,
      passport,
      data.phone,
      data.address,
      data.otdel_id,
      data.position_id,
      data.salary,
      data.date_priema
    )
    res.redirect("/")
  }
)
app.post("/sotrudnik/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const passport = data.passport.replace(/\D/g, '').slice(0, 10);
    await updateSotrudnik(
      id,
      data.last_name,
      data.first_name,
      data.middle_name,
      data.birth,
      passport,
      data.phone,
      data.address,
      data.otdel_id,
      data.position_id,
      data.salary,
      data.date_priema
    )
    res.status(200).send('сотрудник обновлен');
  }
)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('ломай ломай мы же миллионеры')
})
app.listen(port, () => {
    console.log('корабль прибыл в порт http://localhost:' + port)
})