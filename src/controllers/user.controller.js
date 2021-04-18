const userController = {};
const User = require('../models/user.model')
const Campus = require('../models/campus.model')
const {
    createToken,
    hashPassword,
} = require('../config/auth.config');

userController.userList = async (req, res)=>{
    User.find({}, function(err, users){
        res.status(200).json({
            users: users
        });
    });  
}

userController.createUser = async (req, res)=>{
    try {
        const { email, firstName, lastName, valid_until, valid, campus_id } = req.body;
    
        const hashedPassword = await hashPassword(
          req.body.password
        );

        const usrCampus=  await Campus.findById(campus_id)
    
        const userData = {
          email: email.toLowerCase(),
          firstName,
          lastName,
          password: hashedPassword,
          role: 'admin',
          valid_until,
          campus:usrCampus,
          valid,
        };
    
        const existingEmail = await User.findOne({
          email: userData.email
        }).lean();
    
        if (existingEmail) {
          return res
            .status(400)
            .json({ message: 'Email already exists' });
        }
    
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        usrCampus.users.push(newUser)

        Campus.updateOne({_id:campus_id},{usrCampus});
    
        if (savedUser) {
          createToken(savedUser);

          return res.json({
            message: 'User created!',
          });
        } else {
          return res.status(400).json({
            message: 'There was a problem creating user'
          });
        }
    } 
    catch (err) {
        return res.status(400).json({
          message: 'There was a problem creating your account'
        });
    }
}

userController.userUpdate = async (req, res)=>{
    
    const hashedPassword = await hashPassword(
        req.body.password
    );

    const user= new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
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
