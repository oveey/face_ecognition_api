const register = async (req, res, bcrypt, db) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json('Incorrect submission');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json('Invalid email address');
    }

    const password_hash = bcrypt.hashSync(password);

    try {
        // Ensure tables exist before inserting data
        await db.schema.hasTable('login').then(async (exists) => {
            if (!exists) {
                await db.schema.createTable('login', (table) => {
                    table.increments('id').primary();
                    table.string('email').unique().notNullable();
                    table.string('password_hash').notNullable();
                    table.timestamp('created_at').defaultTo(db.fn.now());
                });
            }
        });

        await db.schema.hasTable('users').then(async (exists) => {
            if (!exists) {
                await db.schema.createTable('users', (table) => {
                    table.increments('id').primary();
                    table.string('name').notNullable();
                    table.string('email').unique().notNullable();
                    table.timestamp('date_joined').defaultTo(db.fn.now());
                });
            }
        });

        // Insert user data
        await db.transaction(async (trx) => {
            const loginEmail = await trx('login')
                .insert({ email, password_hash })
                .returning('email');

            const user = await trx('users')
                .returning('*')
                .insert({ name, email: loginEmail[0].email });

            res.status(200).json(user[0]);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json('Unable to register');
    }
};

export default register;