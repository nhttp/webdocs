import { BadRequestError, body, Handler, Router, wrapMiddleware } from "./deps.ts";
import { faunaQuery } from "./fauna.ts";
import { validation } from "./validation.ts";

const todos = new Router();

function allowCors(): Handler {
    return ({ response }, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', '*');
        response.header('Access-Control-Allow-Headers', '*');
        response.header('Access-Control-Allow-Credentials', 'true');
        
        next();
    }
}

const validator: Handler[] = [
    wrapMiddleware([
        body("task").isString(),
        body("author").isString()
    ]),
    validation
];
const validatorSign: Handler[] = [
    wrapMiddleware([
        body("email").isString(),
        body("password").isString()
    ]),
    validation
];

todos.get("/todo", allowCors(), async ({ response }) => {
    const query = `
        query {
            getTodos {
                data {
                    id
                    task
                    author
                }
            }
        }
    `;
    const data = await faunaQuery(query);
    return response.json(data);
});

todos.post("/todo", allowCors(), validator, async ({ response, body }) => {
    const query = `
        mutation($id: String!, $task: String!, $author: String!) {
            createTodo(data: { id: $id, task: $task, author: $author }) {
                _id
                id
                task
                author
            }
        }
    `;
    body.id = new Date().getTime().toString();
    const data = await faunaQuery(query, body);
    return response.json({
        message: "Success save todo",
        data
    });
});
todos.post("/todo-sign", allowCors(), validatorSign, async ({ response, body }) => {
    if (body.password !== "nhttp") {
        throw new BadRequestError("password must nhttp");
    }
    response.cookie("session", body.email, {
        encode: true,
        secure: true
    }).json({
        message: "Success login"
    });
});

export default todos;