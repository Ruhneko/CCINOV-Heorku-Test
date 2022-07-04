//======================================================================
// Imports
//======================================================================

const User = require('../model/user.js');

//======================================================================
// Exports
//======================================================================

exports.isAdminSessionActive = async(req) => {
    if (!(req.session.user)) {
        return false; 
    };

    let user = await User.findOne({username: req.session.user});
    
    return user.type === "admin";
};