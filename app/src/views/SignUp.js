import React, { useState } from 'react'
import axios from 'axios'

export const SignUp = ({title}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    async function signup() {
        var data = JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "isAdmin": false
        });
        var config = {
            method: 'post',
            url: 'https://render-express-blog.onrender.com/api/signup',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            console.log(response.data)
            sessionStorage.setItem("userToken", JSON.stringify(response.data.token));
            window.location.assign('/dashboard');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='mt-4 ml-6 text-4xl cursor-default self-left text-main-blue'>My super movie blog</div>
            <div className={"flex flex-col justify-center w-3/12 m-auto p-8 shadow-md font-serif rounded-sm shadow-main-blue bg-[#e9fcff]"}>
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
                        <div className={`w-1/2 p-2 m-auto font-sans font-semibold text-center bg-blue-400 rounded-sm shadow-sm shadow-main-blue 
                            hover:bg-gradient-to-l hover:cursor-pointer hover:from-[#B2FEFA] hover:to-[#0ED2F7] hover:scale-110`}
                            onClick={signup}>Register</div>
                    </div>
                </div>
                <span className='w-full mt-4 text-center text-blue-500 cursor-pointer' onClick={() => window.location.assign('/login')}>Login</span>
            </div>
        </div>
    )
}