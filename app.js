require('dotenv').config()

const path = require('path')
const express = require('express')
const authRouter = require('./routers/auth.router')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(
    express.urlencoded({
        extended: false
    })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(authRouter)

//error handling
app.use((err, req, res, next) => {
    const {
        message,
        code = 500,
        error = 'internal server error !'
    } = err

    return res.status(code).json({
        message,
        code,
        error
    })
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})