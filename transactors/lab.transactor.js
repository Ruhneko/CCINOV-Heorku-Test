const Labs = require('../model/lab.js');

//======================================================================
// Exports
//======================================================================

exports.findLabs = async(query, projection, callback) => {
    Labs.find(query, projection, function(error, result) {
        if (error) return callback(false);
        return callback(result);
    });
};

exports.addInventory = async(filter,LabItem, callback) =>{
    Labs.updateOne(filter,{'$addToSet':{'inventory': LabItem}}, function(error, result) {
        if (error) return callback(error);
        console.log(result);
        return callback(true);
    });
};

exports.updateInventory = async(filter, LabItem, callback) =>{
    Labs.updateOne(filter, {$set:{"inventory.$[updateItem]" : LabItem}}, {"arrayFilters": [{"updateItem.item.name" : LabItem.item.name}]}, function(error, result) {
        if (error) return callback(error);
        console.log(result);
        return callback(true);
    });
};

exports.getInventory = async(query, projection, callback) => {
    Labs.aggregate([
        {
            $unwind: '$inventory'
        },
        {
            $match: query
        }
    ],(function(error, result) {             
        if (error || result.length <1) return callback(error);
        var inventory = []
        for(var i = 0; i < result.length; i++){
            inventory.push(result[i].inventory)
        }
        return callback(inventory);
    }))
}
