import { useState } from "react"
import Layout from "./components/Layout/Layout"
import {
	useDispatch,
} from "react-redux"
import { AuthContext } from "./context/auth.context"
import { useLoginMutation } from "./redux/services/authApi"
import { logout as logoutAction } from "./redux/slices/userSlice"
import messages from "./i18n/messages/index"
import { LOCALES } from "./i18n/locales"
import { IntlProvider } from "react-intl"
import { RoutesLink } from "./routes"

function App() {
	const [languageLocal, setLanguageLocal] = useState(LOCALES.UKR)
	const dispatch = useDispatch()
	const logout = () => dispatch(logoutAction())
	const [login] = useLoginMutation()

	return (
		<div className='app'>
			<IntlProvider
				locale={languageLocal}
				messages={messages[languageLocal]}
				defaultLocale={LOCALES.EN}
			>
				<AuthContext.Provider
					value={{
						login,
						logout
					}}
				>
          <Layout >
						<RoutesLink />
					</Layout >
				</AuthContext.Provider >
			</IntlProvider >
		</div >
	)
}

export default App
