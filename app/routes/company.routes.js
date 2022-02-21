module.exports = app => {
    const company = require("../controllers/company.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", company.create);
    // Create a multiple Tutorial
    router.post("/many", company.createAll);
    // Retrieve all Tutorials
    router.get("/", company.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", company.findOne);
    // Update a Tutorial with id
    router.put("/:id", company.update);
    // Delete a Tutorial with id
    router.delete("/:id", company.delete);
    // Create a new Tutorial
    router.delete("/", company.deleteAll);
    app.use('/api/company', router);
  };