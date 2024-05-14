## Example: Registering a GraphQL API

### Filename: `testapi.server.js`

```javascript
import { registerAPI } from "library/api/index.js";

registerAPI(
  /* GraphQL */
  `
    type Query {
      yourFunction: String
    }
  `,
  {
    Query: {
      yourFunction,
    },
  }
);

function yourFunction() {
  return "Hello World";
}
```
