const bodyParser = require("body-parser")
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const dbConnect = require("./config/dbConnect")
const authRouter = require("./routes/authRoute")
const productRouter = require("./routes/productRoute")
const blogRouter = require("./routes/blogRoute")
const {notFound, errorHandler} = require("./middlewares/errorhandler")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")



app.use(morgan("dev"))
dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())


app.use("/api/user", authRouter)
app.use("/api/product", productRouter)
app.use("/api/blog", blogRouter)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})