const mongoose = require('mongoose');

const schema=mongoose.Schema;
const ObjectId=schema.ObjectId;

const User=new schema({
    email: {type:String,unique:true,required:true},
    password: String,
    name: String,
});

const Todo=new schema({
    description: String,
    done:Boolean,
    userId:ObjectId
});

const UserModel=mongoose.model('users',User);
const TodoModel=mongoose.model('todos',Todo);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
};