'use client'

import React, { useContext, useState, useEffect } from 'react';
import style from './panel.module.css'
import { Poppins } from '@next/font/google'
import moment from 'moment'
import BasicDateTimePicker from './timepicker';
import dayjs, { Dayjs } from 'dayjs';
import { HiEmojiSad } from 'react-icons/hi'
import { CgMenuLeft } from 'react-icons/cg'
import { ICategory, IContext } from '@/types/data';
import { ContextApi } from '@/store/context';
import { NextFont } from '@next/font';
import Paneltasks from './paneltasks';
import { VscClose } from 'react-icons/vsc';



const poppins: NextFont = Poppins({
    weight: ['500'],
    subsets: ['latin'],
})

function Panel() {

    const [sort, setSort] = useState('all')
    const [taskText, setTaskText] = useState('')
    const [openPopUp, setOpenPopUp] = useState(false)
    const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date().toJSON()));
    const { state, dispatch }: IContext = useContext(ContextApi)
    const [data, setData] = useState<ICategory>()

    useEffect(() => {
        const category = state.categories.filter((val) => val.uuid === state.selectedCategory)[0]
        setData(category)
    }, [state.categories, state.selectedCategory])

    function AddTask() {
        let selected_date = new Date((date as unknown) as Date)
        if (!taskText.trim()) {
            alert('Please enter task')
            return
        }
        if (new Date().getTime() > new Date(selected_date).getTime()) {
            alert("Due Time can't be less than current time")
            return
        }
        dispatch({ type: 'ADD_NEW_TODO', payload: { taskText: taskText.trim(), selected_date } })
        setTaskText('')
        setOpenPopUp(false)

    }

    function openSideMenu() {
        dispatch({ type: 'SIDE_MENU', payload: true })
    }

    if (!data) {
        return (
            <div className={`${style.main_panel_not_selected_category}`}>
                <div className={`${style.panel_header}`}>
                    <CgMenuLeft className={`${style.menu_icon}`} onClick={() => openSideMenu()} />
                </div>
                <div>
                    <div className={`${poppins.className}`}>
                        <HiEmojiSad className={`${style.main_panel_not_selected_category_icon}`} />
                        <h1>No Category Selected</h1>
                        <p>( please select one )</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={`${style.add_new_task_block_responsive_popup} ${openPopUp ? style.add_new_task_block_responsive_popup_open : style.add_new_task_block_responsive_popup_closed}`}>
                <div className={`${style.add_new_task_block_responsive_popup_div}`}>
                    <VscClose onClick={() => setOpenPopUp(false)} className={`${style.close_add_task_popup}`} />
                    <input value={taskText} type="text" onChange={(e) => setTaskText(e.target.value)} className={`${style.add_new_task_input} ${style.add_new_task_input_responsive}`} placeholder='Enter New Task' />
                    <BasicDateTimePicker date={date} setDate={setDate} />
                    <button onClick={() => AddTask()} className={`${style.add_task_button} ${style.add_task_button_responsive} ${poppins.className}`}>ADD TASK</button>
                </div>
            </div>
            <div className={`${style.main_panel}`}>
                <div className={`${style.panel_header}`}>
                    <CgMenuLeft className={`${style.menu_icon}`} onClick={() => openSideMenu()} />
                    <div className={`${style.panel_header_intro} `}>
                        <p className={`${style.panel_header_intro_name} ${poppins.className}`}>{data?.name}</p>
                        <p className={`${style.panel_header_intro_date} ${poppins.className}`}>Created Date : {moment(data?.createdDate).format('LLL')}</p>
                    </div>
                    <div className={`${style.panel_buttons_div} ${poppins.className}`}>
                        <div onClick={() => setSort('all')} className={`${sort === 'all' && style.panel_active_button}`}>ALL</div>
                        <div onClick={() => setSort('Not Started')} className={`${sort === 'Not Started' && style.panel_active_button}`}>NOT STARTED</div>
                        <div onClick={() => setSort('In Progress')} className={`${sort === 'In Progress' && style.panel_active_button}`}>IN PROGRESS</div>
                        <div onClick={() => setSort('Completed')} className={`${sort === 'Completed' && style.panel_active_button}`}>COMPLETED</div>
                    </div>
                </div>
                <div className={`${style.panel_main_block}`}>
                    <div className={`${style.add_new_task_block_responsive}`}>
                        <button onClick={() => setOpenPopUp(true)} className={`${poppins.className}`}>ADD TASK</button>
                    </div>
                    <div className={`${style.add_task_div}`}>
                        <p className={`${style.add_new_task_heading} ${poppins.className}`}>Add New Task</p>
                        <div className={`${style.add_new_task_block}`}>
                            <input value={taskText} type="text" onChange={(e) => setTaskText(e.target.value)} className={`${style.add_new_task_input}`} placeholder='Enter New Task' />
                            <BasicDateTimePicker date={date} setDate={setDate} />
                            <button onClick={() => AddTask()} className={`${style.add_task_button} ${poppins.className}`}>ADD TASK</button>
                        </div>
                    </div>
                    <Paneltasks poppins={poppins} data={data} dispatch={dispatch} sort={sort} />
                </div>
            </div>
        </>
    );
}

export default Panel;