import 'dotenv'
import express from "express"
import { getSotrudniki, getSotrudnik, getOtdels, getPos, createSotrudnik, updateSotrudnik, kickSotrudnik, hireSotrudnik } from "./database.js"
import { formatDate } from "./utils.js"

const app = express()
const port = process.env.PORT || 8080
app.set("view engine", "ejs")
app.use(express.static("src"))
app.use("/vendor", express.static("node_modules/imask/dist"))
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
app.route('/sotrudnik')
  .get(async(req, res) => {
    const otdels = await getOtdels()
    const positions = await getPos()
    
    res.render("sotrudnik.ejs", {
        otdels,
        positions,
        sotr: null 
    })
  })
  .post(async(req, res) => {
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
  })
  
app.route('/sotrudnik/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    const sotr = await getSotrudnik(id)
    if (!sotr) {
        return res.status(404).send('Сотрудник не найден')
    }
    if (sotr.active === 0) {
        return res.status(403).send('Нельзя редактировать уволенного сотрудника')
    }
    const otdels = await getOtdels()
    const positions = await getPos()
    const birthForm = formatDate(sotr.birth);
    const datePriemaForm = formatDate(sotr.date_priema);

    res.render("sotrudnik.ejs", {
        otdels,
        positions,
        sotr: Object.assign({}, sotr, {
            birth: birthForm,
            date_priema: datePriemaForm
        })
    })
  })
  .post(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const passport = data.passport.replace(/\D/g, '').slice(0, 10);
    const sotr = await getSotrudnik(id);
    if (!sotr) {
        return res.status(404).send('Сотрудник не найден');
    }
    if (sotr.active === 0) {
        return res.status(403).send('Нельзя редактировать уволенного сотрудника');
    }
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
    res.redirect("/")
  })
  
app.post("/sotrudnik/:id/hire", async (req, res) => {
    const id = req.params.id;
    await hireSotrudnik(id);
    res.redirect("/")
})
app.post("/sotrudnik/:id/kick", async (req, res) => {
    const id = req.params.id;
    await kickSotrudnik(id);
    res.redirect("/")
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Ошибка сервера')
})
app.listen(port, () => {
    console.log('Порт: http://localhost:' + port)
})