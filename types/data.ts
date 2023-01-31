
export interface ITodo {
    name: string,
    status: "Completed" | "In Progress" | "Not Started",
    duedate: Date,
    uuid: string
}

export interface ICategory {
    name: string,
    createdDate: Date
    uuid: string,
    todos: ITodo[]
}

export type ISelectedCategory = string

export interface IData {
    selectedCategory: ISelectedCategory,
    categories: ICategory[],
    isSideMenuOpen:boolean
}

export type IContext = {
    state: IData,
    dispatch: React.Dispatch<any>
}