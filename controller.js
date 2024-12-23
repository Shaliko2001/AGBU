const Model = require('./model');
class Controller {
    static async insertData(req, res, next) {
        try {
            const data = req.body;
            await Model.insertData(data);
            res.send('data inserted');

        } catch (error){
            console.error(error);
            next(error);
        }
    }

    static async getData(req, res, next) {
        try {
            const result = await Model.getData();
            res.send(result);

        } catch (error){
            console.error(error);
            next(error);
        }
    }
    static async updateData(req, res, next) {
        try {
            const {id,update }= req.body;
            const result = await Model.updateData(id, update);
            res.send('data updated');

        } catch (error){
            console.error(error);
            next(error);
        }
    }

   /*  static async updateData(req, res, next) {
        try {
            const data = req.body;
            await Model.updateData(data);
            res.send('data updated');

        } catch (error){
            console.error(error);
            next(error);
        }
    }

    static async deleteData(req, res, next) {
        try {
            await Model.deleteData();
            res.send('data deleted');

        } catch (error){
            console.error(error);
            next(error);
        }
    } */
}

module.exports = Controller;