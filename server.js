"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const express_handlebars_1 = require("express-handlebars");
var HTTP_PORT = process.env.PORT || 8080;
var app = (0, express_1.default)();
const handlebars = require("express-handlebars");
app.use(express_1.default.static("public"));
app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine("handlebars", (0, express_handlebars_1.engine)({
    layoutsDir: __dirname + "/views/layouts",
}));
app.get("/", (req, res) => {
    res.render("./partials/home", {
        layout: "layout",
        css: "css/generic.css",
        cssAdded: "css/store.css",
        links: [
            {
                text: "Home",
                href: "/",
            },
            {
                text: "Store",
                href: "/storefront",
            },
        ],
        cinnamonImg: "https://img3.goodfon.com/wallpaper/nbig/9/55/eda-korica-shishki-elka-napitok.jpg"
    });
});
app.get("/storefront", (req, res) => {
    let file = fs_1.default.readFileSync(__dirname + "/src/int/gameList.json");
    let data = JSON.parse(file.toString());
    res.render("./partials/store", {
        layout: "layout",
        css: "css/generic.css",
        links: [
            {
                text: "Home",
                href: "/",
            },
            {
                text: "Store",
                href: "/storefront",
            },
        ],
        items: data,
    });
});
app.listen(HTTP_PORT, () => {
    console.log(`Server listening on port ${HTTP_PORT}`);
});
