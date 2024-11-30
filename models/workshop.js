module.exports = (sequelize, DataTypes) => {
    const Workshop = sequelize.define('workshop', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
        imageUri: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });

    return Workshop;
}