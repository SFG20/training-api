import { api } from "lib/graphql/api"
import { query } from "lib/graphql/query"
import { gql } from "@apollo/client"

export const getTodos = api(({ searchTerm, skip, take, status, orderStmt } = {}) =>
    query(
        gql`
            query GetTodos($searchTerm: String, $skip: Int, $take: Int, $status: TodoStatus, $orderStmt: [String]) {
                getTodos(searchTerm: $searchTerm, skip: $skip, take: $take, status: $status, orderStmt: $orderStmt) {
                    _deleted
                    _id
                    completed
                    created
                    id
                    status
                    title
                }
            }
        `,
        { searchTerm, skip, take, status, orderStmt },
        { returns: "getTodos" }
    )
)
