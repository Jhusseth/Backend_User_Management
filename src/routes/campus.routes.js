const { authJwt } = require("../middlewares");
const controller = require("../controllers/campus.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/campus", controller.campusList);
  
  app.post("/api/campus", controller.campusCreate);

  app.put("/api/campus/:id", controller.campusUpdate);

  app.delete("/api/campus/delete/:id", controller.campusDelete);
};