import { useState } from 'react'
import { Route, Routes } from "react-router-dom"


// import pages
import Home from "./pages/home/Home";
import Components from "./pages/components/Components";

function App() {

  return (
	<>
			<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/components" element={<Components/>} />
		</Routes>
	</>
  )
}

export default App
