 const register = (req, res, bcrypt, db) =>  {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json('incorrect submission') 
    }
    const password_hash = bcrypt.hashSync(password)
    
    db.transaction(trx => {
        trx.insert({
           email: email,
            password_hash : password_hash
        }).into('login').
        returning('email').then(
            loginEmail =>
                trx('users')
                .returning('*')
                .insert({
                    name: name ,
                    email: loginEmail[0].email,
                    date_joined: new Date
                }).then(user => 
                    {
                        res.status(200)
                        res.json(user[0])
                    }
            ).catch(
                    err => res.status(400).json('unable to register')
        )
        ).then(trx.commit).catch(trx.rollback).then(trx.commit).catch(trx.rollback)
    })
}

export default register