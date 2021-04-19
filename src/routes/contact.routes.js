const controller = require("../controllers/contact.controller");
const express = require('express'); 
const router = express.Router()

  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/api/:idCampus/contacts", controller.contactList);

  router.post("/api/:idCampus/contacts", controller.contactCreate);

  router.put("/api/:idCampus/contact/:id", controller.contactUpdate);

  router.delete("/api/:idCampus/contact/delete/:id", controller.contactDelete);

module.exports = router;