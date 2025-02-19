"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_req_validation_1 = require("koa-req-validation");
const articles_1 = require("./routes/articles");
const app = new koa_1.default();
const router = new koa_router_1.default();
const films = [{ id: 1, name: "Indiana Jones" }, { id: 2, name: "Harry Potter" }];
const customErrorMessage = (_ctx, value) => {
    return (`The length must not less than 3 characters, now only ${value.length}`);
};
const validatorName = [
    (0, koa_req_validation_1.body)("name").isLength({ min: 3 }).withMessage(customErrorMessage).build(),
    (0, koa_req_validation_1.body)("id").isInt({ min: 10000, max: 20000 }).build()
];
router.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = { msg: 'Hello World' };
    yield next();
}));
router.post('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    ctx.body = data;
    yield next();
}));
router.get('/film', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = films;
    yield next();
}));
router.post('/film', ...validatorName, (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, koa_req_validation_1.validationResults)(ctx);
    if (result.hasErrors()) {
        ctx.status = 422;
        ctx.body = { err: result.mapped() };
    }
    else {
        const data = ctx.request.body;
        films.push(data);
        ctx.body = { "code": 200 };
    }
    yield next();
}));
router.put('/film', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    for (let i = 0; i < films.length; i++) {
        if (films[i].id == data.id) {
            films[i].name = data.name; //??
        }
        ctx.body = { "code": 200 };
    }
    yield next();
}));
app.use((0, koa_json_1.default)());
app.use((0, koa_logger_1.default)());
app.use((0, koa_bodyparser_1.default)());
app.use(router.routes()).use(router.allowedMethods());
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = { err: "No such endpoint" };
        }
    }
    catch (err) {
        ctx.body = { err: err };
    }
}));
app.listen(10888, () => {
    console.log('Koa Started');
});
app.use((0, koa_json_1.default)());
app.use((0, koa_logger_1.default)());
app.use(articles_1.router.routes());
app.listen(10888, () => {
    console.log('Koa Started');
});
