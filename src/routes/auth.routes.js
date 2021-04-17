const controller  = require("../controllers/auth.controller");
const express = require('express'); 
const router = express.Router()
    
    router.post('/api/authenticate', controller.autenthenticated);
    
    router.post('/api/signup', controller.register);

module.exports = router;