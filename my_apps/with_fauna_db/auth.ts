import { Handler, UnauthorizedError } from "./deps.ts";

// example auth
export const auth: Handler = ({ request }, next) => {
    const authorize = request.headers.get("Authorization");
    if (authorize && authorize === "Bearer nhttp") {
        return next();
    }
    throw new UnauthorizedError("Please add header Authorization: Bearer nhttp");
}