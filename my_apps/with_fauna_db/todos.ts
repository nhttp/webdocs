import { body, Handler, Router, wrapMiddleware } from "./deps.ts";
import { faunaQuery } from "./fauna.ts";
import { validation } from "./validation.ts";

const todos = new Router();

const validator: Handler[] = [
    // wrapMiddleware([
    //     body("task").isString(),
    //     body("author").isString()
    // ]),
    validation
];

todos.get("/todo", async ({ response }) => {
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

todos.post("/todo", validator, async ({ response, body }) => {
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
    console.log(data)
    return response.json({
        message: "Success save todo",
        data
    });
});

export default todos;