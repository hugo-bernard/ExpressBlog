import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const MovieOverview = ({x}) => {
    const params = new URLSearchParams({
        myParam: JSON.stringify(x),
    });

    return (
        <div className='flex w-full bg-blue-100 border-2 rounded-sm h-1/4 border-slate-300' key={x._id}>
            <div className="w-3/12 bg-gray-300"></div>
            <div className='flex flex-col w-9/12 h-full ml-2 space-y-4'>
                <div className=''>
                    <div className='text-xl font-medium'>{x.title}</div>
                </div>
                <div className=''>{x.critics}</div>
                <div className='flex space-x-60'>
                    <div className='flex space-x-2'>
                        <div className='font-bold'>Rating:</div>
                        <span>{x.rating ? x.rating : "N/A"}</span>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='font-bold'>Genre:</div>
                        <div className='flex space-x-2'>
                            {x.genre.map((x, key) => {
                                return ( <span key={key}>{x} </span> )
                            })}
                        </div>
                    </div>
                </div>
                <Link className={`px-2 py-1 m-auto w-10/12 font-sans font-semibold text-center bg-blue-400 rounded-sm shadow-sm shadow-main-blue 
                    hover:bg-gradient-to-l hover:cursor-pointer hover:from-[#B2FEFA] hover:to-[#0ED2F7] hover:scale-110`}
                    to={`/article?${params.toString()}`}>Details</Link>
            </div>
        </div>
    )
}

export const Dashboard = () => {
    let location = useLocation()
    const [lastTen, setLastTen] = useState([])

    const getLastTen = async () => {
        var config = {
            method: 'get',
            url: 'https://render-express-blog.onrender.com/api/getTen',
            headers: { 
                'Content-Type': 'application/json'
            }
        };
        axios(config)
        .then(function (response) {
            setLastTen(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        getLastTen()
    }, [location])

    return (
        <div className='flex justify-center w-full mt-12'>
            <div className='w-9/12 bg-[#e9fcff]'>
                <div className='flex justify-between'>
                    <div className='mt-4 ml-6 text-3xl cursor-default self-left text-main-blue'>My super movie blog</div>
                    <Navigation/>
                </div>
                <div className='border-gray-400 mt-2 h-[1px] border'/>
                <div className='flex flex-col w-11/12 pb-6 mx-auto mt-6 space-y-4'>
                    <span className='pl-4 text-lg font-bold uppercase border-l-4 border-blue-500'>Introduction</span>
                    <span className='ml-4 font-medium'>Hello and welcome to this super movie Blog. Find all about the latest movies going on live out there, with opinions from expert and audience</span>
                    <span className='pl-4 text-lg font-bold uppercase border-l-4 border-blue-500'>Latest Articles</span>
                    {lastTen.length !== 0 && lastTen.map((x) => {
                        return (<MovieOverview key={x._id} x={x}></MovieOverview>)})}
                </div>
            </div>
        </div>
    )
}