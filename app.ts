
const express = require("express")
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
const cors = require('cors');

const PORT = 5000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('client'));

const corsOptions = {origin: "*"};

app.use(cors(corsOptions));

app.use('/user', userRoutes);

app.use('/task', taskRoutes);

app.listen(PORT, () => console.log("started successfully on port", PORT));
