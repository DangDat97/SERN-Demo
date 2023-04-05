import db from "../models/index";
import bcrypt, { compare } from 'bcryptjs';

const salt= bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve,reject)=>{
        try {
            var hash= await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
        
    })
}



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

let creteNewUser = (data) =>{
    return new Promise( async(resolve,reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used, Plz Try another email'
                })
            }else{
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                });
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (id) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where:{id: id}
            })
            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't xist`
                });
                
            }else{
                await db.User.destroy({
                    where: { id:id}
                });
                resolve({
                    errCode: 0,
                    errMessage: `The user is deleted`
                });
            }
            
        } catch (e) {
            reject(e)
        }
    })
}


let updateUser = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage: 'Missing requaied'
                })
            }
            let user = await db.User.findOne({
                where: { id:data.id},
                raw: false
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: `Update Successdd`
                });
            }else{
                resolve({
                    errCode: 1,
                    errMessage: `User does not exist`
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser:getAllUser,
    creteNewUser: creteNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
}