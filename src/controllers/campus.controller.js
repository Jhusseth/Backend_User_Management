const CampusController = {};
const Campus = require('../models/campus.model')
const {Ubication} = require('../models/ubication.model')

CampusController.campusList = async (req, res)=>{
    Campus.find({}, function(err, campus){
        res.status(200).json({
            campus: campus,
        });
    });
}


CampusController.findById = async (req, res)=>{
    try{
        await Campus.findOne({_id:req.params.id}).then( (campus) => {
            res.status(200).json({
               campus
            })
        })    
    }
    catch(err){
        res.status(400).json({
            message: "Problem in Query"
        })
    }
}

CampusController.campusCreate = async (req, res)=>{
    const ubication = await new Ubication({
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode
    })

    const campus = await new Campus({
        name: req.body.name,
        active: req.body.active,
        ubication: ubication
    })

    campus.save(function(err){
        if (err) {
            console.log(err);
            res.status(400).json({message: 'There was a problem creating your campus'});
        }
        else {
            res.status(200).json({message: 'Campus created!'});
        }
    });
}

CampusController.campusUpdate = async (req, res)=>{
    const ubication = {
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode
    }

    const campus = {
        name: req.body.name,
        active: req.body.active,
        ubication: ubication
    }

    try{
        await Campus.findOneAndUpdate({_id:req.params.id},campus).then( () => {
            res.status(200).json({
                message: " Was update !!"
            })
        })    
    }
    catch(err){
        res.status(400).json({
            message: "Problem in update"
        })
    }
}

CampusController.campusDelete = async (req, res)=>{
    await Campus.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.status(200).json({
                message: "The campus was deleted"
            })
        }
        
    })
}

module.exports= CampusController;