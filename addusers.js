const db = require('./model/database.js');
const User = require('./model/user.js');

db.connectToDb();

async function add() {
    let admin = new User({
        username: 'admin',
        password: 'admin',
        name: 'John Baptist',
        type: 'admin'
    });

    let student = new User({
        username: '11839503',
        name: 'Justin Galura',
        password: 'password',
        type: 'student'
    });

    let student2 = new User({
        username: '11111111',
        name: 'Juan Cruz',
        password: 'password',
        type: 'student'
    });

    await Promise.all([
        admin.save(),
        student.save(),
        student2.save()
    ]);

    console.log('saved');
}

add();
