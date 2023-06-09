import db from '../models/index';
import CRUDService from "../services/CRUDServices";
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

let getCRUD = (req,res) =>{
    return res.render("crud.ejs");
}
let postCRUD = async (req,res) =>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(req.body);
    console.log(message);
    return res.send('post CRUD form server');
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-----------------');
    console.log(data);
    console.log('-----------------');
    return res.render('displayCRUD.ejs',{
        dataTable:data,
    });
}

let getEditCRUD = async (req,res) =>{
    let Userid = req.query.id;
    if (Userid) {
        let UserData = await CRUDService.getUserInfoById(Userid);
        console.log(UserData);
        return res.render('editCRUD.ejs',{
            data: UserData,
        });
    } else {
        return res.send('User not Found !');
    }
    
    
}

let putCRUD = async (req,res) =>{
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);

    return res.render('displayCRUD.ejs',{
        dataTable: allUsers,
        });
}

let deleteCRUD = async (req, res) => {
    let idUser = req.query.id;
    console.log(idUser);
    if (idUser) {
        await CRUDService.deleteUserData(idUser);
        return res.send('delete Sucsssess');
    } else {
        return res.send('User not Found !');
    }
}

module.exports = {
    getHomPage:getHomPage,
    getAbout:getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD: deleteCRUD,
}