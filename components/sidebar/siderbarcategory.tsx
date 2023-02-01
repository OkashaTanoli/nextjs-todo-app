import style from './sidebar.module.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiArrowUpSFill } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { GiCheckMark } from 'react-icons/gi'
import { useState } from 'react'
import { IContext, ITodo } from '@/types/data'


export default function Categories({ dispatch, state }: IContext) {
    const [menuBar, setMenuBar] = useState<string>()
    const [editName, setEditName] = useState<string>()
    const [editText, setEditText] = useState('')
    if (typeof window !== "undefined") {
        document.body.addEventListener('click', () => setMenuBar(''))
    }


    function EditCategory(uuid: string) {
        if (!editText.trim()) {
            alert('Empty Category Not Accepted')
            return
        }
        dispatch({ type: 'UPDATE_CATEGORY', payload: { uuid, text: editText.trim() } })
        setEditName('')
        setEditText('')
    }

    function DeleteCategory(uuid: string) {
        dispatch({ type: 'DELETE_CATEGORY', payload: uuid })
    }

    function handleSelectedCategory(uuid: string) {
        dispatch({ type: 'CHANGE_SELECTED_CATEGORY', payload: uuid })
    }

    if (!state.categories.length) {
        return (
            <div className={`${style.all_categories} ${style.no_category_available_div}`}>
                <p className={`${style.no_category_available}`}>
                    No Category Available
                </p>
            </div>
        )
    }
    return (
        <div className={`${style.all_categories}`}>
            {
                state.categories.map((val, index) => {
                    return (
                        <div className={`${style.category}`} key={index} onClick={() => handleSelectedCategory(val.uuid)}>
                            <div className={`${style.category_overlap}`}>
                                <div className={`${style.category_color} ${state.selectedCategory === val.uuid && style.category_selected_color_line}`} ></div>
                                <div className={`${style.design_line} ${state.selectedCategory === val.uuid && style.category_selected_color_line}`} ></div>
                                <div className={`${style.category_intro}`}>
                                    {
                                        editName === val.uuid ?
                                            <div className={`${style.editinput_div}`}>
                                                <input value={editText} onChange={(e) => setEditText(e.target.value)} type="text" placeholder='Enter Name' className={`${style.editinput}`} />
                                                <button onClick={() => EditCategory(val.uuid)} className={`${style.edit_save_button}`}><GiCheckMark /></button>
                                                <button onClick={() => setEditName('')} className={`${style.edit_save_button}`}><RxCross1 /></button>
                                            </div>
                                            :
                                            <p className={`${style.category_name}`}>{val.name}</p>
                                    }
                                    <BsThreeDotsVertical className={`${style.category_menu_icon}`} onClick={() => setMenuBar(val.uuid)} />
                                    <div className={`${menuBar === val.uuid ? style.category_menu_div_open : style.category_menu_div_closed} ${style.category_menu_div}`}>
                                        <RiArrowUpSFill className={`${style.category_menu_div_arrow}`} />
                                        <div>
                                            <p onClick={() => setEditName(val.uuid)}>EDIT</p>
                                            <p onClick={() => DeleteCategory(val.uuid)}>DELETE</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${style.category_stats}`}>
                                    <div>
                                        <p>All</p>
                                        <p>{val.todos.length}</p>
                                    </div>
                                    <div>
                                        <p>Completed</p>
                                        <p>{val.todos.filter((val: ITodo) => val.status === 'Completed').length}</p>
                                    </div>
                                    <div>
                                        <p>In Progress</p>
                                        <p>{val.todos.filter((val: ITodo) => val.status === 'In Progress').length}</p>
                                    </div>
                                    <div>
                                        <p>Not Started</p>
                                        <p>{val.todos.filter((val: ITodo) => val.status === 'Not Started').length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>

    )
}