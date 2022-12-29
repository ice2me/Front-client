import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./reAuth"
import { CATEGORIES_API } from "../../utils/constants"

export const categoriesAPi = createApi({
	reducerPath: "categoriesAPi",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getCategories: builder.mutation({
			query: (link) => ({
				url: `${CATEGORIES_API.GET_CATEGORIES}${link}`,
				method: "GET"
			})
		}),
		getItemList: builder.mutation({
			query: ({
				id,
				link
			}) => ({
				url: `${CATEGORIES_API.GET_CATEGORIES}${link}/${id}`,
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
	})
})

export const {
	useGetCategoriesMutation,
	useGetItemListMutation,
	usePostBasketFormClientMutation,
} = categoriesAPi
