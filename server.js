"use strict";
/*********************************************************************************
 * WEB322 – Assignment 03
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: _Nguyen Duy_ Student ID: _126048214_ Date: _17th NOV 2022_
 *
 * Online (Cyclic) Link: __
 *
 ********************************************************************************/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data = __importStar(require("./modules/collegeData"));
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const client_sessions_1 = __importDefault(require("client-sessions"));
var HTTP_PORT = process.env.PORT || 8080;
var app = (0, express_1.default)();
app.use((0, client_sessions_1.default)({
    cookieName: "session",
    secret: "week10example_web322",
    duration: 2 * 60 * 1000,
    activeDuration: 1000 * 60, // the session will be extended by this many ms each request (1 minute)
}));
const user = {
    username: "sampleuser",
    password: "samplepassword",
};
const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login");
    }
    else {
        next();
    }
};
app.engine(".hbs", (0, express_handlebars_1.engine)({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
        navLink: function (url, options) {
            return ("<li" +
                (url == app.locals.activeRoute ? ' class="nav-item active" ' : ' class="nav-item" ') +
                '><a class="nav-link" href="' +
                url +
                '">' +
                options.fn(this) +
                "</a></li>");
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            }
            else {
                return options.fn(this);
            }
        },
    },
}));
app.set("view engine", ".hbs");
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = route == "/" ? "/" : route.replace(/\/$/, "");
    next();
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username == user.username && password == user.password) {
        req.session.user = {
            username: user.username,
            password: user.password,
        };
        res.redirect("/");
    }
});
app.get("/", isLoggedIn, (req, res) => {
    res.render("home");
});
app.get("/about", isLoggedIn, (req, res) => {
    res.render("about");
});
app.get("/htmlDemo", isLoggedIn, (req, res) => {
    res.render("htmlDemo");
});
app.get("/students", isLoggedIn, (req, res) => {
    if (req.query.course) {
        data.getStudentsByCourse(Number.parseInt(req.query.course.toString()))
            .then((data) => {
            if (data.length > 0)
                res.render("students", { students: data });
            else
                res.render("students", { message: "no results" });
        })
            .catch((err) => {
            res.render("students", { message: "no results" });
        });
    }
    else {
        data.getAllStudents()
            .then((data) => {
            if (data.length > 0)
                res.render("students", { students: data });
            else
                res.render("students", { message: "no results" });
        })
            .catch((err) => {
            res.render("students", { message: "no results" });
        });
    }
});
app.get("/students/add", isLoggedIn, (req, res) => {
    data.getCourses().then((data) => {
        res.render("addStudent", { courses: data });
    });
});
app.post("/students/add", isLoggedIn, (req, res) => {
    data.addStudent(req.body).then(() => {
        res.redirect("/students");
    }, (err) => {
        res.redirect("/students");
    });
});
app.get("/student/:studentNum", isLoggedIn, (req, res) => {
    data.getStudentByNum(Number.parseInt(req.params.studentNum)).then((data) => {
        res.render("student", { student: data });
    }, (err) => {
        res.send("Student Not Found");
    });
});
app.post("/student/update", isLoggedIn, (req, res) => {
    data.updateStudent(req.body).then(() => {
        res.redirect("/students");
    });
});
app.get("/student/delete/:studentNum", isLoggedIn, (req, res) => {
    data.deleteStudentByNum(Number.parseInt(req.params.studentNum)).then(() => {
        res.redirect("/students");
    });
});
app.get("/courses", isLoggedIn, (req, res) => {
    data.getCourses()
        .then((data) => {
        res.render("courses", { courses: data });
    })
        .catch((err) => {
        res.render("courses", { message: "no results" });
    });
});
app.get("/courses/add", isLoggedIn, (req, res) => {
    res.render("addCourse");
});
app.post("/courses/add", isLoggedIn, (req, res) => {
    data.addCourse(req.body).then(() => {
        res.redirect("/courses");
    }, (err) => {
        res.redirect("/courses");
        console.log(err);
    });
});
app.get("/course/:id", isLoggedIn, (req, res) => {
    data.getCourseById(Number.parseInt(req.params.id))
        .then((data) => {
        res.render("course", { course: data });
    })
        .catch((err) => {
        res.render("course", { message: "no results" });
    });
});
app.get("/course/update", isLoggedIn, (req, res) => {
    res.render("course", { course: data });
});
app.post("/course/update", isLoggedIn, (req, res) => {
    data.updateCourse(req.body).then(() => {
        res.redirect("/courses");
    }, (err) => {
        res.redirect("/courses");
        console.log(err);
    });
});
app.get("/course/delete/:id", isLoggedIn, (req, res) => {
    data.deleteCourseById(Number.parseInt(req.params.id)).then(() => {
        res.redirect("/courses");
    }, (err) => {
        res.redirect("/courses");
        console.log(err);
    });
});
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});
data.initialize()
    .then(function () {
    app.listen(HTTP_PORT, function () {
        console.log("app listening on: " + HTTP_PORT);
    });
})
    .catch(function (err) {
    console.log("unable to start server: " + err);
});
