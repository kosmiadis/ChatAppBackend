import AppConfig from "./config/config";
import app from "./app";
import connectToDB from "./db/db";

(async function () {
    await connectToDB();
    app.listen(AppConfig.port, () => {
        console.log(`🚀 Server is running on http://localhost:${AppConfig.port}`);
    });
})();
