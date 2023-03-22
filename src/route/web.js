import Express from "express";
import homeController from "../controllers/homeController"
let router = Express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomPage);
    router.get('/about', homeController.getAbout);
    //rest api
    // router.get('/about',(req,res) => {
    //     return res.send('About.')
    // })


    return app.use("/",router)
}

module.exports= initWebRoutes;