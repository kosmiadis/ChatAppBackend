import AppConfig from "./config/config";
import app from "./app";

app.listen(AppConfig.port, () => {
    console.log('running on http://localhost:',AppConfig.port);
})