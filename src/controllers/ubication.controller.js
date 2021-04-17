const ubicationController = {};
const Ubication = require('../models/ubication.model')

ubicationController.ubicationList = async (req, res)=>{
    Ubication.find({}, function(err, ubications){
        res.status(200).json({
            ubications: ubications
        });
    });
}

ubicationController.ubicationCreate = async (req, res)=>{
    const ubication = await new Ubication({
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode
    })
    Ubication.save(function(err){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).json(ubication);
        }
        
    });
}

ubicationController.ubicationUpdate = async (req, res)=>{
    
}

ubicationController.ubicationDelete = async (req, res)=>{
    await Ubication.deleteOne({_id: req.body.id}, function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.status(200).json({
                message: "The ubication was deleted"
            })
        }
        
    })
}



export default ubicationController;