const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    // apiId: {
    //   type: DataTypes.STRING,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    platform: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
    },
    released: {
      type: DataTypes.DATEONLY,
    },
    img: {
      type: DataTypes.STRING,
    },
    gId: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
    }
  });
};
