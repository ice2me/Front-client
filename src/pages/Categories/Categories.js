import React from 'react'
import ShopLogo from "../../assets/images/default-shop-logo.png"
import CardForCategory from "../../components/Card/CardForCategory"
import ToggleView from "../../components/ToggleView/ToggleView"
import { addSpace } from "../../utils/toggleSpaceString"

const Categories = ({
	toggleViewHandler,
	toggleView,
	categories,
	shop,
	openCategoryHandler
}) => {

	return (
		<>
			<div className='home-wrapper_content'>
				<div className='home-wrapper_header'>
					<div className='home-wrapper_header-title'>
						<div
							className='home-wrapper_header-title_img'
							style={
								shop?.image_logo
									?
									{backgroundImage: `url(${shop?.image_logo})`}
									:
									{backgroundImage: `url(${ShopLogo})`}
							}
						>
						</div >
						<h1 className='home-wrapper_header-title_naming'>
							{shop?.shop_name ? addSpace(shop?.shop_name) : 'Shop Name'}
						</h1 >
					</div >
					<div className='home-wrapper_header-view'>
						<ToggleView
							toggleView={toggleView}
							toggleViewHandler={toggleViewHandler}
						/>
					</div >
				</div >
				<div className='home-wrapper_body' >
					<div className={`home-wrapper_body-wrapper ${toggleView ? 'active-list-horizontal-style' : ''}`}>
						{
							categories && categories?.map(category => (
								<CardForCategory
									key={category?._id}
									item={category}
									view={toggleView}
									openCategoryHandler={openCategoryHandler}
								/>
							))
						}
					</div >
				</div >
			</div >
			{/*<div className='home-wrapper_promotion'>*/}
			{/*	<div className='home-wrapper_promotion-header'>*/}
			{/*		<ButtonForAdd*/}
			{/*		title={'Додати акцiю'}*/}
			{/*		/>*/}
			{/*	</div>*/}
			{/*	<div className='home-wrapper_promotion-wrapper'>*/}
			{/*		<div className='home-wrapper_promotion-wrapper_content'>*/}
			{/*			{*/}
			{/*				categories && categories?.map(category => (*/}
			{/*					<CardForCategory*/}
			{/*						title={category?.category_name}*/}
			{/*						count={'10'}*/}
			{/*						image={category?.category_image}*/}
			{/*					/>*/}
			{/*				))*/}
			{/*			}*/}
			{/*		</div>*/}
			{/*	</div >*/}
			{/*</div >*/}
		</>
	)
}

export default Categories