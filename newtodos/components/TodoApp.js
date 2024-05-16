import { getTodos } from "routes/plugins/newtodos/controller/getTodos"

import { IconButton, List, ListItemButton, ListItemText } from "@mui/material"
import LoadingScreen from "minimals-template/components/LoadingScreen"
import { navigate } from "lib/routes/navigate"
import { BlockClicks } from "lib/@components/block-clicks"
import Iconify from "minimals-template/components/Iconify"
import { deleteTodo } from "routes/plugins/newtodos/controller/deleteTodo"

function DeleteButton({ id }) {
    return (
        <BlockClicks>
            <IconButton onClick={handleDelete} sx={{ color: "red" }} edge="end" aria-label="delete">
                <Iconify icon="fluent:delete-12-regular" />
            </IconButton>
        </BlockClicks>
    )

    async function handleDelete() {
        const deletedTodo = await deleteTodo(id)
        console.log("deletedTodo", deletedTodo)
    }
}

function TodoListItem({ todo }) {
    return (
        <ListItemButton onClick={handleNavigate} component="a" key={todo.id} role={undefined}>
            <ListItemText> {todo.title}</ListItemText>
            <DeleteButton id={todo.id} />
        </ListItemButton>
    )
    function handleNavigate() {
        navigate(`/app/todos/${todo.id}`)
    }
}

export function TodoApp() {
    const todos = getTodos.useResults()

    if (!todos) return <LoadingScreen />

    return (
        <List>
            {todos?.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} />
            ))}
        </List>
    )
}
