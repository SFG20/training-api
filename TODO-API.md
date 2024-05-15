# TODO App API - boilerplate code

### Endpoints

```javascript
import { registerAPI } from "library/api/index.js";
import { TodoTaskTable } from "library/known-tables/index.js";
import { generate } from "library/guid/index.js";

const TODO_STATUS = {
  TODO: "TODO",
  DOING: "DOING",
  DONE: "DONE",
};

registerAPI(
  /* GraphQL */ `
    type Query {
      getTodo(id: String!): Todo
      getTodos(
        searchTerm: String
        skip: Int
        take: Int
        status: TodoStatus
        orderStmt: [String]
      ): [Todo]
    }

    type Mutation {
      deleteTodo(id: String!): Todo
      createTodo(title: String!): Todo
      updateTodo(id: String!, title: String, status: TodoStatus): Todo
      updateTodoState(id: String!, status: TodoStatus!): Todo
    }

    type Todo {
      _deleted: Int
      _id: String
      completed: Date
      created: Date
      id: String
      status: TodoStatus
      title: String
    }

    enum TodoStatus {
      TODO
      DOING
      DONE
    }
  `,
  // resolvers
  {
    Query: {
      getTodo,
      getTodos,
    },
    Mutation: {
      createTodo,
      deleteTodo,
      updateTodo,
      updateTodoState,
    },
  }
);

function getTodo(_, { id }) {
  try {
    return TodoTaskTable.get(id);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function getTodos(
  _,
  { searchTerm = "", status, skip = 0, take = "10", orderStmt = ["title_nc_"] }
) {
  try {
    const where = {
      $and: [
        !!searchTerm && { _nc_title: { $like: `%${searchTerm}%` } },
        !!status && { status: status },
      ],
    };

    /* The above is similar to defining the where like this:
             let where = {}
             if (searchTerm || status) {
                 where.$and = []
             
                 if (searchTerm) {
                     where.$and.push({ _nc_title: { $like: "%" + searchTerm + "%" } })
                 }
                 
                 if (status) {
                     where.$and.push({ status: status })
                 }
             }
         */

    return TodoTaskTable.list(where, { skip, take, orderStmt });
  } catch (e) {
    console.error(e);
    return null;
  }
}

function createTodo(_, { title }) {
  try {
    const id = generate();
    const newTodo = {
      _id: TodoTaskTable.id(id),
      created: Date.now(),
      id,
      status: TODO_STATUS.TODO,
      title,
    };
    return TodoTaskTable.put(newTodo);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function deleteTodo(_, { id }) {
  try {
    return TodoTaskTable.update(id, { _deleted: 1 });
  } catch (e) {
    console.error(e);
    return null;
  }
}

function updateTodo(_, { id, title, status }) {
  try {
    let updateFields = {
      ...(title && { title }),
      ...(status && { status }),
    };

    if (status) {
      if (status === TODO_STATUS.DONE) {
        updateFields.completed = Date.now();
      } else {
        updateFields.completed = null;
      }
    }
    return TodoTaskTable.update(id, updateFields);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function updateTodoState(_, { id, status }) {
  try {
    let completed;
    if (status === TODO_STATUS.DONE) {
      completed = Date.now();
    }
    return TodoTaskTable.update(id, { completed, status });
  } catch (e) {
    console.error(e);
    return null;
  }
}
```
