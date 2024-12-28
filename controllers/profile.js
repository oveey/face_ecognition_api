const profile = (req, res, db) => {

    const {id} = req.params
    db.select('*').from('users').where({id}).then(user => {
        if(user.length){
            res.send(user[0])
        }else{
            res.status(404).send('no such user') 
        }
    }
    )
        
}

export default profile