const userController = {};
const User = require('../models/user.model')

userController.userList = async (req, res)=>{
    User.find({}, function(err, users){
        res.status(200).json({
            users: users
        });
    });  
}

userController.userUpdate = async (req, res)=>{
    const user= new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        valid_until: req.body.valid_until
    });
    
    await User.updateOne({_id:req.body.id},user)
}

userController.userDelete = async (req, res)=>{
    await User.deleteOne({_id: req.body.id}, function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.status(200).json({
                message: "The user was deleted"
            })
        }
        
    })
    
}

export default userController;
