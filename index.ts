

const express = require("express")
import userRoutes from "./routes/user.routes";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/user', userRoutes);

app.listen(PORT, () => console.log("started successfully on port", PORT));
