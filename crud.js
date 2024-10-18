const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
})

const crudModel = mongoose.model("crudData",crudSchema);

module.exports = crudModel