import React from 'react'
import Navigation from '../components/Navigation'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <div className='flex justify-center w-full mt-12'>
            <div className='w-9/12 bg-[#e9fcff]'>
                <div className='flex justify-between'>
                    <div className='mt-4 ml-6 text-3xl cursor-default self-left text-main-blue'>My super movie blog</div>
                    <Navigation/>
                </div>
                <div className='border-gray-400 mt-2 h-[1px] border'/>
                <div className='flex justify-center'>
                    <div className='w-10/12 mt-6'>
                        <div className='flex flex-col space-x-4 space-y-4'>
                            <span className='pl-4 text-lg font-bold uppercase border-l-4 border-blue-500'>About this blog</span>
                            <span>This blog site is a project made for the Web Technologies module of Griffith College.</span>
                            <span>The article are about movies and the datas are all taken from <Link className='text-blue-500 underline underline-offset-2' to='https://www.rottentomatoes.com/'>Rotten Tomatoes</Link>.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs