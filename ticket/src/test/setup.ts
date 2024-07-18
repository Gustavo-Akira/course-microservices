import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose, { connection } from "mongoose";
import jwt from "jsonwebtoken";
let mongo: any;

beforeAll(async ()=> {
    process.env.JWT_KEY="secret_keydsfs";
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);

});

beforeEach(async ()=>{
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async ()=>{
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
})

declare global {
    var signin: () => string[];
}

global.signin = () =>{
   const payload = {
    id:"1lk24j124l",
    email: "test@test.com"
   };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = {jwt: token};

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`express:sess=${base64}`];
}