import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Add = () => {
    let location = useLocation()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [critics, setCritics] = useState("");
    const [audience, setAudience] = useState("");
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState([]);
    const [director, setDirector] = useState([]);
    const [producer, setProducer] = useState([]);
    const [writer, setWriter] = useState([]);
    const [release, setRelease] = useState("");
    const [runtime, setRuntime] = useState("");
    const [distributor, setDistributor] = useState("");
    const [author, setAuthor] = useState("")

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
            setAuthor(response.data._id)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleBladeRunner = async () => {
        var data = JSON.stringify({
            title: "BLADE RUNNER",
            content: "Deckard (Harrison Ford) is forced by the police Boss (M. Emmet Walsh) to continue his old job as Replicant Hunter. His assignment: eliminate four escaped Replicants from the colonies who have returned to Earth. Before starting the job, Deckard goes to the Tyrell Corporation and he meets Rachel (Sean Young), a Replicant girl he falls in love with.",
            author: author,
            critics: "Misunderstood when it first hit theaters, the influence of Ridley Scott's mysterious, neo-noir Blade Runner has deepened with time. A visually remarkable, achingly human sci-fi masterpiece.",
            audience: "classic one of my favorite films. way better than blade runner 2049 ruger hauer and harrison ford are great. great setting look and plot great sci fi classic.",
            rating: "R",
            genre: "Sci-fi, Mystery & thriller",
            director: "Ridley Scott",
            producer: "Michael Deeley, Charles de Lauzirika",
            writer: "Hampton Fancher, David Webb Peoples, Philip K. Dick",
            release: "Jun 25, 1982",
            runtime: "2h 2m",
            distributor: "Warner Bros",
        })
        console.log(data)
        var config = {
            method: 'post',
            url: 'http://localhost:3000/api/postArticle',
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
        .then(function (response) {
            console.log(response.data)
            window.location.assign('/dashboard')
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault();

        var data = JSON.stringify({
            title: title,
            content: content,
            author: author,
            critics: critics,
            audience: audience,
            rating: rating,
            genre: genre,
            director: director,
            producer: producer,
            writer: writer,
            release: release,
            runtime: runtime,
            distributor: distributor,
        })
        console.log(data)
        var config = {
            method: 'post',
            url: 'http://localhost:3000/api/postArticle',
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
        .then(function (response) {
            console.log(response.data)
            window.location.assign('/dashboard')
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        getUserFromToken()
    }, [location])

    return (
        <div className='flex justify-center w-full mt-12'>
            <div className='w-9/12 bg-[#e9fcff]'>
                <div className='flex justify-between'>
                    <div className='mt-4 ml-6 text-3xl cursor-default self-left text-main-blue'>My super movie blog</div>
                    <Navigation/>
                </div>
                <div className='border-gray-400 mt-2 h-[1px] border'/>
                <form className="max-w-4xl mx-auto my-4" onSubmit={handleOnSubmit}>
                    <div className="flex flex-wrap mb-4 -mx-2">
                        <div className="w-full px-2">
                            <label htmlFor="title" className="block mb-1 font-bold">
                            Title:
                            </label>
                            <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: BLADE RUNNER'
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="content" className="block mb-1 font-bold">
                            Content:
                            </label>
                            <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={(e) => {setContent(e.target.value)}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder="Ex: Deckard (Harrison Ford) is forced by the police Boss (M. Emmet Walsh) to continue his old job as Replicant Hunter. His assignment: eliminate four escaped Replicants from the colonies who have returned to Earth. Before starting the job, Deckard goes to the Tyrell Corporation and he meets Rachel (Sean Young), a Replicant girl he falls in love with."
                            ></textarea>
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="critics" className="block mb-1 font-bold">
                            Critics:
                            </label>
                            <textarea
                            type="text"
                            id="critics"
                            name="critics"
                            value={critics}
                            onChange={(e) => {setCritics(e.target.value)}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder="Ex: Misunderstood when it first hit theaters, the influence of Ridley Scott's mysterious, neo-noir Blade Runner has deepened with time. A visually remarkable, achingly human sci-fi masterpiece."
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="audience" className="block mb-1 font-bold">
                            Audience:
                            </label>
                            <textarea
                            type="text"
                            id="audience"
                            name="audience"
                            value={audience}
                            onChange={(e) => {setAudience(e.target.value)}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: classic one of my favorite films. way better than blade runner 2049 ruger hauer and harrison ford are great. great setting look and plot great sci fi classic.'
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="rating" className="block mb-1 font-bold">
                            Rating:
                            </label>
                            <input
                            type="text"
                            id="rating"
                            name="rating"
                            value={rating}
                            onChange={(e) => {setRating(e.target.value)}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: R'
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="genres" className="block mb-1 font-bold">
                            Genres:
                            </label>
                            <input
                            type="text"
                            id="genres"
                            name="genres"
                            value={genre}
                            onChange={(e) => {setGenre(e.target.value.split(','))}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder="Ex: Sci-fi, Mystery & thriller (if multiple genre, separate by comas)"
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="directors" className="block mb-1 font-bold">
                            Directors:
                            </label>
                            <input
                            type="text"
                            id="directors"
                            name="directors"
                            value={director}
                            onChange={(e) => {setDirector(e.target.value.split(','))}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: Ridley Scott (if multiple names, separate by comas)'
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="directors" className="block mb-1 font-bold">
                            Producer:
                            </label>
                            <input
                            type="text"
                            id="producer"
                            name="producer"
                            value={producer}
                            onChange={(e) => {setProducer(e.target.value.split(','))}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: Michael Deeley, Charles de Lauzirika (names should be separated by comas)'
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="directors" className="block mb-1 font-bold">
                            Writer:
                            </label>
                            <input
                            type="text"
                            id="writer"
                            name="writer"
                            value={writer}
                            onChange={(e) => {setWriter(e.target.value.split(','))}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: Hampton Fancher, David Webb Peoples, Philip K. Dick (names should be separated by comas)'
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="rating" className="block mb-1 font-bold">
                            Release:
                            </label>
                            <input
                            type="text"
                            id="release"
                            name="release"
                            value={release}
                            onChange={(e) => {setRelease(e.target.value)}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: Jun 25, 1982'
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="rating" className="block mb-1 font-bold">
                            Runtime:
                            </label>
                            <input
                            type="text"
                            id="runtime"
                            name="runtime"
                            value={runtime}
                            onChange={(e) => {setRuntime(e.target.value)}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: 2h 2m'
                            />
                        </div>
                        <div className="w-full px-2">
                            <label htmlFor="rating" className="block mb-1 font-bold">
                            Distributor:
                            </label>
                            <input
                            type="text"
                            id="distributor"
                            name="distributor"
                            value={distributor}
                            onChange={(e) => {setDistributor(e.target.value)}}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
                            placeholder='Ex: Warner Bros'
                            />
                        </div>
                        <button className={`w-1/2 p-2 m-auto font-sans mt-6 font-semibold text-center bg-blue-400 rounded-sm shadow-sm shadow-main-blue 
                            hover:bg-gradient-to-l hover:cursor-pointer hover:from-[#B2FEFA] hover:to-[#0ED2F7] hover:scale-110`}>Create</button>
                    </div>
                </form>
                <div className='flex justify-center w-full mb-6'>
                    <button className={`p-2 w-1/2 font-sans mt-6 font-semibold text-center bg-blue-400 rounded-sm shadow-sm shadow-main-blue 
                                hover:bg-gradient-to-l hover:cursor-pointer hover:from-[#B2FEFA] hover:to-[#0ED2F7] hover:scale-110`}
                                onClick={handleBladeRunner}>Create with template of "Blade Runner"</button>
                </div>
            </div>
        </div>
    )
}

export default Add