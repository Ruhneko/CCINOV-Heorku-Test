//=========================================================
// Dependencies
//=========================================================

const { hasSubscribers } = require('diagnostics_channel');
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const database = require('./model/database.js');
const routes = require('./routes/routes.js');

const session = require('express-session'); //EXPRESS-SESSIONS
const cookieParser = require('cookie-parser'); //COOKIES
const bodyParser = require('body-parser'); //BODY PARSING
const MongoStore = require('connect-mongo');
const { envPort, sessionKey, dbURL} = require('./config');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.engine(
    'hbs',
	engine({
		extname: 		'hbs',
		defaultView: 	'main',
		layoutsDir: 	path.join(__dirname, '/views/layouts'),
        partialsDir: 	path.join(__dirname, '/views/partials')
	}),
);

// //Init Cookie and Body Parser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// //Init Sessions
// app.use(
// 	session({
// 		key: 'user_sid',
// 		secret: 'yB35$ajp{v-T9$VD',
// 		resave: false,
// 		saveUninitialized: true,
// 		store: database.sessionStore,
// 		cookie: {
// 			maxAge: 1000 * 60 * 60 * 24, //24 HOURS
// 		},
// 	}),
// );

app.set('trust proxy', 1);
const sessOpts = {
    secret: sessionKey,
    resave: false,
    saveUninitialized: false, // no need to bloat the server with sessions for non-admins
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 20 minutes
        secure: false,
        //sameSite: 'none'
    },
    store: MongoStore.create({ mongoUrl: dbURL })
};

if (app.get('env') === 'production') {
    sessOpts.cookie.secure = true;
}

const sessMiddleware = session(sessOpts);
app.use(sessMiddleware);


//=========================================================
// Porting
//=========================================================

app.use('/', routes);

let port = envPort;

database.connectToDb();

app.listen(port, function () {
    console.log('App listening at port ' + port + '.');
});
