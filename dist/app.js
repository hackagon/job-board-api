"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// middleware (req, res, next)
app.get("/", (req, res) => {
    res.send("<p style='color:red'>Hello World</p>");
});
app.use('/api', user_route_1.default);
const port = process.env.PORT || 4000;
app.listen({ port }, () => {
    mongoose_1.default.connect("mongodb://localhost:27017/job_board", {
        autoIndex: true,
    })
        .then(() => {
        console.log('App is running:');
        console.table({
            port,
            dbType: "mongodb",
            dbHost: "localhost"
        });
    })
        .catch(console.log);
});
//# sourceMappingURL=app.js.map