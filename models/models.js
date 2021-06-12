const sequelize = require('../db')
const DataTypes = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Task = sequelize.define('task', {
    id_task: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_task: {type: DataTypes.STRING, unique: true, allowNull: false},
    text_task: {type: DataTypes.STRING},
    date_of_issue: {type: DataTypes.DATE, allowNull: false},
    start_date: {type: DataTypes.DATE},
    end_of_execution_date: {type: DataTypes.DATE},
    date_of_completion: {type: DataTypes.DATE},
    deadline: {type: DataTypes.DATE, allowNull: false},
})

const Employee = sequelize.define('employee', {
    id_employee: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    full_name: {type: DataTypes.STRING, allowNull: false},
})

const Report = sequelize.define('report', {
    id_report: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text_report: {type: DataTypes.STRING, allowNull: false},
    creation_date: {type: DataTypes.DATE, allowNull: false},
})

const Position = sequelize.define('position', {
    id_position: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_position: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Report_type = sequelize.define('report_type', {
    id_report_type: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_report_type: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Department = sequelize.define('department', {
    id_department: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_department: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Status = sequelize.define('status', {
    id_status: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_status: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Project = sequelize.define('project', {
    id_project: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_project: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Tuples = sequelize.define('tuples', {
    query_name: {type: DataTypes.STRING,  allowNull: false, primaryKey: true} ,
    desc_query: {type: DataTypes.STRING,  allowNull: false},
    table_var: {type: DataTypes.STRING,  allowNull: false},
    goal_list: {type: DataTypes.STRING,  allowNull: false},
    query_body: {type: DataTypes.STRING,  allowNull: false},
    nom_query: {type: DataTypes.STRING,  allowNull: false},
    nom_qr: {type: DataTypes.STRING, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    userId: {type: DataTypes.STRING,  allowNull: false},
})

const Alg = sequelize.define('alg', {
    query_name: {type: DataTypes.STRING, primaryKey: true},
    desc_query: {type: DataTypes.STRING,  allowNull: false},
    table_var: {type: DataTypes.STRING,  allowNull: false},
    goal_list: {type: DataTypes.STRING,  allowNull: false},
    query_body: {type: DataTypes.STRING,  allowNull: false},
    nom_query: {type: DataTypes.STRING,  allowNull: false},
    nom_qr: {type: DataTypes.STRING, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    userId: {type: DataTypes.STRING,  allowNull: false},
})

User.hasMany(Alg)
Alg.belongsTo(User)

User.hasMany(Tuples)
Tuples.belongsTo(User)

Position.hasMany(Employee)
Employee.belongsTo(Position)

Department.hasMany(Employee)
Employee.belongsTo(Department)

Employee.hasMany(Report)
Report.belongsTo(Employee)

Report_type.hasMany(Report)
Report.belongsTo(Report_type)

Report_type.hasOne(Report)
Report.belongsTo(Task)

Employee.hasMany(Task)
Task.belongsTo(Employee)

Status.hasMany(Task)
Task.belongsTo(Status)

Project.hasMany(Task)
Task.belongsTo(Project)

module.exports = {
    User,
    Task,
    Employee,
    Report,
    Position,
    Report_type,
    Department,
    Status,
    Project,
    Tuples,
    Alg
}