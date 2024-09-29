import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    useEffect(function () {
        fetch('https://strapi-store-server.onrender.com/api/products')
            .then((respons) => respons.json())
            .then((data) => setUser(data.data))
            .catch((err) => console.log(err))

    }, [])

    function hendelClic(id){
        navigate(`/products/${id}`)
    }
    return (
        <div>
            <div className="container mx-auto p-10">
                <div className="wrapper flex flex-wrap gap-5 justify-center">
                    {
                        user.length > 0 && user.map((user)=> {
                            return(
                                <div onClick={(e)=>{hendelClic(user.id)}} key={user.id} className='w-[400px] rounded-md p-5 cursor-pointer text-center shadow-xl shadow-blue-500 hov'>
                                    <img className='w-full h-60 object-cover rounded-md' src={user.attributes.image} alt="" />
                                    <h3 className='mb-2 capitalize font-semibold text-xl text-blue-600'>{user.attributes.title}</h3>
                                    <h3 className='text-lg text-blue-400'>{user.attributes.price}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
