import {expect} from "chai";
import {RequestError} from "lambda-connect";

import getMiddleware from "../src/";

function getError (troublemaker) {
    try {
        troublemaker();
    } catch (e) {
        return e;
    }
}

describe("getMiddleware", () => {
    it("on valid schema, returns the `validateBody` function", () => {
        const validSchema = {type: "object"};
        const validateBody = getMiddleware(validSchema);
        expect(validateBody).to.be.a("function");
        expect(validateBody.name).to.equal("validateBody");
    });
    it("on invalid schema, throws", () => {
        const invalidSchema = "invalidSchema";
        const troublemaker = () => getMiddleware(invalidSchema);
        expect(troublemaker).to.throw();
    });
});

describe("validateBody", () => {
    const schema = {type: "object"};
    const validateBody = getMiddleware(schema);
    it("on valid body, returns the request", () => {
        const request = {body: {}};
        const ret = validateBody(request);
        expect(ret).to.equal(request);
    });
    it("on invalid body, throws a `RequestError`", () => {
        const request = {body: ""};
        const troublemaker = () => validateBody(request);
        expect(troublemaker).to.throw(RequestError);
        expect(getError(troublemaker)).to.have.property("code", 400);
        expect(getError(troublemaker)).to.have.property("details");
        expect(getError(troublemaker)).to.have.property("message", "ValidationError");
        expect(getError(troublemaker)).to.have.property("name", "RequestError");
    });
});
