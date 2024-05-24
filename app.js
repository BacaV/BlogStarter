const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque incidunt iusto nam sint voluptatum. Excepturi sint assumenda nobis libero dolorem architecto eligendi porro sed! Sequi reprehenderit rem eum quaerat porro.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque incidunt iusto nam sint voluptatum. Excepturi sint assumenda nobis libero dolorem architecto eligendi porro sed! Sequi reprehenderit rem eum quaerat porro.";
const contactContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque incidunt iusto nam sint voluptatum. Excepturi sint assumenda nobis libero dolorem architecto eligendi porro sed! Sequi reprehenderit rem eum quaerat porro.";
let posts = [];

app.get("/", function(req, res){

    res.render("home", {homeParagraph: homeStartingContent, postLog : posts});

});

app.get("/about", function(req, res){
    res.render("about", {aboutParagraph: aboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {contactParagraph: contactContent});
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){

    let post = {
        postTitle: req.body.title,
        postContent: req.body.content,
        postURL: _.kebabCase(_.lowerCase(req.body.title))
    }

    posts.push(post);
    res.redirect("/");
})

app.get('/post/:title', function (req, res){

    for(let i = 0; i < posts.length; i++){
        let requestedTitle = _.kebabCase(_.lowerCase(posts[i].postTitle));
        let typedTitle = req.params.title;
        if(requestedTitle == typedTitle){

            console.log("Match found!");
            res.render("post", {newTitle: posts[i].postTitle, newContent : posts[i].postContent})
        }else{
            console.log(requestedTitle, typedTitle);
        }
    }
  })

app.listen(3000, function(){
    console.log("Server started. Ne gledaj hintove resi sam!");
})
