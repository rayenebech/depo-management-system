module.exports = (sequelize, DataTypes) => {
    const Stores = sequelize.define("Stores", {
      storename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Stores.associate = (models) => {
      Stores.belongsTo(models.Users, {});

      Stores.hasMany(models.Storeproducts, {
          onDelete: "cascade",
      });
    };

  
    return Stores;
  };