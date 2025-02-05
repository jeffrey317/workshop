import Koa from 'koa';
import Router, {RouterContext} from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import { CustomErrorMessageFunction, query, body, validationResults } from "koa-req-validation";

const app: Koa = new Koa();
const router: Router = new Router();
const films = [{ id:1 ,name: "Alex"},{ id:2 ,name: "Fish"} ];
const valid =[
  body("name").isLength({min: 3}).withMessage(customErroeMessage).build(),
  body("id").isInt{(min:100000 , max: 20000)}.build()
]
const customErroeMessage: customErroeMessage=(
  _ctx: RouterContext, value: string)=>{}


router.get('/', async (ctx: RouterContext, next: any) => {
  ctx.body = { msg: 'Hello world!' };
 await next();
});

router.post('/', async (ctx: RouterContext, next: any) => {
    const data = ctx.request.body;
    ctx.body = data;
    await next();
})
router.get('/film', async (ctx: RouterContext, next: any) => {
  ctx.body = films;
  await next();
});

router.post('/film', async (ctx: RouterContext, next: any) => {
  const data: any = ctx.request.body;
  films.push(data);
  await next();
});

router.put('/film', async (ctx: RouterContext, next: any) => {
  const data: any = ctx.request.body;
  films.push(data);
  await next();
});

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(10888, () => {
  console.log('Koa Started');
})