module.exports = (sequelize, DataTypes) => {
    const Storeproducts = sequelize.define("Storeproducts", {
      productname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  


  
    return Storeproducts;
  };