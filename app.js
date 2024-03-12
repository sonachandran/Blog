const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Blog')
    .then(() => console.log('database connected'))

const cors = require('cors');
app.use(express.json())
app.use(cors())
const User = require('./models/User')
const Userblog = require('./models/Userblog');
const bcrypt = require('bcrypt')
const saltrounds = 10;
const jwt = require('jsonwebtoken');
const multer=require('multer')
const path=require('path');
const { isBoxedPrimitive } = require('util/types');
app.use('/uploads',express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({ storage: storage });



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
app.post('/insertblog',upload.single('image'), async (req, res) => {
    try {
        const imagepath=req.file ? req.file.filename :''
        const newblog = new Userblog({...req.body,image:imagepath})
        console.log('newuser',newblog);
        const response = await newblog.save()
        res.json(response)
    }
    catch (error) {
        console.error("Error inserting blog:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/find',async(req,res)=>{ 
    let response=await Userblog.find()
    res.json(response)

})


app.get('/viewprofile/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



app.get('/viewblog/:userid', async (req, res) => {
    try{
        const userId = req.params.userid;
        console.log(userId,'jkk');
       
        const userBlog = await Userblog.findOne({userid : userId});
        console.log('userr', userBlog);
        if (!userBlog) {
            return res.status(404).json({ message: 'User blog not found' });
        }
        res.json(userBlog);
    }
     catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
     }
     
});

app.put('/updateblog/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;
        console.log(userId, 'jkk');

        const userBlog = await Userblog.findOneAndUpdate(
            { userid: userId},
            { title: req.body.title, description: req.body.description },
            {new:true}
            );
        console.log('updated',userBlog);
        if (!userBlog) {
            return res.status(404).json({ message: 'User blog not found' });
        }
        res.json(userBlog);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



app.delete('/deleteblog/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;
        console.log(userId, 'jkk');

        const userBlog = await Userblog.findOneAndDelete(
            { userid: userId},
            { title: req.body.title, description: req.body.description },
            {new:true}
            );
        console.log('deleted',userBlog);
        if (!userBlog) {
            return res.status(404).json({ message: 'User blog not found' });
        }
        res.json(userBlog);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/viewuserdetails/:userid', async (req, res) => {
    try{
        const userId = req.params.userid;
        console.log(userId,'jkk');
       
        const userBlog = await Userblog.find({userid : userId});
        console.log('userr', userBlog);
        if (!userBlog) {
            return res.status(404).json({ message: 'User blog not found' });
        }
        res.json(userBlog);
    }
     catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
     }
     
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });//it takes all the data from database
        console.log("dfgsfr", user);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: user.id, username: user.username }, 'abc');
        console.log(token);
        res.json({ user, token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }

});

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    console.log(token);
    token = token.split(' ')
    console.log(token[1]);

    if (!token[1]) {
        return res.status(403).json({ message: 'Token is not provided' });
    }

    jwt.verify(token[1], 'abc', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.decoded = decoded;
        console.log(req.decoded, 'asd');
        next();
    });
};

app.get('/find', verifyToken, async (req, res) =>{
    let response = await User.find()
    res.json(response)
})

app.listen(8000, () => {
    console.log('connected');
})

