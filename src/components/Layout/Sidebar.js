import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { ReactComponent as ToggleButton } from '../../assets/icons/side-menu-toggle-button.svg'
import { ReactComponent as ToggleButtonOrange } from '../../assets/icons/side-menu-orange-toggle-button.svg'
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-left.svg'
import { toggleBasketWindow, toggleSearchWindow } from "../../redux/slices/categoriesSlice"

const Sidebar = () => {
	const {basket} = useSelector((state) => state.categories)
	const [hideTitlesSidebar, setHideTitlesSidebar] = useState(true)
	const dispatch = useDispatch()

	const showHideSidebar = () => setHideTitlesSidebar(!hideTitlesSidebar)
	const openBasketWindow = () => {
		dispatch(toggleBasketWindow(true))
		dispatch(toggleSearchWindow(false))
	}

	const navigationHomePage = () => {
		dispatch(toggleBasketWindow(false))
		dispatch(toggleSearchWindow(false))
	}

	return (
		<>
			<div className={`sidebar ${hideTitlesSidebar ? '' : 'min-sidebar'}`}>
				<div className={`sidebar-wrapper ${hideTitlesSidebar ? 'sidebar-min' : ''}`}>
					<ul className='sidebar-wrapper_top'>
						<li
							className='sidebar-wrapper_top-item'
							onClick={navigationHomePage}
						>
							<div className='sidebar-wrapper_top-item_icon' />
							<span className={`sidebar-wrapper_top-item_title ${hideTitlesSidebar ? 'title-min' : ''}`}>
								Нашi продукти
							</span >
						</li >
						<li
							className='sidebar-wrapper_top-item'
							onClick={openBasketWindow}
						>
							<div className='sidebar-wrapper_top-item_icon' />
							<span className={`sidebar-wrapper_top-item_title ${hideTitlesSidebar ? 'title-min' : ''}`}>
								Мій кошик
							</span >
						</li >
						<li className='sidebar-wrapper_top-item'>
							<div className='sidebar-wrapper_top-item_icon' />
							<span className={`sidebar-wrapper_top-item_title ${hideTitlesSidebar ? 'title-min' : ''}`}>
								Профіль магазину
							</span >
						</li >
					</ul >
					<button
						className='sidebar-wrapper_center'
						onClick={showHideSidebar}
					>
						{
							hideTitlesSidebar
								?
								<ToggleButton className='sidebar-wrapper_center-image' />
								:
								<ToggleButtonOrange className='sidebar-wrapper_center-image' />
						}

						<ArrowLeft className={`sidebar-wrapper_center-arrow ${!hideTitlesSidebar ? 'arrow-active' : 'arrow-noactive'}`} />
					</button >
					<ul className='sidebar-wrapper_bottom'>
						<li className='sidebar-wrapper_bottom-item'>
							<div className='sidebar-wrapper_bottom-item_icon' />
							<span className={`sidebar-wrapper_bottom-item_title ${hideTitlesSidebar ? 'title-min' : ''}`}>
								Зворотнiй зв’язок
							</span >
						</li >
					</ul >
				</div >
			</div >

			<div className='sidebar-mob'>
				<div className='sidebar-mob_wrapper'>
					<ul className='sidebar-mob_wrapper-block'>
						<li className='sidebar-mob_wrapper-block_item'>
							<div className='sidebar-mob_wrapper-block_item-icon' />
							<span className={`sidebar-mob_wrapper-block_item-title`}>
								Профіль магазину
							</span >
						</li >
						<li className='sidebar-mob_wrapper-block_item'>
							<div className='sidebar-mob_wrapper-block_item-icon' />
							<span className={`sidebar-mob_wrapper-block_item-title`}>
								Зворотнiй зв’язок
							</span >
						</li >
						<li className='sidebar-mob_wrapper-block_item' onClick={navigationHomePage}>
							<div className='sidebar-mob_wrapper-block_item-icon' />
							<span className={`sidebar-mob_wrapper-block_item-title`}>
								Нашi продукти
							</span >
						</li >
						<li className='sidebar-mob_wrapper-block_item' onClick={openBasketWindow}>
							<div className='sidebar-mob_wrapper-block_item-icon' />
							<p className='sidebar-mob_wrapper-block_item-count'>
								{
									basket?.length >= 1
										?
										basket?.length
										:
										0
								}
							</p >
							<span className={`sidebar-mob_wrapper-block_item-title`}>
								Мій кошик
							</span >
						</li >
					</ul >
				</div >
			</div >
			</>
	)
}
export default Sidebar