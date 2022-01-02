module.exports = (sequelize, DataTypes) => {
    const Salerecords = sequelize.define("Salerecords", {
      productname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      count: {
          type: DataTypes.INTEGER,
          allowNull: false,
      }
    });
  
  
    return Salerecords;
  };