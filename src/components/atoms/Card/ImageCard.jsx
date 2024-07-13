import React from 'react'

const ImageCard = ({item}) => {
  return (
    <div className='flex justify-center p-10'>
      <div className='flex flex-wrap justify-around gap-10'>
        {item.map((val) => (
            <div className='p-2 h-52 bg-white rounded-lg shadow-2xl hover:scale-105'>
                <img src={val.img1} alt='image container' className='h-40 w-32 object-cover object-center rounded-lg'/>
                <p>{val.name}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ImageCard
