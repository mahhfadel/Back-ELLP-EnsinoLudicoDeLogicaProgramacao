module.exports = (sequelize, DataTypes) => {
    const StudentsWorkshops = sequelize.define('students_workshops', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      studentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      workshopID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'workshops',
          key: 'id',
        },
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      timestamps: false,
    });
    return StudentsWorkshops;
  };  