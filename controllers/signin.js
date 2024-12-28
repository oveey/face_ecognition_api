const signin = (req,res, bcrypt, db) => {
    const { email, password } = req.body;
  
    db.select('email', 'password_hash')
      .from('login')
      .where('email', '=', email)
      .then(user => {
        if (user.length) { // Check if the user exists
          const isValid = bcrypt.compareSync(password, user[0].password_hash);
          if (isValid) {
            return db
              .select('*')
              .from('users')
              .where('email', '=', email)
              .then(user => res.json(user[0]))
              .catch(err => res.status(400).json('unable to get user'));
          } else {
            // Wrong password
            res.status(400).json('wrong credentials');
          }
        } else {
          // Email not found
          res.status(400).json('wrong credentials');
        }
      })
      .catch(err => res.status(400).json('error logging in'));
  }

  export default signin