// third party libraries
require("dotenv").config()
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser")


// third party libraries


// from my application
const dbConnetFunc = require('./config/db/dbConnect');



const userRouter = require("./routes/user/userRoute");
const categoryRouter = require("./routes/category/category");
/* const serviceRouter = require("./routes/service/serviceRouter");
 */

const PORT = process.env.PORT || 7000
const app = express();

// cors configuration


const corsOptions = {
    origin:["http://localhost:5173"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}

//Middleware

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))





// Routes



/* app.use("/api/v1/admin", adminRouter)


app.use("/api/v1/food", foodRouter)
*/

/* app.use("/api/v1/service", serviceRouter)  */

app.use("/api/v1/user", userRouter)
 
app.use("/api/v1/category", categoryRouter)


app.use("/", async(req, res) => { 
    res.send("Server running")
   })

app.use((req, res, next) => {
    res.status(404).json({
        message:"route not found"
    })
})



app.use((err, req, res, next) => {
    const errorMessage = err.message
    // the stack proprty tells what area in the application the error happenz
    const stack = err.stack
res.status(500).json({
    message: errorMessage,
    stack
})

})

const connetDbAndServer = async () => {
     
    try {
        const res = await dbConnetFunc()
        if(res){
            app.listen(PORT, function(){
                console.log(`Db connected and server listening on port now ${PORT}`)
            })
        }
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


connetDbAndServer()

