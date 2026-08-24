import express, { Application } from "express";
import { fileURLToPath } from "url";
import path from "path";
import indexRoute from "./routes/index.js";

const app: Application = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//view engine
app.set('view engine', 'ejs')

//body parser
app.use(express.urlencoded({extended: false}))

//css
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRoute);

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server running on port, ${PORT}`))
