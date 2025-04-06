import AppConfig from "../config/config";

import mongoose from "mongoose";

export default async function connectToDB () {
    await mongoose.connect(AppConfig.mongodb_uri)
    .catch(e => console.log(e.message))
}