
import express, { Express , Router} from "express";
import rootrouter from "./routs/index"
import cors from 'cors';



const app:Express = express();

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use("/api",rootrouter);





const port : number = 3000;



app.listen(port, ()=>{
    console.log("http://localhost:3000");
})