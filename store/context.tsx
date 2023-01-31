'use client'

import React, { createContext, ReactHTMLElement, ReactNode, useReducer } from "react";
import Reducer from "./reducer";
import { IData, IContext, ICategory, ISelectedCategory } from '../types/data'
import { v4 as uuidv4 } from 'uuid';

const categories: ICategory[] = [
    {
        name: "Example 1",
        uuid: uuidv4(),
        createdDate: new Date('Tue Jan 31 2023 01:10:51 GMT+0500 (Pakistan Standard Time'),
        todos: [
            { name: 'XYZ 1', status: 'Completed', duedate: new Date('Sat Feb 04 2023 04:00:00 GMT+0500 (Pakistan Standard Time)'), uuid: uuidv4() },
            { name: 'XYZ 2', status: 'In Progress', duedate: new Date('Wed Feb 08 2023 12:00:00 GMT+0500 (Pakistan Standard Time)'), uuid: uuidv4() },
        ]
    },
    {
        name: "Example 2",
        uuid: uuidv4(),
        createdDate: new Date('Tue Jan 31 2023 01:40:36 GMT+0500 (Pakistan Standard Time)'),
        todos: [
            { name: 'ABC 1', status: 'Not Started', duedate: new Date('Tue Feb 07 2023 01:00:00 GMT+0500 (Pakistan Standard Time)'), uuid: uuidv4() },
            { name: 'ABC 2', status: 'Completed', duedate: new Date('Sun Feb 12 2023 12:00:00 GMT+0500 (Pakistan Standard Time)'), uuid: uuidv4() },
        ]
    },
]

let selectedCategory: ISelectedCategory = ''
let isSideMenuOpen:boolean = false
let data: IData = { selectedCategory, categories ,isSideMenuOpen}


export const ContextApi = createContext<IContext>({ state: data, dispatch: () => null });

export const CreateContext = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, data);
    return (
        <ContextApi.Provider value={{ state, dispatch }}>
            {children}
        </ContextApi.Provider>
    )

}