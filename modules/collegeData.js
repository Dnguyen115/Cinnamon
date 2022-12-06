"use strict";
/*********************************************************************************
 * WEB322 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: _Nguyen Duy_ Student ID: _126048214_ Date: _17th NOV 2022_
 *
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseById = exports.updateCourse = exports.addCourse = exports.deleteStudentByNum = exports.updateStudent = exports.addStudent = exports.getCourseById = exports.getStudentsByCourse = exports.getStudentByNum = exports.getCourses = exports.getAllStudents = exports.initialize = exports.Data = void 0;
const sequelize_1 = require("sequelize");
class Data {
    constructor(students, courses) {
        this.students = [];
        this.courses = [];
        this.students = students;
        this.courses = courses;
    }
}
exports.Data = Data;
var sequelize = new sequelize_1.Sequelize("postgres://lonlrkmn:V4NZJ2eFyp6YLmWDW-dTJ0Uf-8TBniT9@kashin.db.elephantsql.com/lonlrkmn", {
    dialect: "postgres",
    dialectOptions: {
        ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
});
var Student = sequelize.define("Student", {
    studentNum: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        defaultValue: null
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
var Course = sequelize.define("Course", {
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
function initialize() {
    return new Promise((resolve, reject) => {
        sequelize.sync().then((res) => {
            resolve(true);
        }, (err) => {
            reject(err);
        });
    });
}
exports.initialize = initialize;
function getAllStudents() {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => Student.findAll({ raw: true }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        }));
    });
}
exports.getAllStudents = getAllStudents;
function getCourses() {
    return new Promise((resolve, reject) => {
        Course.findAll({ raw: true }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.getCourses = getCourses;
function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        Student.findOne({ raw: true, where: { studentNum: num } }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.getStudentByNum = getStudentByNum;
function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        Student.findAll({ raw: true, where: { course: course } }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.getStudentsByCourse = getStudentsByCourse;
function getCourseById(id) {
    return new Promise((resolve, reject) => {
        Course.findOne({ raw: true, nest: true, where: { courseId: id } }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.getCourseById = getCourseById;
function addStudent(studentData) {
    return new Promise((resolve, reject) => {
        for (const prop in studentData) {
            if (studentData[prop] == "" || !studentData[prop])
                studentData[prop] = null;
        }
        studentData.studentNum = null;
        studentData.TA = studentData.TA ? true : false;
        let trans = studentData;
        Student.bulkCreate([trans]).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.addStudent = addStudent;
function updateStudent(studentData) {
    return new Promise((resolve, reject) => {
        for (const prop in studentData) {
            if (studentData[prop] == "")
                studentData[prop] = null;
        }
        studentData.TA = studentData.TA ? true : false;
        console.log(studentData.studentNum);
        Student.update(studentData, { where: { studentNum: studentData.studentNum } }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.updateStudent = updateStudent;
function deleteStudentByNum(studentNum) {
    return new Promise((resolve, reject) => {
        Student.destroy({ where: { studentNum: studentNum } }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.deleteStudentByNum = deleteStudentByNum;
function addCourse(courseData) {
    return new Promise((resolve, reject) => {
        for (const prop in courseData) {
            if (courseData[prop] == "")
                courseData[prop] = null;
        }
        courseData.courseId = null;
        Course.create(courseData).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.addCourse = addCourse;
function updateCourse(courseData) {
    return new Promise((resolve, reject) => {
        for (const prop in courseData) {
            if (courseData[prop] == "")
                courseData[prop] = null;
        }
        Course.update(courseData, { where: { courseId: courseData.courseId } }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.updateCourse = updateCourse;
function deleteCourseById(id) {
    return new Promise((resolve, reject) => {
        Course.destroy({ where: { courseId: id } }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
}
exports.deleteCourseById = deleteCourseById;
