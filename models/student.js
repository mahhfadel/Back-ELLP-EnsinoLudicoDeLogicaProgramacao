module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', { // 'Student' com letra maiúscula para seguir o padrão de nomeação
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
                is: /^[0-9]+$/ // Somente números no telefone
            }
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    }, {
        tableName: 'students', // Nome da tabela no banco de dados
        timestamps: false // Remove `createdAt` e `updatedAt` se não forem necessários
    });

    return Student;
};