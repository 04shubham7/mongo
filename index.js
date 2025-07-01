const express= require('express');
const jwt = require('jsonwebtoken');
// Assuming you have a db.js file that exports UserModel and TodoModel
const { UserModel, TodoModel } = require('./db'); // Assuming db.js is in the same directory
// Ensure you have a db.js file with the UserModel and TodoModel defined as shown in the comment above
const mongoose = require('mongoose');
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your actual secret key
mongoose.connect("mongodb+srv://shubham1230101130:tBc3kiQrDkXdq7nk@cluster0.tbrbsay.mongodb.net/todo-app-database");
const app = express();
app.use(express.json());

app.post('/signup',async function(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

       await UserModel.create({
            email: email,
            password: password,
            name: name
        })
        res.json({
            message: 'User created successfully',
        })
});

app.post('/signin',async function(req, res) {
       const email = req.body.email;
        const password = req.body.password;
        // Find the user by email and password
        // Note: In a real application, you should hash passwords and compare hashes instead of storing them in plain text
        const user =await UserModel.findOne({ email: email, password: password });
        console.log(user);
        if (user) {
            const token=jwt.sign({
                id: user._id.toString()
            },JWT_SECRET)
            res.json({
                token: token,
                message: 'User signed in successfully',
                user: user
            });
        } else {
            res.status(401).json({
                message: 'Invalid email or password'
            });
        }
});

function auth(req,res,next){
 const token=req.headers.token;
 const decodedData=jwt.verify(token,JWT_SECRET);
 if(decodedData){
    req.userId=decodedData.id;
    next();
 }else{
    res.status(401).json({
        message: 'Unauthorized'
    });
 }
}
app.post('/todo',auth,function(req, res) {
// req.userId
const userId = req.userId;
  res.json({
    userId: userId,
  });
});

app.get('/todos',auth,function(req, res) {
    const userId = req.userId;
  res.json({
    userId: userId,
  });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
