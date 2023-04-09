import React from 'react'

function Home() {
	return (
		<div className='max-w-[1240px] px-4 mx-auto'>
			<div className='flex mt-32 mx-auto'>
				<div className="flex mx-auto">
					<div className="w-4/12 flex justify-center items-center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="url(#grad1)" class="w-52 h-52">
							<defs>
								<linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" style={{ "stop-color": "#c084fc", "stop-opacity": "1" }} />
									<stop offset="100%" style={{ "stop-color": "#4338ca", "stop-opacity": "1" }} />
								</linearGradient>
							</defs>
							<path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" />
						</svg>

					</div>
					<div className="w-8/12 flex flex-col justify-center">
						<h4 className='text-7xl font-extrabold'>Arc Design</h4>
						<p className='mt-4'>Revolutionize your user interfaces with our cross-framework UI library</p>
						<div className='mt-8'>
							<button className='p-2 rounded-lg bg-violet-500 hover:bg-violet-400 text-white'>
								Getting Started
							</button>
						</div>
					</div>
				</div>



			</div>
		</div>
	)
}

export default Home