const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `"First Name" is required`,
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `"Last Name" is required`,
          },
        },
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          msg: "Please provide a valid email address",
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `"Password" is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // Association to course model
  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };
  return User;
};
