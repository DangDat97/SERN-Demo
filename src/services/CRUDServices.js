import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt= bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve,reject) =>{
        try {
            let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: data.hashUserPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : flase,
                roleId: data.roleId,
            });
            resolve('ok create a new usrer');

        } catch (e) {
            reject(e);
        }
    })
    // let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
    // console.log('data from service');
    // console.log(data);
    // console.log(hashUserPasswordFromBcrypt);
}

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

let getAllUser = () =>{
    return new Promise(async(resolve,reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (Userid) =>  {
    return new Promise(async(resolve,reject) => {
        try {
            let users = await db.User.findOne({ 
                where: { id: Userid } ,
                raw: true,
            });

            if (users) {
                resolve(users)
            } else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
} 

let updateUserData = (data) => {
    return new Promise(async(resolve,reject) =>{
        try {
            let user = await db.User.findOne({
                where: { id:data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.password = data.password;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }
        } catch (e) {
            reject(e)
        }
    })
    console.log('data from service')
    console.log(data)
}

let deleteUserData = (idUser) => {
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where:{id: idUser}
            })
            if(user){
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser:createNewUser,
    hashUserPassword:hashUserPassword,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
}