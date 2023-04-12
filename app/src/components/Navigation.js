import axios from "axios";
import React, { useEffect, useState } from "react";

const Navigation = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    const getUserFromToken = () => {
        const token = sessionStorage.getItem('userToken');
        var config = {
            method: 'get',
            url: 'https://render-express-blog.onrender.com/api/getUser',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };
        axios(config)
        .then(function (response) {
            setIsAdmin(response.data.isAdmin)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        getUserFromToken();
    }, [])

    return (
        <nav className="">
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a href="/dashboard" className="bg-blue-400 hover:bg-gradient-to-l hover:from-[#B2FEFA] hover:to-[#0ED2F7] hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                                >Home</a>
                                <a href="/all" className="hover:bg-gradient-to-l hover:from-[#B2FEFA] hover:to-[#0ED2F7] px-3 py-2 rounded-md text-sm font-medium"
                                >All</a>
                                <a href="/aboutus" className="hover:bg-gradient-to-l hover:from-[#B2FEFA] hover:to-[#0ED2F7] px-3 py-2 rounded-md text-sm font-medium"
                                >About Us</a>
                                <a href="/new" className="bg-blue-200 hover:bg-gradient-to-l hover:from-[#B2FEFA] hover:to-[#0ED2F7] px-3 py-2 rounded-md text-sm font-medium"
                                >Add Article</a>
                                {isAdmin ? <a href="/addUser" className="bg-blue-200 hover:bg-gradient-to-l hover:from-[#B2FEFA] hover:to-[#0ED2F7] px-3 py-2 rounded-md text-sm font-medium"
                                >Add User</a> : null}
                                <div className="pl-6 mt-1 font-bold text-center text-red-900 cursor-pointer hover:scale-125" onClick={() => {
                                    sessionStorage.removeItem("userToken");
                                    window.location.assign('/');
                                }}>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
