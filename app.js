var express = require("express"),
    app     = express();

app.set("view engine", "ejs");
app.use("/stylesheets",express.static(__dirname + "/stylesheets"));
app.use("/javascript",express.static(__dirname + "/javascript"));
app.use("/images",express.static(__dirname + "/images"));

app.get("/", function(req, res){
	res.render("home");
});

app.listen(process.env.PORT || 3007, function(){
	console.log("server has started....");
});