const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { config } = require("./src/configs/server.config");
const { corsOptions } = require("./src/configs/cors.config");
const { route: userRoute } = require("./src/routes/users.routes");
const { route: todoRoute } = require("./src/routes/todo.routes");
// const { dbConnection } = require("./src/dbConnection/connection");
const { route: cronRoute } = require("./src/routes/cronJobs.routes");
const job1 = require("./src/cronjobs/job1");
const job2 = require("./src/cronjobs/job2");
const { ExpressAdapter } = require("@bull-board/express");
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter.js');
const emailQueue = require("./src/queues/email.queue");
const connectDatabase = require("./src/dbConnection/connection");
const app = express();
const PORT = config.appPort;

(async () => {
    try {
        connectDatabase();
        // await dbConnection();
        job1.stop();
        job2.stop();
        app.use(cors(corsOptions))
        app.use(express.json()); //accept json in body  
        app.use(cookieParser());

        const serverAdapter = new ExpressAdapter();
        serverAdapter.setBasePath('/ui');

        createBullBoard({
            queues: [new BullAdapter(emailQueue)],
            serverAdapter,
        });

        app.use('/ui', serverAdapter.getRouter());

        app.get("/", (req, res) => {
            return res.status(200).send("Home")
        })
        app.use("/cron", cronRoute)
        app.use("/user", userRoute)
        app.use("/todo", todoRoute)
        app.get("*", (req, res) => {
            return res.status(404).send("Invalid route")
        })
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}`);
        })
    } catch (error) {
        console.error('Error', error)
    }
})()
