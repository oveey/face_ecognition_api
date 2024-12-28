const image = (req, res, db)=> {
    const {id} = req.body
    db('users')
    .where('id', '=', id)
    .increment('entries', 1) // Increment the 'entries' column by 1 in the database
    .returning('entries') // Return the updated 'entries' value
    .then(entries => {
        res.json(entries[0]) // Send 404 if no user is found
        }).catch(err => console.log (err))
    }

    export default image
