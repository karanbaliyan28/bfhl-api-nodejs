const express=require("express");
const helmet=require("helmet");
const cors=require("cors");
const morgan=require("morgan");
const logger = require("./utils/logger");

const bfhl=require("./routes/bfhl.routes");
const health=require("./routes/health.routes");
const errorHandler=require("./middleware/errorHandler");
const rateLimiter=require("./middleware/rateLimiter");

const app=express();

app.use(morgan("combined", { stream: logger.accessLogStream }));

app.use(helmet());
app.use(cors());
app.use(express.json({limit:"10kb"}));
app.use(rateLimiter);

app.use("/api/v1",bfhl);
app.use("/api/v1",health);

app.use(errorHandler);

module.exports=app;
