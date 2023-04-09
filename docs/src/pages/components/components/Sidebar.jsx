import React from 'react'
import NavButton from './NavButton'

function Sidebar() {
	return (
		<nav className='w-72 h-screen border-r border-slate-200'>
			<ul className='flex flex-col p-4'>
				<NavButton to={"/components/button"} label="Button"/>
				<NavButton to={"/components/input"} label="Input"/>
				<NavButton to={"/components/select"} label="Select"/>
			</ul>
		</nav>
	)
}

export default Sidebar