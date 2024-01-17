import React from 'react'
import DefaultPhoto from '../../assets/images/default-no-photo.png'

const CardForCategory = ({view, openCategoryHandler, item}) => {
	return (
		<div
			className={`${view ? 'cardForCategory-list' : 'cardForCategory'}`}
			onClick={() => openCategoryHandler(true, item?._id, item?.category_name)}
		>
			{
				view
					?
					<>
						<div
							className='cardForCategory-list_image'
							style={{backgroundImage: `url(${item?.category_image ? item?.category_image : DefaultPhoto})`}}
						></div >
						<div className='cardForCategory-list_header'>
							<span className='cardForCategory-list_header_name'>{item?.category_name ? item?.category_name : 'Name Category'}</span >
							<span className='cardForCategory-list_header_count'>{item?.category_list ? item?.category_list?.length : '0'}</span >
						</div >
					</>
					:
					<>
						<div className='cardForCategory-header'>
							<span className='cardForCategory-header_name'>{item?.category_name ? item?.category_name : 'Name Category'}</span >
							<span className='cardForCategory-header_count'>{item?.category_list ? item?.category_list?.length : '0'}</span >
						</div >
						<div
							className='cardForCategory-image'
							style={{backgroundImage: `url(${item?.category_image ? item?.category_image : DefaultPhoto})`}}
						></div >
					</>
			}
		</div >
	)
}

export default CardForCategory