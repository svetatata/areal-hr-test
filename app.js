import express from "express"
import { getSotrudniki } from "./database.js"

const app = express()
const port = 8080

app.get('/', async (req, res) => {
    const sotrudniki = await getSotrudniki()
    res.json(sotrudniki)
})

app.listen(port, () => {
    console.log('порт http://localhost:' + port)
})