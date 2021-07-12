import { Handler, UnprocessableEntityError, validationResult } from "./deps.ts";

export const validation: Handler = (rev, next) => {
    const errors = validationResult(rev);
    if (!errors.isEmpty()) {
        throw new UnprocessableEntityError(errors.array());
    }
    next();
}