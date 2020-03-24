var db = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function(app) {
  app.get('/api/user', function(req, res) { });

  app.get('/api/user/logout', function(req, res) {
    res.clearCookie('token');

    res.json('logged out user');
  });

  app.post('/api/user/signup', async function(req, res) {
    const email = req.body.email.toLowerCase();

    //hash our password
    // bcrypt.hash(req.body.password, 10).then(function(data) {});
    const password = await bcrypt.hash(req.body.password, 10);

    //create the user in the database
    db.User.create({
      email: email,
      password: password
    }).then(user => {


      //create our cookie
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      });
      console.log('user----------------------------');
      console.log(user);

      res.json(user);
    });
  });
  app.post('/api/user/login', async function(req, res) {
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      res.json('NO USER FOUND WITH THAT EMAIL');
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      res.json('INCORRECT PASSWORD ENTERED');
    }

    //create our cookie
    const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    res.json(user);
  });
};
