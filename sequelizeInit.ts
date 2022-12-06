import { Sequelize, DataTypes } from "sequelize";
import fs from "fs";
import { t_course } from "./modules/collegeData";

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

let sequelize: Sequelize = new Sequelize(
	"postgres://lonlrkmn:V4NZJ2eFyp6YLmWDW-dTJ0Uf-8TBniT9@kashin.db.elephantsql.com/lonlrkmn",
	{
		dialect: "postgres",
		dialectOptions: {
			ssl: { rejectUnauthorized: false },
		},
		query: { raw: true },
		logging: true,
	}
);

let Student = sequelize.define("Student", {
	studentNum: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
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

let Course = sequelize.define("Course", {
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

let students: any = JSON.parse(fs.readFileSync("./data/students.json", { encoding: "utf8" }));
let courses: any = JSON.parse(fs.readFileSync("./data/courses.json", { encoding: "utf8" }));

sequelize.sync().then(() => {
	Student.bulkCreate(students).then(() => {
	});
});