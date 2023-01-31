import { ICategory, IData, ITodo } from "@/types/data"
import { v4 as uuidv4, validate } from 'uuid';

const Reducer = (state: IData, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'UPDATE_CATEGORY':
            state.categories = state.categories.map((val) => {
                if (val.uuid === action.payload.uuid) {
                    val.name = action.payload.text
                }
                return val
            })
            return { ...state }


        case 'ADD_CATEGORY':
            let category: ICategory = {
                name: action.payload,
                uuid: uuidv4(),
                createdDate: new Date,
                todos: [],
            }
            state = {
                isSideMenuOpen: state.isSideMenuOpen,
                selectedCategory: state.selectedCategory,
                categories: [...state.categories, category]
            }
            return { ...state }


        case 'DELETE_CATEGORY':
            state.categories = state.categories.filter((val) => val.uuid !== action.payload)
            return { ...state }


        case 'CHANGE_SELECTED_CATEGORY':
            state.selectedCategory = action.payload
            return { ...state }


        case 'ADD_NEW_TODO':
            let todo: ITodo = {
                name: action.payload.taskText,
                duedate: action.payload.selected_date,
                status: 'Not Started',
                uuid: uuidv4()
            }
            state.categories = state.categories.map((val) => {
                if (val.uuid === state.selectedCategory) {
                    val.todos.push(todo)
                }
                return val
            })
            return { ...state }


        case 'UPDATE_TODO_STATUS':
            state.categories = state.categories.map((val) => {
                val.todos = val.todos.map((todo) => {
                    if (todo.uuid === action.payload.uuid) {
                        todo.status = action.payload.value
                    }
                    return todo
                })
                return val
            })
            return { ...state }


        case 'DELETE_TODO':
            state.categories = state.categories.map((val) => {
                val.todos = val.todos.filter((todo) => todo.uuid !== action.payload)
                return val
            })
            return { ...state }


        case 'SIDE_MENU':
            state.isSideMenuOpen = action.payload
            return { ...state }


        default:
            return state
    }
}
export default Reducer