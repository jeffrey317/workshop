import Router,{RouterContext} from 'koa-router';
import bodyParser from 'koa-bodyparser';

const router = new Router({prefix: '/api/v1/articles'});
const articles = [
    {title: 'hello article', fullText: 'some text Headers.'},
    {title: 'another article', fullText: 'another text '},
    {title:'coventry university ', fullText:'some news about coventry university'},
    {title:'smart campus', fullText:'smart campus is coming to IVE'}
];

const getAll = async(ctx:RouterContext, next: any) =>{
    ctx.body = articles;
    await next()
    }

const getById = async (ctx: RouterContext, next: any) => {
    // Get the ID from the route parameters.
    let id = +ctx.params.id
    // If it exists then return the article as JSON.
    // Otherwise return a 404 Not Found status code
    if ((id < articles.length+1) && (id > 0)) {
    ctx.body = articles[id-1];
    } else {
    ctx.status = 404;
    }
    await next();
   }

   const createArticle = async (ctx: RouterContext, next: any) => {
    // The body parser gives us access to the request body on
    ctx.request.body;
    // Use this to extract the title and fullText we were sent.
    let articles: any = ctx.request.body;
    // In turn, define a new article for addition to the array.
    let newArticle = {title:articles, fullText:articles.fullText};
    articles.push(newArticle);
    // Finally send back appropriate JSON and status code.
    // Once we move to a DB store, the newArticle sent back will now have its ID.
    ctx.status = 201;
    ctx.body = newArticle;
    await next();
   }

   const updateArticle = async (ctx: RouterContext, next: any) => {
    //TODO: edit an article
   } 
const deleteArticle = async(ctx:RouterContext, next: any) =>{
//
await next();

}

router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id', getById);

export{router};
