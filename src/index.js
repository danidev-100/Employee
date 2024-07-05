import express from 'express'
import usersRoutes from './routes/users.routes.js'
import signlogins from "./routes/auth.routes.js"
import employessRoutes from './routes/employees.routes.js'
import  hoursRoutes from './routes/workhours.routes.js'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';


    
const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerSpec = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"API REST EMPLOYEE",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:5000",
            }, 
            {
                url:"https://employee-red.vercel.app"
            }
        ]
    },
    apis: [`${path.join( __dirname,"./routes/*.js")}`]
}
const cor ={
    origin: ['http://localhost:5000/api/employees',"https://employee-red.vercel.app/api/employee"],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization'
}
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(cor))



app.use("/api/users", usersRoutes)
app.use("/api/employees/login", signlogins)
app.use("/api/employees",employessRoutes)
app.use("/api/employees/profile", signlogins)
app.use("/api/hours", hoursRoutes)
app.use("/api/doc",swaggerUI.serve,swaggerUI.setup(swaggerJSDoc(swaggerSpec)))

const PORTs = process.env.PORT

app.get('/', (req, res) =>{
    res.send("hola Mauri esto es la ruta principal..solo para saber si funciona el backend").json({msg: "anda"})
})


app.listen(PORTs)
console.log('listening on ' + PORTs);