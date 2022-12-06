/*********************************************************************************
 * WEB322 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: _Nguyen Duy_ Student ID: _126048214_ Date: _17th NOV 2022_
 *
 ********************************************************************************/

import fs from "fs";
import { Sequelize, Model, DataTypes } from "sequelize";

export type t_student = {
	studentNum: Number;
	firstName: String;
	lastName: String;
	email: String;
	addressStreet: String;
	addressCity: String;
	addressProvince: String;
	TA: Boolean;
	status: String;
	course: Number;
};

export type t_course = {
	courseId: Number;
	courseCode: String;
	courseDescription: String;
};

export class Data {
	students: t_student[] = [];
	courses: t_course[] = [];

	constructor(students: t_student[], courses: t_course[]) {
		this.students = students;
		this.courses = courses;
	}
}

var sequelize: Sequelize = new Sequelize(
	"postgres://lonlrkmn:V4NZJ2eFyp6YLmWDW-dTJ0Uf-8TBniT9@kashin.db.elephantsql.com/lonlrkmn",
	{
		dialect: "postgres",
		dialectOptions: {
			ssl: { rejectUnauthorized: false },
		},
		query: { raw: true },
	}
);

var Student = sequelize.define("Student", {
	studentNum: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		allowNull: false,
		defaultValue: null
	},
	firstName: {
		type: DataTypes.STRING,
	},
	lastName: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
	addressStreet: {
		type: DataTypes.STRING,
	},
	addressCity: {
		type: DataTypes.STRING,
	},
	addressProvince: {
		type: DataTypes.STRING,
	},
	TA: {
		type: DataTypes.BOOLEAN,
	},
	status: {
		type: DataTypes.STRING,
	},
});

var Course = sequelize.define("Course", {
	courseId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	courseCode: {
		type: DataTypes.STRING,
	},
	courseDescription: {
		type: DataTypes.STRING,
	},
});

Course.hasMany(Student, { foreignKey: "course" });

export function initialize(): Promise<boolean> {
	return new Promise((resolve, reject) => {
		sequelize.sync().then(
			(res) => {
				resolve(true);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function getAllStudents(): Promise<t_student[]> {
	return new Promise((resolve, reject) => {
		sequelize.sync().then(() => 
		Student.findAll({ raw: true}).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		)
		)
	});
}

export function getCourses(): Promise<t_course[]> {
	return new Promise((resolve, reject) => {
		Course.findAll({ raw: true}).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function getStudentByNum(num: Number): Promise<t_student> {
	return new Promise((resolve, reject) => {
		Student.findOne({ raw: true, where: { studentNum: num } }).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function getStudentsByCourse(course: Number): Promise<t_student[]> {
	return new Promise((resolve, reject) => {
		Student.findAll({ raw: true, where: { course: course } }).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function getCourseById(id: Number): Promise<t_course> {
	return new Promise((resolve, reject) => {
		Course.findOne({ raw: true, nest: true, where: { courseId: id } }).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function addStudent(studentData: any): Promise<void> {
	return new Promise((resolve, reject) => {
		for (const prop in studentData) {
			if (studentData[prop] == "" || !studentData[prop]) studentData[prop] = null;
		}
		
		studentData.studentNum = null;
		studentData.TA = studentData.TA ? true : false;
		let trans: t_student = studentData;

		Student.bulkCreate([trans]).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function updateStudent(studentData: any): Promise<void> {
	return new Promise((resolve, reject) => {
		
		for (const prop in studentData) {
			if (studentData[prop] == "") studentData[prop] = null;
		}

		studentData.TA = studentData.TA ? true : false;
		console.log(studentData.studentNum);

		Student.update(studentData, { where: { studentNum: studentData.studentNum } }).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function deleteStudentByNum(studentNum: Number): Promise<void> {
	return new Promise((resolve, reject) => {
		Student.destroy({ where: { studentNum: studentNum } }).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function addCourse(courseData: any): Promise<void> {
	return new Promise((resolve, reject) => {
		for (const prop in courseData) {
			if (courseData[prop] == "") courseData[prop] = null;
		}

		courseData.courseId = null;
		Course.create(courseData).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function updateCourse(courseData: any): Promise<void> {
	return new Promise((resolve, reject) => {
		for (const prop in courseData) {
			if (courseData[prop] == "") courseData[prop] = null;
		}
		
		Course.update(courseData, { where: { courseId: courseData.courseId } }).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

export function deleteCourseById(id: any): Promise<void> {
	return new Promise((resolve, reject) => {
		Course.destroy({ where: { courseId: id } }).then(
			(res: any) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}
