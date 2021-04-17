const { authJwt } = require("../middlewares");
const controller = require("../controllers/contact.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/contacts", controller.contactList);

  app.post("/api/contacts", controller.contactCreate);

  app.put("/api/contacts/:id", controller.contactUpdate);

  app.delete("/api/contacts/delete/:id", controller.contactDelete);
};