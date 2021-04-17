const CampusController = {};
const Campus = require('../models/campus.model')


CampusController.campusList = async (req, res)=>{
    Campus.find({}, function(err, campus){
        res.status(200).json({
            campus: campus
        });
    });
}

CampusController.campusCreate = async (req, res)=>{
    const campus = await new Campus({
        name: req.body.name,
        active: req.body.active
    })
    Campus.save(function(err){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).json(campus);
        }
    });
}

CampusController.campusUpdate = async (req, res)=>{
    
}

CampusController.campusDelete = async (req, res)=>{
    await Campus.deleteOne({_id: req.body.id}, function(err){
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