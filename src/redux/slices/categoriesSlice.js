import { createSlice } from "@reduxjs/toolkit"
import { categoriesAPi } from "../services/categoriesApi"

const initialState = {
	shop: {},
	categories: [],
	items: [],
	basket: [],
	search: [],
	basketWindow: false,
	searchWindow: false,
	selectedRoot: 'home'
}


const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		resetCategories: () => initialState,
		toggleSelectedRoot: (state, action) => {
			state.selectedRoot = action.payload
		},
		toggleBasketWindow: (state, action) => {
			state.basketWindow = action.payload
		},
		toggleSearchWindow: (state, action) => {
			state.searchWindow = action.payload
			if (action.payload === false) state.search = []
		},
		resetBasketLIst: (state, action) => {
			state.basket = []
		},
		pushCardToBasket: (state, action) => {
			const createIndex = state.basket.findIndex(el => el._id === action.payload._id)
			if (createIndex !== -1) {
				const uniqueCard = [...state.basket]
				uniqueCard[createIndex] = action.payload
				state.basket = [...uniqueCard]
				localStorage.setItem('items', JSON.stringify(state.basket))
			} else {
				state.basket = [...state.basket, action.payload]
				localStorage.setItem('items', JSON.stringify(state.basket))
			}
		},
		deleteCardToBasket: (state, action) => {
			state.basket = state.basket.filter(card => card?._id !== action.payload)
			localStorage.setItem('items', JSON.stringify(
				state.basket.filter(card => card?._id !== action.payload)
			))
		},
		resetBasket: (state) => {
			state.basket = []
			localStorage.setItem('items', JSON.stringify([]))
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				categoriesAPi.endpoints.getCategories.matchFulfilled,
				(state,
					action) => {
					state.categories = action.payload.categories
					state.shop = action.payload.shop
				}
			)
			.addMatcher(
				categoriesAPi.endpoints.searchProduct.matchFulfilled,
				(state,
					action) => {
					state.search = action.payload
				}
			)
			.addMatcher(
				categoriesAPi.endpoints.getItemList.matchFulfilled,
				(state,
					action) => {
					state.items = action.payload.items
				}
			)
	}
});

const {
	actions,
	reducer
} = categoriesSlice
export const {
	pushCardToBasket,
	deleteCardToBasket,
	resetBasket,
	resetBasketLIst,
	toggleBasketWindow,
	toggleSearchWindow,
	toggleSelectedRoot
} = actions
export default reducer
