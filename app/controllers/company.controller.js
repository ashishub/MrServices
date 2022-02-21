const db = require("../models");
const Company = db.companies;
const Op = db.Sequelize.Op;

/**
 * Sample Company object
 * {
      "name": "M/s. ABC LIMITED",
      "gstNumber": "33AASSK6172C1ZW",
      "billingAddress": "Kandigai Post, Gummidipoondi - 601 201, Thiruvallur Dist, Tamil Nadu."
    }
 * 
 * 
 */

function validateCompany(company, res) {
    if (!company) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!company.name) {
        res.status(400).send({
            message: `Company name "${company.name}" is invalid!`
        });
        return;
    }
    if (!company.gstNumber) {
        res.status(400).send({
            message: `GST number of Company "${company.gstNumber}" is invalid!`
        });
        return;
    }
    if (!company.billingAddress) {
        res.status(400).send({
            message: `Billing address "${company.billingAddress}" is invalid!`
        });
        return;
    }
}

// Create and Save a new Company
exports.create = (req, res) => {
    // Validate request
    validateCompany(req.body, res);

    // Create a Company
    const company = {
        name: req.body.name,
        gstNumber: req.body.gstNumber,
        billingAddress: req.body.billingAddress
    };
    // Save Company in the database
    Company.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Company."
            });
        });
};

// Create and Save a new Company
exports.createAll = (req, res) => {
    const companiesCreated = [];
    const errorCompanies = [];

    if (req.body && req.body.companies && req.body.companies.length > 0) {
        console.log("Length of the companies = "+req.body.companies.length);
        const companies = req.body.companies;

        Company.bulkCreate(req.body.companies, {
            returning: true
        }).then(data => {
            console.log(data);
            res.send(data);
        }).catch(err => {
            console.log(err);
            res.json(err);
        })
        /*for (const company of companies) {
            
            // Validate request
            validateCompany(company, res);

            // Save Company in the database
            Company.create(company)
                .then(data => {
                    // companiesCreated.push(data);
                    // console.log("Company info" + data);
                })
                .catch(err => {
                    console.log("Company info :: " + { company: company, error: err});
                    // errorCompanies.push({ company: company, error: err})
                });
        }
        res.send({ companies : companiesCreated, errors: errorCompanies});*/
    }

};

// Retrieve all Companys from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    Company.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Companys."
            });
        });
};
// Find a single Company with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Company.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Company with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Company with id=" + id
            });
        });
};


// Update a Company by the id in the request
exports.update = (req, res) => {
    validateCompany(req, res);
    const id = req.params.id;
    Company.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Company with id=" + id
            });
        });
};
// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Company.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Company with id=" + id
            });
        });
};
// Delete all Companys from the database.
exports.deleteAll = (req, res) => {

};