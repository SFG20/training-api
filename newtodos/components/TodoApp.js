import { getTodos } from "routes/plugins/newtodos/controller/getTodos"

import { List, ListItemButton } from "@mui/material"
import LoadingScreen from "minimals-template/components/LoadingScreen"
import { navigate } from "lib/routes/navigate"

function TodoListItem({ todo }) {
    return (
        <ListItemButton onClick={handleNavigate} component="a" key={todo.id} role={undefined}>
            {todo.title}
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
