const UserController = {};
const User = require('../models/user.model')
const Campus = require('../models/campus.model')
const {
    hashPassword,
} = require('../config/auth.config');


UserController.userRegisters = async (req, res)=>{
  User.find({}, function(err, users){
      res.status(200).json({
          users: users
      });
  });  
}

UserController.userList = async (req, res)=>{
    User.find({campus:req.params.idCampus}, function(err, users){
        res.status(200).json({
            users: users
        });
    });  
}

UserController.createUser = async (req, res)=>{
    try {
        const { email, firstName, lastName, valid_until, valid } = req.body;
    
        const hashedPassword = await hashPassword(
          req.body.password
        );

        const campus = await Campus.findById(req.params.idCampus);

        const valid_date = valid_until.split('T')
    
        const userData = {
          email: email.toLowerCase(),
          firstName,
          lastName,
          password: hashedPassword,
          role: 'admin',
          valid_until: valid_date[0] + " " + valid_date[1],
          campus,
          valid
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
    
        if (savedUser) {

          return res.json({
            message: 'User created!',
          });
        } 
        else {
          return res.status(400).json({
            message: 'There was a problem creating user'
          });
        }
    } 
    catch (err) {
      console.log(err)
        return res.status(400).json({
          message: 'There was a problem creating your user account'
        });
    }
}

UserController.userUpdate = async (req, res)=>{
  
    const { email, firstName, lastName, valid_until, valid, password} = req.body;

    const user = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      password,
      role: 'admin',
      valid_until,
      valid
    };
    
    try{
      await User.findOneAndUpdate({_id:req.params.id},user).then( () => {
          res.status(200).json({
              message: "User was update successfully !!"
          })
      })    
    }
    catch(err){
        res.status(400).json({
            message: "Problem in update the user"
        })
    }
}

UserController.userDelete = async (req, res)=>{
    await User.deleteOne({_id: req.params.id}, function(err){
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

UserController.userSearch = async (req, res)=>{

  await User.find({firstName:req.params.search}, function(err, users){
    res.status(200).json({
        users: users
    });
  }); 

}

UserController.userCampusSearch = async (req, res)=>{

  const campuses = await Campus.findOne({name:req.params.search});
  
  await User.find({campus:campuses._id}, function(err, users){
    res.status(200).json({
      users: users
    });
  });  

}

module.exports= UserController;
