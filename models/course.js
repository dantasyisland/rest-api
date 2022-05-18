const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Please enter a title for your course`,
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a course description",
          },
        },
      },
      estimatedTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter an estimated time",
          },
        },
      },
      materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Please enter the materials needed`,
          },
        },
      },
      // *** USERID CREATED IN MODEL ASSOCIATIONS WITH THE FOREIGNKEY PROPERTY
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return Course;
};
