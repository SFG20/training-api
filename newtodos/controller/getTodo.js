import { api } from "lib/graphql/api"
import { query } from "lib/graphql/query"
import { gql } from "@apollo/client"

export const getTodo = api(({ id }) =>
    query(
        gql`
            query GetTodo($id: String!) {
                getTodo(id: $id) {
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
        { id },
        { returns: "getTodo" }
    )
)
