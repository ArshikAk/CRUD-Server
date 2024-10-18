const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const crudModel = require("./crud");

mongoose.connect("mongodb+srv://Arshik:ammukutty123@chatapp.upoqts6.mongodb.net/crud")
.then(() => {
    console.log("Connected to MongoDB");
})


app.use(express.json());
app.use(cors({origin : true , credentials : true}));

app.post("/create",(req,res) => {
    const {name,age,email} = req.body;

    crudModel.create({
        name : name,
        age : age,
        email : email
    })
    .then(data = () => {
        res.json("added");
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get("/read",(req,res) =>{
    crudModel.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.put("/update",(req,res) => {

    const data = req.body;
    console.log(data);
    const newName = data.new;
    const oldName = data.old;

    crudModel.updateOne({name : oldName},
        {$set : {name : newName}}
    )
    .then(data => {
        res.json("updated")
    })
    .catch((err) => {
        console.log(err);
    })
})

app.delete("/delete:name",(req,res) => {

    const data = req.params.name;
    console.log(data)

    crudModel.deleteOne({name : data})
    .then(data => {
        res.json("deleted");
    })
    .catch((err) => {
        console.log(err)
    })
})

app.listen(5173, () => {
    console.log("Server is running on port 5173");
})