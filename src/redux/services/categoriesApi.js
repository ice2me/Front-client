import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./reAuth"
import { CATEGORIES_API } from "../../utils/constants"

export const categoriesAPi = createApi({
	reducerPath: "categoriesAPi",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getCategories: builder.mutation({
			query: (link) => ({
				url: `/client/${link}`,
				method: "GET"
			})
		}),
		getItemList: builder.mutation({
			query: ({
				id,
				link
			}) => ({
				url: `/client/${link}/${id}`,
				method: "GET"
			})
		}),
		postBasketFormClient: builder.mutation({
			query: (
					body
			) => ({
				url: `${CATEGORIES_API.POST_CATEGORIES}`,
				method: "POST",
				body
			})
		}),
		getAllShop: builder.mutation({
			query: () => ({
				url: `${CATEGORIES_API.ALL_SHOPS}`,
				method: "POST"
			})
		}),
		searchProduct: builder.mutation({
			query: ({
				id,
				product_name
			}) => ({
				url: `${CATEGORIES_API.SEARCH_PRODUCT}?user_id=${id}&product_name=${product_name}`,
				method: "POST"
			})
		}),
		searchTag: builder.mutation({
			query: ({
				id
			}) => ({
				url: `${CATEGORIES_API.SEARCH_PRODUCT_TAG}?user_id=${id}`,
				method: "POST"
			})
		}),
	})
})

export const {
	useGetCategoriesMutation,
	useGetItemListMutation,
	usePostBasketFormClientMutation,
	useGetAllShopMutation,
	useSearchProductMutation,
	useSearchTagMutation
} = categoriesAPi
