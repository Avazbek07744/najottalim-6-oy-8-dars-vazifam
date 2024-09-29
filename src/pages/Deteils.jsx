import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Deteils = () => {
    const [product, setproduct] = useState({})
    const params = useParams()
    useEffect(() => {
        fetch(`https://strapi-store-server.onrender.com/api/products/${params.id}`)
            .then((respons) => respons.json())
            .then((data) => setproduct(data.data))
            .catch((err) => console.log(err))

    }, [])
    return (
        <div>
            {
                product.attributes && <div className='p-5 border border-blue-500 rounded-md w-max text-center m-auto mt-10'>
                        <img className='w-[300px] rounded-md ' src={product.attributes.image} alt="" />
                        <h2 className='mb-1 mt-3 capitalize font-semibold text-blue-500'>{product.attributes.title}</h2>
                        <p className='text-blue-400 text-lg'>{product.attributes.price}</p>
                </div>
            }
        </div>
    )
}

export default Deteils
