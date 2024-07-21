const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const PORT = 5000;
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/base');

const db = mongoose.connection;
db.once('open', () => {
    console.log("mongodb connected");
});

const userSchema = new mongoose.Schema({
    name: String,
    registerNumber: String,
    email: String,
    department: String,
    mobileNumber: String
});

const Users = mongoose.model("User", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo.html'));
});

app.post('/post', async (req, res) => {
    const { name, registerNumber, email, department, mobileNumber } = req.body;
    const user = new Users({
        name,
        registerNumber,
        email,
        department,
        mobileNumber
    });
    await user.save();
    console.log(user);
    res.send("Form submission successful");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
