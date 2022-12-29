import { createSlice } from "@reduxjs/toolkit"
import { categoriesAPi } from "../services/categoriesApi";

const initialState = {
	shop: {},
	categories: [],
	items: [],
	basket: []
};


const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		resetCategories: () => initialState,
		setCategoriesInList: (state, action) => {
			state.categories = action.payload
		},
		resetItemsLIst: (state, action) => {
			state.items = []
		},
		pushCardToBasket: (state, action) => {
			const items = JSON.parse(localStorage.getItem('items'))
			const createIndex = state.basket.findIndex(el => el._id === action.payload._id)
			if (createIndex !== -1) {
				console.log('0')
				console.log('items', items)
				const uniqueCard = [...state.basket]
				uniqueCard[createIndex] = action.payload
				state.basket = [...uniqueCard]
			} else {
				console.log('1')
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
					state.shop = action.payload.shop[0]
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
} = actions;
export default reducer
