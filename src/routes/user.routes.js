const controller = require("../controllers/user.controller");
const express = require('express'); 
const router = express.Router()

  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/api/users", controller.userRegisters);
  router.get("/api/:idCampus/users", controller.userList);
  router.post("/api/:idCampus/users", controller.createUser);
  router.put("/api/:idCampus/user/:id", controller.userUpdate);
  router.put("/api/user/:id", controller.userUpdate);
  router.delete("/api/:idCampus/user/delete/:id", controller.userDelete);
  router.get("/api/users/:search", controller.userSearch);
  router.get("/api/usersCampus/:search", controller.userCampusSearch);

module.exports = router;

