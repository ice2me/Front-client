import React from 'react'
import DefaultPhoto from "../../assets/images/default-no-photo.png"

const CardForProduct = ({
	view,
	product,
	showProductInfoHandler
}) => {

	return (
		<div className={`${view ? 'cardForProduct-card_list' : 'cardForProduct-card'}`} onClick={() => showProductInfoHandler(product)}>
			{
				view
					?
					<>
						<div
							className='cardForProduct-card_list-image'
							style={{backgroundImage: `url(${product?.image_product ? product?.image_product : DefaultPhoto})`}}
						>
						</div >
						<div className='cardForProduct-card_list-header'>
							<span className='cardForProduct-card_list-header-name' title={product?.name_product}>
								{product?.name_product ? product?.name_product : '???'}
							</span >
							<div className='cardForProduct-card_list-header_block'>
								<div className='cardForProduct-card_list-header_block-content'>
									<span className='cardForProduct-card_list-header_price'>
										{`${product?.price_product ? product?.price_product : '00'}${product?.currency_product ? product?.currency_product : '₴'}`}
									</span >
									<span className='cardForProduct-card_list-header_count'>
										{product?.unit_product ? `1 ${product?.unit_product}` : 'шт'}
									</span >
								</div >
								<button
									className='cardForProduct-card_list-header_button'
								>
									До кошика
								</button >
							</div >
						</div >
					</>
					:
					<>
						<div
							className='cardForProduct-card_image'
							style={{backgroundImage: `url(${product?.image_product ? product?.image_product : DefaultPhoto})`}}
						>
						</div >
						<div className='cardForProduct-card_header'>
							<span className='cardForProduct-card_header-name' title={product?.name_product}>
								{product?.name_product ? product?.name_product : '???'}
							</span >
							<span className='cardForProduct-card_header-price'>
								{`${product?.price_product ? product?.price_product : '00'}${product?.currency_product ? product?.currency_product : '₴'}`}
							</span >
							<span className='cardForProduct-card_header-count'>
								{product?.unit_product ? `1 ${product?.unit_product}` : 'шт'}
							</span >
							<button
								className='cardForProduct-card_header-button'
								// onClick={() => showProductInfoHandler(product)}
							>
								До кошика
							</button >
						</div >
					</>
			}
		</div >
	)
}

export default CardForProduct