import AppConfig from "./config/config";
import { httpServer } from "./app";
import connectToDB from "./db/db";

(async function () {
    await connectToDB();
    httpServer.listen(AppConfig.port, () => {
        console.log(`🚀 Server is running on http://localhost:${AppConfig.port}`);
    });
})();
