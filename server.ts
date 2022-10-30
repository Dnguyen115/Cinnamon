import express, { Express, NextFunction } from "express";
import fs from "fs";
import path, { resolve } from "path";
import { engine } from "express-handlebars";

var HTTP_PORT = process.env.PORT || 8080;
var app = express();
const handlebars = require("express-handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine(
	"handlebars",
	engine({
		layoutsDir: __dirname + "/views/layouts",
	})
);

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
	let file = fs.readFileSync(__dirname + "/src/int/gameList.json");
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
		linker: "#"
	});
});

app.listen(HTTP_PORT, () => {
	console.log(`Server listening on port ${HTTP_PORT}`);
});
