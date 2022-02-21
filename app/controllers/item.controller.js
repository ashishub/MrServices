const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

function validateItem(item, res) {
    if (!item) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!item.itemName) {
        res.status(400).send({
            message: `Item name "${item.itemName}" is invalid!`
        });
        return;
    }
    if (!item.hsnCode) {
        res.status(400).send({
            message: `HSN Code of the item "${item.hsnCode}" is invalid!`
        });
        return;
    }
    if (!item.unitOfMeasure) {
        res.status(400).send({
            message: `Unit Of Measure "${item.unitOfMeasure}" is invalid!`
        });
        return;
    }
    if (!item.gstPercent) {
        res.status(400).send({
            message: `GST % "${item.gstPercent}" is invalid!`
        });
        return;
    }
}

// Create and Save a new Item
exports.create = (req, res) => {
    // Validate request
    const item = req.body;
    validateItem(item, res)
    // Create a Item

    // Save Item in the database
    Item.create(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Item."
            });
        });
};


// Create and Save a mulitple Items
exports.createAll = (req, res) => {

    if (req.body && req.body.items && req.body.items.length > 0) {
        console.log("Length of the Items = " + req.body.items.length);

        Item.bulkCreate(req.body.items, {
            returning: true
        }).then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            res.json(err);
        })
    }

};


// Retrieve all Items or matching the Item name from the database.
exports.findAll = (req, res) => {
    const itemName = req.query.itemName;
    var condition = itemName ? { itemName: { [Op.iLike]: `%${itemName}%` } } : null;
    Item.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Items."
            });
        });
};
// Find a single Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Item.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Item with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Item with id=" + id
            });
        });
};
// Update a Item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Item.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + id
            });
        });
};
// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Item.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
};
// Delete all Items from the database.
exports.deleteAll = (req, res) => {
    Item.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Items were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Items."
            });
        });
};