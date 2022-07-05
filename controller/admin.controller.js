//=========================================================
// Imports
//=========================================================

const User = require('../model/user.js');
const userTransactor = require('../transactors/user.transactor.js');
const labTransactor = require('../transactors/lab.transactor.js');
const Lab = require('../model/lab.js');
const { send } = require('express/lib/response');
const LabItem = require('../model/Schemas/lab-item.js');
const Item = require('../model/Schemas/item.js');
//=========================================================
// Exports
//=========================================================

exports.getAdminHome = async(req, res) => {
    console.log(req.session.user);
    if(! await userTransactor.isAdminSessionActive(req)) {
        res.redirect('/admin/login');
        return;
    }

    res.redirect('/admin/dashboard');   
};

exports.getAdminLogin = async(req, res) => {
    res.render('admin-login', {
        title: 'DLSU Laboratories | Admin Login',
        userPage: true,
        admin: true
    });
};

exports.getAdminDashboard = async(req, res) => {
    res.render('admin-dashboard', {
        title: 'DLSU Laboratories | Dashboard',
        userPage: false
    });
};

exports.getAdminInventory = async(req, res) => {
    var query = {};
    var projection = {'_id': false};

    await labTransactor.findLabs(query, projection, function(results) {
        res.render('admin-inventory', {
            title: 'DLSU Laboratories | Admin Home',
            userPage: false, 
            labs: results
        });
    });  
};

exports.getAdminUsers = async(req, res) => {
    res.render('admin-users', {
        title: 'DLSU Laboratories | Users',
        userPage: false
    });
};

exports.getAdminAdd = async(req, res) => {
    var query = {};
    var projection = {'_id': false, 'inventory': false};

    await labTransactor.findLabs(query, projection, function(results) {
        res.render('admin-add-item', {
            title: 'DLSU Laboratories | Add Material',
            userPage: false,
            labs: results
        });
    });  

};

exports.getAdminUpdate = async(req, res) => {
    var query = {
        name : req.query.name,
        location : req.query.location,
    }
    
    var projection = {}

    await labTransactor.getInventory(query, projection, function(results) {
        for(var i = 0; i<results.length; i++){
            if(results[i].item.name == req.query.item){
                var LabItem = results[i]
            }
        }

        res.render('admin-update-item', {
            title: 'DLSU Laboratories | Update Material',
            userPage: false ,
            Loc: req.query.location,
            Lab: req.query.name,
            Name: LabItem.item.name,
            Image: LabItem.item.image,
            Desc: LabItem.item.description,
            Stock: LabItem.stock,
            Loaned: LabItem.loaned,
            Tags: LabItem.item.tags
        });
        
    });  
};

exports.postAdminLogin = async(req, res) => {
    const username = req.body['admin-username'];
    const password = req.body['admin-password'];

    let user = await User.findOne({username: username, password: password});
    if (!user || user.type !== 'admin') {
        res.render('admin-login', {
            title: 'DLSU Laboratories | Admin Login',
            invalid: true,
            userPage: false 
        });
        return;
    }

    req.session.user = user.username;
    console.log(req.session.user);

    res.redirect('/admin');
}

exports.addLabItem = async(req, res) => {
    var filter = {
        name: req.body.lab,
        location: req.body.location
    }

    var Item = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        tags:req.body.tags,
    }

    var LabItem = {
        item: Item,
        stock: req.body.stock,
        available: req.body.stock,
        loaned: 0
    }

    await labTransactor.addInventory(filter, LabItem, function(results) {
        res.redirect('/admin/inventory');
    });  
}

exports.updateLabItem = async(req, res) => {
 
    var filter = {
        name: req.body.lab,
        location: req.body.location
    }

    var Item = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        tags:req.body.tags,
    }

    var LabItem = {
        item: Item,
        stock: req.body.stock,
        available: req.body.stock,
        loaned: 0
    }
    
    await labTransactor.updateInventory(filter, LabItem, function(results) {
        res.redirect('/admin/inventory');
    });  
}

exports.geLabItems = async(req, res) => {
    var query = req.query;
    var projection = {}

    await labTransactor.getInventory(query, projection, function(results) {
        res.status(200).send(results);
    });  

};