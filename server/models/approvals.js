module.exports = (sequelize, DataTypes) => {
    const Approvals = sequelize.define("Approvals", {
      productname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
          type: DataTypes.STRING,
          allowNull: false,
      }
    });
  
  
    return Approvals;
  };