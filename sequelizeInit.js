"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
let sequelize = new sequelize_1.Sequelize("postgres://lonlrkmn:V4NZJ2eFyp6YLmWDW-dTJ0Uf-8TBniT9@kashin.db.elephantsql.com/lonlrkmn", {
    dialect: "postgres",
    dialectOptions: {
        ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
    logging: true,
});
let Student = sequelize.define("Student", {
    studentNum: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    addressStreet: {
        type: sequelize_1.DataTypes.STRING,
    },
    addressCity: {
        type: sequelize_1.DataTypes.STRING,
    },
    addressProvince: {
        type: sequelize_1.DataTypes.STRING,
    },
    TA: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
});
let Course = sequelize.define("Course", {
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    courseCode: {
        type: sequelize_1.DataTypes.STRING,
    },
    courseDescription: {
        type: sequelize_1.DataTypes.STRING,
    },
});
Course.hasMany(Student, { foreignKey: "course" });
let students = JSON.parse(fs_1.default.readFileSync("./data/students.json", { encoding: "utf8" }));
let courses = JSON.parse(fs_1.default.readFileSync("./data/courses.json", { encoding: "utf8" }));
sequelize.sync().then(() => {
    Student.bulkCreate(students).then(() => {
    });
});
