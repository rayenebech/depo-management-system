const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require('./models');

const PORT = process.env.PORT || 3001;

// Routers
/*
const xRouter = require("./routes/xRoute");
app.use("/", postRouter);
const yRouter = require("./routes/yRoute");
app.use("/", yRouter);
const zRouter = require("./routes/zRoute");
app.use("/", zRouter);
const fRouter = require("./routes/fRoute");
app.use("/", fRouter); */
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const branchesRouter = require("./routes/Branches");
app.use("/branches", branchesRouter);
const productsRouter = require("./routes/Products");
app.use("/products", productsRouter);
const storesRouter = require("./routes/Stores");
app.use("/store", storesRouter);
const approvalsRouter = require("./routes/Approvals");
app.use("/approvals", approvalsRouter);
const saleRecordsRouter = require("./routes/Salerecords");
app.use("/Salerecords", saleRecordsRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Running on ${PORT}`);
    });
});
