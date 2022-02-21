module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gstNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isValidLength(value) {
                    if ( value && value.length !== 15) {
                      throw new Error('Invalid GST Number provided!');
                    }
                  }
            },
            

        },
        billingAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { max: 255 }
        }
    }, {
        tableName: 'Company'
    });
    return Company;
};