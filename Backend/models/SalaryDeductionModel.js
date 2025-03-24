import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const salaryDeduction = db.define('salary_deductions',{
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        deduction: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        deduction_amt: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    },{freezeTableName: true
});

export default salaryDeduction;