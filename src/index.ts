import dotenv from "dotenv";
import app from "./app";
import './database/database';


dotenv.config();


function main() {
    app.listen(app.get('port'));
    console.log('Server on port:', app.get('port'));
}

main();

