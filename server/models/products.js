module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
      productname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
          type: DataTypes.STRING,
          allowNull: false,
      }
    });
  
    Products.associate = (models) => {
      Products.hasMany(models.Approvals, {
        onDelete: "cascade",
      });

    };
  
    return Products;
  };