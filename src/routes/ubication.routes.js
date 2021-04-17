const { authJwt } = require("../middlewares");
const controller = require("../controllers/ubication.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/ubication", controller.ubicationList);
  
  app.post("/api/ubication", controller.campusCreate);

  app.put("/api/ubication/:id", controller.campusUpdate);

  app.delete("/api/ubication/delete/:id", controller.campusDelete);
};