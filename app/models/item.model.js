module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        itemName: {
            type: Sequelize.STRING,
            allowNull: false,
            // set(val) {
            //     this.setDataValue('itemName', val.toUpperCase());
            //   }
        },
        hsnCode: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isValidLength(value) {
                    if ( value && value.length >= 10) {
                      throw new Error('Invalid HSN Code provided!');
                    }
                  }
            },
        },
        unitOfMeasure: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { 
                isAlpha: true, 
                isValidLength(value) {
                    if ( value && value.length !== 3) {
                      throw new Error('Invalid Unit of measure Code provided!');
                    }
                  }
            }
        },
        gstPercent: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: { 
                isDecimal: {
                    msg: "GST % must be numeric decimal"
                  }, 
            }
        }
    }, {
        tableName: 'Items'
    });
    return Item;
};