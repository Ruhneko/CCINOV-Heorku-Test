const express = require("express");

const app = express();

// Sessions and Cookies
const cookieParser   = require('cookie-parser');

//Init Cookie and Body Parser
app.use(express.json());
app.use(cookieParser());

app.get('/home(page)?(.html)?', function(req, res) {
    res.render('index', {
        title: 'DLSU Laboratories | Home',
        userPage: true
    })
});

app.get('/', function(req, res){
    res.render('index', {
        title: 'DLSU Laboratories | Home',
        userPage: true
    })
});

app.get('/inventory', function(req, res){
    res.render('inventory', {
        title: 'DLSU Laboratories | Inventory',
        userPage: true
    })
});

app.get('/loans', function(req, res){
    res.render('loans', {
        title: 'DLSU Laboratories | Loans',
        userPage: true
    })
});

app.get('/facilities', function(req, res){
    res.render('facilities', {
        title: 'DLSU Laboratories | Facilities',
        userPage: true
    })
});

//Delete eventually. For designing purposes only
app.get('/details', function(req, res){
    res.render('details', {
        title: 'DLSU Laboratories | Details',
        userPage: true
    })
});

//==================================================
// Admin 
//==================================================

// Imports
const AdminController = require('../controller/admin.controller.js');

// Routes
app.get('/admin', AdminController.getAdminHome);

app.get('/admin/login', AdminController.getAdminLogin);
app.post('/admin/login', AdminController.postAdminLogin);

app.get('/admin/users', AdminController.getAdminUsers);
app.get('/admin/dashboard', AdminController.getAdminDashboard);
app.get('/admin/inventory', AdminController.getAdminInventory);

app.get('/add', AdminController.getAdminAdd);
app.get('/update', AdminController.getAdminUpdate);

app.get('/logout', function (req, res) {
    req.logout;
    res.clearCookie('connect.sid', {path: '/'});
    res.clearCookie('user_sid', {path: '/'});
    req.session.destroy(function (err) {});
    res.redirect('/admin');
});

app.post('/addLabItem',  AdminController.addLabItem);
app.get('/getLabItems', AdminController.geLabItems);
app.post('/updateLabItem',  AdminController.updateLabItem);

module.exports = app;