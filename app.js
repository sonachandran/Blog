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
const multer = require('multer')
const path = require('path');
const { isBoxedPrimitive } = require('util/types');
app.use('/uploads', express.static('uploads'));

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
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ emailexists:true, message: 'User already exists' });
        }

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

app.post('/insertblog', upload.single('image'), async (req, res) => {
    try {
      
        const imagepath = req.file ? req.file.filename : ''
        const newblog = new Userblog({ ...req.body, image: imagepath })

        console.log('newuser', newblog);
        const response = await newblog.save()
        res.json(response)
    }
    catch (error) {
        console.error("Error inserting blog:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/find', async (req, res) => {
    let response = await Userblog.find()
    res.json(response)

})


app.get('/viewprofile/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



app.get('/viewblog/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;
        console.log(userId, 'jkk');

        const userBlog = await Userblog.findOne({ userid: userId });
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


app.put('/updateblog/:id', upload.single('image'), async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.params;
        const { title, description,name } = req.body;

        const imagepath = req.file ? req.file.filename : ''
        console.log('gfy',imagepath);

        const updatedBlog = await Userblog.findByIdAndUpdate(id, { title: title, description: description,name:name, image: imagepath }, { new: true });
        console.log('updated', updatedBlog);
        res.json(updatedBlog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.delete('/deleteblog/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id, 'jkk');

        const deletedBlog = await Userblog.findByIdAndDelete(id);
        console.log('deleted', deletedBlog);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(deletedBlog);
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/viewuserdetails/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;
        console.log(userId, 'jkk');

        const userBlog = await Userblog.find({ userid: userId });
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


app.put('/updateprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateprofile = await User.findByIdAndUpdate(id, req.body, { new: true }); // Ensure to pass req.body to update the profile
        console.log('updated profile', updateprofile);
        if (!updateprofile) {
            return res.status(404).json({ message: 'profile not found' });
        }
        res.json(updateprofile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/findblog/:id', async (req, res) => {
    const id = req.params.id;
    let response = await Userblog.findById(id)
    res.json(response)
})


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

app.get('/find', verifyToken, async (req, res) => {
    let response = await User.find()
    res.json(response)
})

app.listen(8000, () => {
    console.log('connected');
})

