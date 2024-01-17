import React from 'react'
import Header from "./Header"
import Sidebar from "./Sidebar"

export default function Layout({children}) {
	return (
		<>
			<Header />
			<div className='content'>
				<Sidebar />
				{children}
			</div>
		</>
	)
}