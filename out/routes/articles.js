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
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const router = new koa_router_1.default({ prefix: '/api/v1/articles' });
exports.router = router;
const articles = [
    { title: 'hello article', fullText: 'some text Headers.' },
    { title: 'another article', fullText: 'another text ' },
    { title: 'coventry university ', fullText: 'some news about coventry university' },
    { title: 'smart campus', fullText: 'smart campus is coming to IVE' }
];
const getAll = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = articles;
    yield next();
});
const getById = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the route parameters.
    let id = +ctx.params.id;
    // If it exists then return the article as JSON.
    // Otherwise return a 404 Not Found status code
    if ((id < articles.length + 1) && (id > 0)) {
        ctx.body = articles[id - 1];
    }
    else {
        ctx.status = 404;
    }
    yield next();
});
const createArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    // The body parser gives us access to the request body on
    ctx.request.body;
    // Use this to extract the title and fullText we were sent.
    let articles = ctx.request.body;
    // In turn, define a new article for addition to the array.
    let newArticle = { title: articles, fullText: articles.fullText };
    articles.push(newArticle);
    // Finally send back appropriate JSON and status code.
    // Once we move to a DB store, the newArticle sent back will now have its ID.
    ctx.status = 201;
    ctx.body = newArticle;
    yield next();
});
const updateArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: edit an article
});
const deleteArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    //
    yield next();
});
router.get('/', getAll);
router.post('/', (0, koa_bodyparser_1.default)(), createArticle);
router.get('/:id', getById);
