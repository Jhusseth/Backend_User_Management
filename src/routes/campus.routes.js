const controller = require("../controllers/campus.controller");

const express = require('express'); 
const router = express.Router()

  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/api/campus", controller.campusList);

  router.post("/api/campus", controller.campusCreate);

  router.put("/api/campus/:id", controller.campusUpdate);

  router.delete("/api/campus/delete/:id", controller.campusDelete);

module.exports = router;