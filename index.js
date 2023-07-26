const bodyParser = require("body-parser")
const express = require('express')
const serverless = require('serverless-http')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const dbConnect = require("./config/dbConnect")
const authRouter = require("./routes/authRoute")
const productRouter = require("./routes/productRoute")
const blogRouter = require("./routes/blogRoute")
const categoryRouter = require("./routes/prodcategoryRoute")
const blogcategoryRouter = require("./routes/blogCatRoute")
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute")

const {notFound, errorHandler} = require("./middlewares/errorhandler")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')



app.use(morgan("dev"))
dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce Application API",
            version: "1.0",
            contact: {
                name: "Trishul",
                url: "https://www.linkedin.com/in/trishulbs/",
                email: "trishulbudanur@gmail.com"
            }
        },
        servers: [
            {
                url: "https://6ijbir840a.execute-api.us-west-1.amazonaws.com/dev/"
            },
            {
                url: "http://localhost:5000/"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ["./routes/*.js"]
};



const spacs = swaggerjsdoc(options)
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
)

app.get("/hello",( req, res) => {
    res.json({hello: "hello world"})
    
})
app.use("/api/user", authRouter)
app.use("/api/product", productRouter)
app.use("/api/blog", blogRouter)
app.use("/api/category", categoryRouter)
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter)
app.use("/api/coupon", couponRouter)

app.use(notFound)
app.use(errorHandler)



// app.listen(PORT, () => {
//     console.log(`Server is running at PORT ${PORT}`)
// })

module.exports = app
