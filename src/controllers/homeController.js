import db from '../models/index';
let getHomPage = async (req,res) =>{
    try {
        let data = await db.User.findAll();
    return res.render("homepage.ejs", {
        data: JSON.stringify(data)
    });

    } catch (e) {
        console.log(e)
    }

}
let getAbout = (req,res) =>{
    return res.render("about.ejs");
}

module.exports = {
    getHomPage:getHomPage,
    getAbout:getAbout,
}