import { api } from "lib/graphql/api"
import { mutate } from "lib/graphql/mutate"
import { gql } from "@apollo/client"

export const deleteTodo = api(async function deleteTodo(id) {
    return mutate(
        gql`
            mutation DeleteTodo($id: String!) {
                deleteTodo(id: $id) {
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
        {
            id,
        },
        { returns: "deleteTodo" }
    )
})
