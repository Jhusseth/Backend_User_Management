const contactController = {};
const Contact = require('../models/contact.model')

contactController.contactList = async (req, res)=>{
    Contact.find({}, function(err, contacts){
        res.status(200).json({
            contacts: contacts
        });
    });
}

contactController.contactCreate = async (req, res)=>{
    const contact = await new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    Contact.save(function(err){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).json(contact);
        } 
    });
}

contactController.contactUpdate = async (req, res)=>{

}

contactController.contactDelete = async (req, res)=>{
    await Contact.deleteOne({_id: req.body.id}, function(err){
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



export default contactController;