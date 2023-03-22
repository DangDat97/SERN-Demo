
let getHomPage = (req,res) =>{
    return res.render("homepage.ejs");
}
let getAbout = (req,res) =>{
    return res.render("about.ejs");
}

module.exports = {
    getHomPage:getHomPage,
    getAbout:getAbout,
}