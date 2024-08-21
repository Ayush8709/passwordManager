import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';




const Manager = () => {
    //save password in array && localStorage
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("password")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    //end save password in array && localStorage

    //password icon show hide logic
    const ref = useRef()
    const passwordRef = useRef()

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes('hidden.png')) {
            ref.current.src = 'show.png'
            passwordRef.current.type = "password"
        } else {
            ref.current.src = 'hidden.png'
            passwordRef.current.type = "text"
        }
    }
    //end password show hide icon login



    //form data take logic
    const [form, setForm] = useState({
        site: '',
        username: '',
        password: ""

    })

    //save password in localStorage
    const savePassword = () => {

        if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem('password', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({
                site: '',
                username: '',
                password: ""
            }
            )
            toast('Password save succesfull', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            toast('passoword and username length must be 3 length !', {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
        }


      
    }
    //end form data take logic

    //delete password in localStorage
    const deletePassword = (id) => {

        let c = confirm("Are You Sure")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem('password', JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast('Password delted succesfull', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    //delete form data take logic

    //edit password in localStorage
    const editPassword = (id) => {
        toast('Password Updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }
    //edit form data take logic

    //chage form data logic
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //end form data change logic

    //copy text logic
    const copyText = (text) => {
        toast('Copied to clipbord', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text) // this is inbuil js function
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>  </div>

            <div className=" p-2 mt-10 md:p-0 md:mycontainer ">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700 font-bold'>  {'<'} </span>
                    Pass
                    <span className='text-green-500'>OP/&gt; </span>
                </h1>

                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className=" flex flex-col  items-center gap-8 p-4 text-black">
                    <input onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' value={form.site} placeholder='Website Name' />
                    <div className="flex md:flex-row flex-col w-full gap-8">
                        <input onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' value={form.username} placeholder='Username' />

                        <div className="relative">
                            <input ref={passwordRef} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' value={form.password} placeholder='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={25} className='p-1' src="./show.png" alt="eye" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-600 hover:bg-green-500  rounded-full px-5 py-2 w-fit gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Password</h2>
                    {passwordArray.length === 0 && <div>No Password Save</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-12">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100 '>
                                {passwordArray.map((value, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td className='text-center  py-2 border border-white '>
                                                    <div className='lordiconcopy flex justify-center items-center ' onClick={() => copyText(value.site)}>

                                                        <a href={value.site} target='_blank'>{value.site} </a>
                                                        <div className='size-7 cursor-pointer'>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                                trigger="hover"
                                                                style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: '3px' }}
                                                            >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center py-2 border border-white '>
                                                    <div className='lordiconcopy flex justify-center items-center ' onClick={() => copyText(value.username)}>

                                                        {value.username}
                                                        <div className='size-7 cursor-pointer'>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                                trigger="hover"
                                                                style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: '3px' }}
                                                            >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center py-2 border border-white '>
                                                    <div className='lordiconcopy flex justify-center items-center ' onClick={() => copyText(value.password)}>

                                                        {value.password}
                                                        <div className='size-7 cursor-pointer'>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                                trigger="hover"
                                                                style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: '3px' }}
                                                            >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center py-2 border border-white '>
                                                    <div className='flex justify-center items-center cursor-pointer'>

                                                        <span onClick={() => { editPassword(value.id) }}>
                                                            <img width={37} className='pl-2' src="edit.svg" alt="img" />
                                                        </span>
                                                        <span onClick={() => { deletePassword(value.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                                trigger="hover"
                                                                style={{ width: "25px", height: "25px" }}>
                                                            </lord-icon></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )

                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
