[![Build Status](https://travis-ci.org/innowatio/lcm-validate-body.svg?branch=master)](https://travis-ci.org/innowatio/lcm-validate-body)
[![Coverage Status](https://coveralls.io/repos/innowatio/lcm-validate-body/badge.svg?branch=master&service=github)](https://coveralls.io/github/innowatio/lcm-validate-body?branch=master)
[![Dependency Status](https://david-dm.org/innowatio/lcm-validate-body.svg)](https://david-dm.org/innowatio/lcm-validate-body)
[![devDependency Status](https://david-dm.org/innowatio/lcm-validate-body/dev-status.svg)](https://david-dm.org/innowatio/lcm-validate-body#info=devDependencies)

# lcm-validate-body

Middleware for validating the request body using a json-schema.

### Install

```sh
npm i --save lcm-validate-body
```

### Usage

```js
import connect from "lambda-connect";
import validateBody from "lcm-validate-body";

const schema = {type: "object"};

export const handler = connect()
    .use(validateBody(schema));
```
