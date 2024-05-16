import { appRoute } from "routes/app/home.runtime"
import { registerPageNavigation } from "lib/routes/register-page-navigation"
import { TodoApp } from "routes/plugins/newtodos/components/TodoApp"
import { useParams } from "react-router-dom"
import { getTodo } from "routes/plugins/newtodos/controller/getTodo"
import DummyComponent from "lib/@components/debug-component"

registerPageNavigation("/app/todos", "Todo App", "mdi:to-do")

appRoute.register("todos", <TodoApp />)
appRoute.register("todos/:id", <TodoItem />)

function TodoItem() {
    const { id } = useParams()
    const todo = getTodo.useResults(id)
    return (
        <>
            <DummyComponent todo={todo} />
        </>
    )
}
