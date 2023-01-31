import { ICategory, ISelectedCategory } from '@/types/data';
import { NextFont } from '@next/font';
import moment from 'moment';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { HiEmojiSad } from 'react-icons/hi';
import { RiArrowUpSFill } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';
import style from './panel.module.css'


interface IPanelTasksProps {
    poppins: NextFont,
    data: ICategory,
    sort: string,
    dispatch: React.Dispatch<any>
}

function Paneltasks({ poppins, data, dispatch, sort }: IPanelTasksProps) {

    const [editStatus, setEditStatus] = useState<string>()
    const [changeStatus, setChangeStatus] = useState<string>()
    const [menuBar, setMenuBar] = useState<string>()
    if (typeof window !== "undefined") {
        document.body.addEventListener('click', () => setMenuBar(''))
    }

    function EditTodoStatus(uuid: string) {
        console.log(changeStatus)
        if (!changeStatus) {
            return
        }
        dispatch({ type: 'UPDATE_TODO_STATUS', payload: { uuid, value: changeStatus } })
        setEditStatus('')
        setChangeStatus('')
    }

    function deleteTodo(uuid: string) {
        dispatch({ type: 'DELETE_TODO', payload: uuid })
    }

    if (!data.todos.length) {
        return (
            <div className={`${style.todo_list_notodo_found} ${poppins.className}`}>
                <HiEmojiSad className={`${style.main_panel_not_selected_category_icon}`} />
                <h1>No Task Available</h1>
                <p>( Add Your Tasks )</p>
            </div>
        )
    }

    return (
        <div className={`${style.scrolltasks_list_div}`}>
            <div className={`${style.tasks_list_div} ${poppins.className}`}>
                <div className={`${style.tasks_list_titles} `}>
                    <div className={`${style.list_title_tasks}`}>Tasks</div>
                    <div className={`${style.list_title_duedate}`}>Due Date</div>
                    <div className={`${style.list_title_status}`}>Status</div>
                </div>
                {
                    data.todos.filter((todo) => {
                        if (sort === 'all') {
                            return true
                        }
                        return todo.status === sort
                    })
                        .map((val, index) => {
                            return (
                                <div className={`${style.tasks_list_content}`} key={index}>
                                    <div className={`${style.list_content_tasks}`}>{val.name}</div>
                                    <div className={`${style.list_content_duedate}`}>{moment(val.duedate).format('lll')}</div>

                                    <div className={`${style.list_content_status}`}>
                                        {
                                            editStatus === val.uuid ?
                                                <div>
                                                    <select defaultValue={val.status} name="status" id="" className={`${poppins.className}`} onChange={(e) => setChangeStatus(e.target.value)}>
                                                        <option disabled={val.status === 'Completed' ? true : false} value="Completed">Completed</option>
                                                        <option disabled={val.status === 'In Progress' ? true : false} value="In Progress">In Progress</option>
                                                        <option disabled={val.status === 'Not Started' ? true : false} value="Not Started">Not Started</option>
                                                    </select>
                                                    <button disabled={!changeStatus ? true : false} style={{ cursor: !changeStatus ? 'not-allowed' : 'pointer' }} onClick={() => EditTodoStatus(val.uuid)} className={`${style.edit_save_button}`}><GiCheckMark /></button>
                                                    <button onClick={() => setEditStatus('')} className={`${style.edit_save_button}`}><RxCross1 /></button>
                                                </div>
                                                :
                                                <p className={`${val.status === 'Completed' ? style.list_content_status_completed : val.status === 'In Progress' ? style.list_content_status_inprogress : style.list_content_status_notstarted}`}>{val.status}</p>
                                        }
                                    </div>
                                    <div className={`${style.list_content_dots}`}><BsThreeDotsVertical onClick={() => setMenuBar(val.uuid)} /></div>
                                    <div className={`${menuBar === val.uuid ? style.category_menu_div_open : style.category_menu_div_closed} ${style.category_menu_div}`}>
                                        <RiArrowUpSFill className={`${style.category_menu_div_arrow}`} />
                                        <div>
                                            <p onClick={() => setEditStatus(val.uuid)}>EDIT STATUS</p>
                                            <p onClick={() => deleteTodo(val.uuid)}>DELETE</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }


            </div>
        </div>
    );
}

export default Paneltasks;