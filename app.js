const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Blog')
    .then(() => console.log('database connected'))

const cors = require('cors');
app.use(express.json())
app.use(cors())
const User = require('./models/User')
const bcrypt = require('bcrypt')
const saltrounds = 10;
app.post('/insert', async (req, res) => {

    try {
        // const existingUser = await User.findOne({ email: req.body.email });
        // if (existingUser) {
        //     return res.status(400).json({ message: 'User already exists' });
        // }

        let hashpassword = await bcrypt.hash(req.body.password, saltrounds)
        console.log(hashpassword);
        let newuserr = new User({ ...req.body, password: hashpassword })
        console.log(newuserr);
        let response = await newuserr.save()
        console.log(response);
        res.json(response)
    }

    catch (error) {
        console.log("error", error);
    }

})

// console.log(req.body); 
// const newuser = new Users(req.body);
// console.log("users",newuser)
// let response = await newuser.save();
// console.log(response);
// res.json(response);   




app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });//it takes all the data from database
        console.log("dfgsfr",user);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', user });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }

});

app.listen(8000, () => {
    console.log('connected');
})

