import express from "express"

const app = express();

app.use(express.json());



app.get("/health", (req,res)=>{
    res.send("Status : Ok");
})



const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})