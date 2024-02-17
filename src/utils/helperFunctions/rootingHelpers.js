import { toggleSelectedRoot } from "../../redux/slices/categoriesSlice"

export const rootingHelpers = (root, dispatch) => {
	dispatch(toggleSelectedRoot(root))
}