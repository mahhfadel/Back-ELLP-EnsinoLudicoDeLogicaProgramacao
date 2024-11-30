module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('teacher', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[0-9]+$/,
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Teacher.beforeCreate(async (teacher) => {
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(teacher.password, salt);
    });

    return Teacher;
}