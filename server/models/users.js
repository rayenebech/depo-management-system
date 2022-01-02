module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Users.associate = (models) => {
      Users.hasMany(models.Branches, {
        onDelete: "cascade",
      });

      Users.hasOne(models.Stores, {
        onDelete: "cascade",
      });
    };
  
    return Users;
  };