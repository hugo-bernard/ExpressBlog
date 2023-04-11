import React, { useEffect, useMemo, useState } from 'react'
import Navigation from '../components/Navigation'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

export const Article = () => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const myObject = JSON.parse(searchParams.get('myParam'));
    const [isAdmin, setIsAdmin] = useState(false)
    const [articleId, setArticleId] = useState("")
    const [error, setError] = useState(false)

    const eraseArticle = async () => {
        var config = {
            method: 'delete',
            url: 'http://localhost:3000/api/deleteArticle' + articleId,
            headers: { 
                'Content-Type': 'application/json'
            },
        };
        axios(config)
        .then(function (response) {
            console.log(response.data)
            window.location.assign('/dashboard')
        })
        .catch(function (error) {
            console.log(error);
            setError(true)
        });
    }

    useEffect(() => {
        const getUserFromToken = async () => {
            const token = sessionStorage.getItem('userToken');
            var config = {
                method: 'get',
                url: 'http://localhost:3000/api/getUser',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            };
            axios(config)
            .then(function (response) {
                setArticleId(myObject._id)
                setIsAdmin(response.data.isAdmin)
                console.log(articleId)
                console.log(isAdmin)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        getUserFromToken()
    }, [articleId, isAdmin, myObject])

    return (
        <div className='flex justify-center w-full mt-12'>
            <div className='w-9/12 bg-[#e9fcff]'>
                <div className='flex justify-between felx-col'>
                    <div className='mt-4 ml-6 text-3xl cursor-default self-left text-main-blue'>My super movie blog</div>
                    <Navigation/>
                </div>
                <div className='border-gray-400 mt-2 h-[1px] border'/>
                <div className='flex flex-col'>
                    <div className='flex flex-col items-center self-center w-6/12 py-6 mt-4 space-y-4 bg-blue-100 border-2 rounded-lg border-slate-300'>
                        <div className='flex flex-col space-y-1'>
                            <span className='text-2xl font-bold'>{myObject.title}</span>
                            <span className='flex justify-center'>{myObject.release}, {myObject.runtime}</span>
                        </div>
                        <div className='flex justify-between w-full px-6'>
                            <div className='flex space-x-2'>
                                <div className='font-medium uppercase'>Rating:</div>
                                <span>{myObject.rating ? myObject.rating : "N/A"}</span>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='font-medium uppercase'>Genre:</div>
                                <div className='flex space-x-2'>
                                    {myObject.genre.map((x, key) => {
                                        return ( <span key={key} className='underline decoration-gray-400 underline-offset-2 decoration-1'>{x} </span> )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='border-gray-400 border-dashed mt-2 w-11/12 h-[1px] border'/>
                        <div className='flex flex-col w-full pl-6 space-y-1'>
                            <div className='flex space-x-2'>
                                <div className='font-medium uppercase'>Director:</div>
                                <div className='flex space-x-2'>
                                    {myObject.director.map((x, key) => {
                                        return ( <span key={key} className='underline decoration-gray-400 underline-offset-2 decoration-1'>{x}. </span> )
                                    })}
                                </div>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='font-medium uppercase'>Producer:</div>
                                <div className='flex space-x-2'>
                                    {myObject.producer.map((x, key) => {
                                        return ( <span key={key} className='underline decoration-gray-400 underline-offset-2 decoration-1'>{x}. </span> )
                                    })}
                                </div>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='font-medium uppercase'>Writer:</div>
                                <div className='flex space-x-2'>
                                    {myObject.writer.map((x, key) => {
                                        return ( <span key={key} className='underline decoration-gray-400 underline-offset-2 decoration-1'>{x}. </span> )
                                    })}
                                </div>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='font-medium uppercase'>Distributor:</div>
                                <span className='underline decoration-gray-400 underline-offset-2 decoration-1'>{myObject.distributor}</span>
                            </div>
                        </div>
                    </div>
                    <div className='self-center w-8/12 mt-6 space-y-8'>
                        <div className='flex flex-col space-x-4 space-y-4'>
                            <span className='pl-4 text-lg font-bold uppercase border-l-4 border-blue-500'>Summary</span>
                            <span>{myObject.content}</span>
                        </div>
                        <div className='flex flex-col space-x-4 space-y-4'>
                            <span className='pl-4 text-lg font-bold uppercase border-l-4 border-blue-500'>What to know</span>
                            <div className='flex flex-col space-y-1'>
                                <span className='font-bold'>Critics Consensus</span>
                                <span>{myObject.critics}</span>
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <span className='font-bold'>Audience Says</span>
                                <span>{myObject.audience}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center w-full mb-6 space-y-4'>
                    {isAdmin ? <button className={`p-2 w-1/2 font-sans mt-6 self-center font-semibold text-center bg-red-500 rounded-sm shadow-sm shadow-main-blue 
                                hover:bg-gradient-to-l hover:cursor-pointer hover:from-red-300 hover:to-red-500 hover:scale-110`}
                                onClick={eraseArticle}>Erase Article</button> : null}
                    {error ? <span className='text-center text-red-500 text-medium'>An error occured for erasing article</span> : null}
                </div>
            </div>
        </div>
    )
}