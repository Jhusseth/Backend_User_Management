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

CampusController.campusCreate = async (req, res)=>{
    const ubication = await new Ubication({
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode
    })

    ubication.save(function(err){
        if (err) {
            console.log(err);
            res.send(err);
        } 
    });

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