import db from "../models/index";
import bcrypt, { compare } from 'bcryptjs';

let handleUserLogin = (email,password) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let userData= {};
            let isExist =  await checkUserEmail(email)
            if(isExist){

                let user = await db.User.findOne({
                    where:{ email: email},
                    attributes:['email', 'roleId','password'],
                    raw: true
                })
                if(user){
                    // compare password
                    let check = await bcrypt.compareSync(password,user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'Ok',
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = `User's or password not found`;
                    }
                }else{
                    userData.errCode = 2 ;
                    userData.errMessage =  `User's or password not found`;
                }
                
            }else{
                userData.errCode = 1 ;
                userData.errMessage =`Your's Email isn't exist in yout system. Plz try other email`;
               
            }
            
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}

let compareUserPassword = () =>{
    return new Promise((resolve,reject)=>{

    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve,reject)=>{
        try {
            let users = '';
            if(userId === 'ALL'){
                users = db.User.findAll({
                    attributes:{
                        exclude: ['password'],
                    }
                })
            }
            if(userId && userId !=='ALL'){
                users = await db.User.findOne({
                    where:{ id : userId},
                    attributes:{
                        exclude: ['password'],
                    }
                })
            }
            resolve(users)

        } catch (e) {
            reject(e);
        }
    })
}


let checkUserEmail = (email) => {
    return new Promise(async(resolve,reject) =>{
        try {
            let user = await db.User.findOne({where:{ email:email}})
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser:getAllUser,
}