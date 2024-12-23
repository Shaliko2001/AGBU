const {connectMongo,disconnectMongo}= require('./config.mongo');
const mongoModel = require('./mongo.schema');
connectMongo();

class Model {

    static async insertData(data){
        try {
            await connectMongo();
            await mongoModel.insertMany(data);
            
        } catch (error){
            console.error(error);
        }finally  {
            await disconnectMongo();
        }
    }

    static async getData(data){
        try {
            // await mongo.connectMongo();
            const result = await mongoModel.find({age: {$gt :23}});
            console.log(result);

            // await mongo.disconnectMongo();
            return result;
        } catch (error){
            console.error(error);
        }
    }
    static async updateData(id, update){
        try {
            await connectMongo();
            const result = await mongoModel.findByIdAndUpdate(
                id,
                update
            );
            console.log(result);
            
        } catch (error){
            console.error(error);
        }
    }

   /*  static async updateData(data){
        try {
            await mongo.connect();
            for (let i = 0; i < data.length; i++){
                await mongoModel.updateMany({}, data[i], {upsert: true});
            }
        } catch (error){
            console.error(error);
        }
    }

    static async deleteData(){
        try {
            await mongo.connect();
            await mongoModel.deleteMany({});
        } catch (error){
            console.error(error);
        }
    } */
}
module.exports = Model;