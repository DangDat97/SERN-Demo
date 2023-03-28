import Express from "express";
import homeController from "../controllers/homeController"
let router = Express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomPage);
    router.get('/about', homeController.getAbout);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/update-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    //rest api
    // router.get('/about',(req,res) => {
    //     return res.send('About.')
    // })


    return app.use("/",router)
}

module.exports= initWebRoutes;