import expres from "express"
const app=expres()

app.use(cors({
    origin:process.env.CORS_ORIGIN ?.split(",") || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Authorization","Content-Type"]
}))

import videoGeneratingRoute from "./src/route/generateVideo.route.js"

app.use("/api",videoGeneratingRoute)

const PORT=8080;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})