import React from 'react';
import { Link } from "react-router-dom";

function NavButton({ to, label }) {
	return (
		<Link to={to}>
			<li className='cursor-pointer p-2 hover:bg-slate-100 font-semibold text-slate-600 rounded-lg'>
				{label}
			</li>
		</Link>
	)
}

export default NavButton