module.exports = (sequelize, DataTypes) => {
    const TeachersWorkshops = sequelize.define('teachers_workshops', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      teacherID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teachers',
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
    }, {
      timestamps: false,
    });
    return TeachersWorkshops;
  };  