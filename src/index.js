import Ajv from "ajv";
import {RequestError} from "lambda-connect";

export default function getMiddleware (schema) {
    const ajv = new Ajv({
        allErrors: true,
        format: "full"
    });
    const validate = ajv.compile(schema);
    return function validateBody (request) {
        const isValid = validate(request.body);
        if (isValid) {
            return request;
        } else {
            throw new RequestError(400, "ValidationError", validate.errors);
        }
    };
}
