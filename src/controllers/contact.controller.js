const ContactController = {};
const Contact = require('../models/contact.model')
const Campus = require('../models/campus.model')

// ContactController.contactList = async (req, res)=>{
//     Contact.find({}, function(err, contacts){
//         res.status(200).json({
//             contacts: contacts
//         });
//     });
// }

ContactController.contactList = async (req, res)=>{

    Contact.find({campus:req.params.idCampus}, function(err, contacts){
        res.status(200).json({
            contacts: contacts
        });
    });
}



ContactController.contactCreate = async (req, res)=>{

    const campus = await Campus.findById(req.params.idCampus);

    const contact = await new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        campus: campus
    })
    contact.save(function(err){
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Problem in create contact"
            })
        } else {
            res.status(200).json({
                message: "The contact was created"
            })
        } 
    });
}

ContactController.contactUpdate = async (req, res)=>{

    const contact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    try{
        await Contact.findOneAndUpdate({_id:req.params.id},contact).then( () => {
            res.status(200).json({
                message: "Contact was update successfully !!"
            })
        })    
    }
    catch(err){
        res.status(400).json({
            message: "Problem in update the contact"
        })
    }

}

ContactController.contactDelete = async (req, res)=>{
    await Contact.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.status(200).json({
                message: "The contact was deleted"
            })
        }
        
    })
}

module.exports= ContactController;