import userService from "../services/userService"

let handleLogin = async(req,res) =>{
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: ' Missing inputs parameter !'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}

let handleGetAllUser = async(req,res) =>{
    let id = req.query.id;
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'MISSSING REQIRED PARAMETERS',
            user:[]
        })
    }
    let user = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        user
    })
    
}
 let handleCreateNewUser = async (req,res) =>{
    let message = await userService.creteNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
 }

 
 let handleEditUser = async (req,res) => {
    if(!req.body){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.updateUser(req.body);
    return res.status(200).json(message);
 }
 
 let handleDeleteUser = async (req,res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
 }


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser:handleGetAllUser,
    handleCreateNewUser:handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser
}