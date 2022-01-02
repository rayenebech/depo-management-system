module.exports = (sequelize, DataTypes) => {
    const Branches = sequelize.define("Branches", {
      branchname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Branches.associate = (models) => {
      Branches.hasMany(models.Products, {
        onDelete: "cascade",
      });

      Branches.hasMany(models.Salerecords, {
        onDelete: "cascade",
      });
    };
  
    return Branches;
  };