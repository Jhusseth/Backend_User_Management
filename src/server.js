require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwtDecode = require('jwt-decode');
const db = require('./config/database.config')


const app = express();


// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jhusseth application." });
});

app.use(require('./routes/auth.routes'))
app.use(require('./routes/campus.routes'))
app.use(require('./routes/contact.routes'))
app.use(require('./routes/user.routes'))


const attachUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
      return res
      .status(401)
      .json({ message: 'Authentication invalid' });
  }
  const decodedToken = jwtDecode(token.slice(7));

  if (!decodedToken) {
      return res.status(401).json({
      message: 'There was a problem authorizing the request'
      });
  } else {
      req.user = decodedToken;
      next();
  }
};

app.use(attachUser)

// Database Connection
db.connect();

// Settings
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
  console.log('Server listening on port: ', app.get('port'));
});


app.get("*", (req, res) => {
  res.json({ message: "Page Not Found" });
});

