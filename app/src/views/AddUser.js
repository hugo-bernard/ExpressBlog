import React, { useState } from 'react'
import axios from 'axios'
import Navigation from '../components/Navigation'

export const AddUser = ({title}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [yesClicked, setYesClicked] = useState(false)
    const [noClicked, setNoClicked] = useState(false)
    
    async function signup() {
        var data = JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "isAdmin": yesClicked ? true : false
        });
        var config = {
            method: 'post',
            url: 'http://localhost:3000/api/signup',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            console.log(response.data)
            window.location.assign('/dashboard');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className='flex justify-center w-full mt-12'>
            <div className='w-9/12 bg-[#e9fcff]'>
                <div className='flex justify-between'>
                    <div className='mt-4 ml-6 text-3xl cursor-default self-left text-main-blue'>My super movie blog</div>
                    <Navigation/>
                </div>
                <div className='border-gray-400 mt-2 h-[1px] border'/>
                <div className='flex flex-col w-full mt-12'>
                    <div className={"flex flex-col justify-center w-3/12 m-auto p-8 shadow-md font-serif rounded-sm shadow-main-blue bg-blue-200"}>
                        <div className='self-center text-3xl cursor-default text-main-blue'>{title}</div>
                        <div className='mt-8 space-y-4'>
                            <div>
                                <div className="flex flex-col font-sans text-lg">
                                    <span className='ml-1 cursor-default'>Username</span>
                                    <input className='p-2 border-2 rounded-md shadow-sm border-slate-300 hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' placeholder={"username"} type={"text"}
                                    onChange={(event) => {setUsername(event.target.value);}}></input>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col font-sans text-lg">
                                    <span className='ml-1 cursor-default'>Email</span>
                                    <input className='p-2 border-2 rounded-md shadow-sm border-slate-300 hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' placeholder={"user.mail@mail.com"} type={"text"}
                                    onChange={(event) => {setEmail(event.target.value);}}></input>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col font-sans text-lg">
                                    <span className='ml-1 cursor-default'>Password</span>
                                    <input className='p-2 border-2 rounded-md shadow-sm border-slate-300 hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' placeholder={"password"} type={"password"}
                                    onChange={(event) => {setPassword(event.target.value);}}></input>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col font-sans text-lg">
                                    <span className='ml-1 cursor-default'>IsAdmin:</span>
                                    <div className='flex space-x-2'>
                                        <div className={`w-1/2 p-2 m-auto font-sans font-semibold text-center bg-blue-400 rounded-sm shadow-sm shadow-main-blue
                                        ${yesClicked ? 'shadow-inner bg-green-200 scale-95' : 'hover:bg-gradient-to-l hover:cursor-pointer hover:from-[#B2FEFA] hover:to-[#0ED2F7] hover:scale-110'}`}
                                        onClick={() => {
                                            setYesClicked(true)
                                            setNoClicked(false)
                                            }}>
                                            Yes
                                        </div>
                                        <div className={`w-1/2 p-2 m-auto font-sans font-semibold text-center bg-blue-400 rounded-sm shadow-sm shadow-main-blue ${noClicked ? 'shadow-inner bg-green-200 scale-95' : 'hover:bg-gradient-to-l hover:cursor-pointer hover:from-[#B2FEFA] hover:to-[#0ED2F7] hover:scale-110'}`}
                                        onClick={() => {
                                            setYesClicked(false)
                                            setNoClicked(true)
                                            }}>
                                            No
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>    
                                <div className={`w-1/2 p-2 m-auto font-sans font-semibold text-center bg-blue-400 rounded-sm shadow-sm shadow-main-blue 
                                    hover:bg-gradient-to-l hover:cursor-pointer hover:from-[#B2FEFA] hover:to-[#0ED2F7] hover:scale-110`}
                                    onClick={signup}>Create user</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}