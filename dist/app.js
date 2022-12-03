"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_middleware_1 = require("./middlewares/passport.middleware");
// routers
const user_route_1 = __importDefault(require("./routes/user.route"));
const verification_route_1 = __importDefault(require("./routes/verification.route"));
const me_route_1 = __importDefault(require("./routes/me.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, passport_middleware_1.applyPassport)(passport_1.default);
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport_1.default.initialize());
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
// middleware (req, res, next)
app.get("/", (req, res) => {
    res.send("<p style='color:red'>Hello World</p>");
});
app.use('/api', user_route_1.default);
app.use('/api', verification_route_1.default);
app.use('/api', me_route_1.default);
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