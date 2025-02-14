module.exports = (sequelize, DataTypes) => {
  const StudentsWorkshops = sequelize.define(
    'StudentsWorkshops',
    {
      studentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define como parte da chave primária
        references: {
          model: 'students',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      workshopID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define como parte da chave primária
        references: {
          model: 'workshops',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: 'students_workshops',
    }
  );

  return StudentsWorkshops;
};