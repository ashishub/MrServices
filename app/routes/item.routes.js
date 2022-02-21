module.exports = app => {
    const item = require("../controllers/item.controller.js");
    var router = require("express").Router();
    // Create a new Item
    router.post("/", item.create);
    // Create a multiple Item
    router.post("/many", item.createAll);
    // Retrieve all Items
    router.get("/", item.findAll);
    // Retrieve a single Item with id
    router.get("/:id", item.findOne);
    // Update a Item with id
    router.put("/:id", item.update);
    // Delete a Item with id
    router.delete("/:id", item.delete);
    // Delete all Items a new Item
    // router.delete("/", item.deleteAll);
    app.use('/api/item', router);
  };