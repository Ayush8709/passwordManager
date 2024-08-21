import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800  text-white'>

            <div className='mycontainer flex justify-between items-center px-4 py-5 h-14' >

                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-700 font-bold'>  {'<'} </span>
                    Pass
                    <span className='text-green-700'>OP/&gt; </span>
                   
                    </div>
                <ul>
                    {/* <li className='flex gap-4 '>
                        <a className='hover:font-bold' href="#">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li> */}
                </ul>

                <button className='text-white '>
                    <img className='invert-0 p-5' width={80} src="./chrome.png" alt="img" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
