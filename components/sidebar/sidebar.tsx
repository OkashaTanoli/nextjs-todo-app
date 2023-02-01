'use client'

import React, { useContext, useRef, useState } from 'react';
import style from './sidebar.module.css'
import { ContextApi } from '@/store/context';
import { IContext } from '@/types/data';

import { Paytone_One, Josefin_Sans } from '@next/font/google'

import { MdOutlineAdd } from 'react-icons/md'
import { VscClose } from 'react-icons/vsc'
import Categories from './siderbarcategory';



const paytoneone = Paytone_One({
    weight: '400',
    subsets: ['latin'],
})
const josefinsans = Josefin_Sans({
    weight: '400',
    subsets: ['latin'],
})




function Sidebar() {


    const [addCategoryText, setAddCategoryText] = useState('')
    const [addCategoryPopUP, setAddCategoryPopUP] = useState(false)
    const { state, dispatch }: IContext = useContext(ContextApi)


    function closeSideMenu() {
        dispatch({ type: 'SIDE_MENU', payload: false })
    }

    function AddCategory() {
        if (!addCategoryText.trim()) {
            alert('Empty Category Not Accepted')
            return
        }
        dispatch({ type: 'ADD_CATEGORY', payload: addCategoryText.trim() })
        setAddCategoryPopUP(false)
        setAddCategoryText('')
    }


    console.log(state)
    return (
        <>
            <div className={`${style.sideMenuOverlay} ${!state.isSideMenuOpen ? style.sideMenuClosedOverlay : style.sideMenuOpenedOverlay}`}></div>
            <div className={`${style.siderbar} ${state.isSideMenuOpen && style.sideMenuOpne}`}>
                <div className={`${style.top}`}>
                    <h1 className={`${paytoneone.className}`}>Todo By Okasha</h1>
                    <VscClose onClick={() => closeSideMenu()} className={`${style.close_side_menu}`} />
                </div>
                <div className={`${style.category_block} ${josefinsans.className}`}>
                    <div className={`${style.category_heading_div}`}>
                        {
                            addCategoryPopUP ?
                                <div className={`${style.add_category_div}`}>
                                    <input type="text" onChange={(e) => setAddCategoryText(e.target.value)} className={`${style.add_category_input}`} placeholder='Add Category' />
                                    <button className={`${style.add_category_button}`} onClick={() => AddCategory()}>ADD</button>
                                    <button onClick={() => setAddCategoryPopUP(false)} className={`${style.add_category_button}`}>CANCEL</button>
                                </div>
                                :
                                <>
                                    <h5 className={`${style.category_heading}`}>CATEGORIES</h5>
                                    <MdOutlineAdd onClick={() => setAddCategoryPopUP(true)} className={`${style.add_category}`} />
                                </>

                        }
                    </div>
                    <Categories state={state} dispatch={dispatch} />

                </div>
            </div>
        </>
    );
}

export default Sidebar;