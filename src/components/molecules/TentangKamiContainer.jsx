import React from 'react';
import DataCard from '../data/DataCardProfile'

const Cards = (props) => {
  return (
    <div className="bg-white w-full p-10 rounded-xl text-justify shadow-2xl border-solid border-2 max-w-[90vw] md:mx-2 mb-1 md:mb-0">
      <h3 className="font-bold text-2xl mb-4">{props.title}</h3>
      <ul>
        <li>{props.content}</li>
      </ul>
    </div>
  )
}

const Pcards = (props) => {
  return (
    <div className="w-full self-center px-auto lg:px-4 lg:w-1/2">
      <h1 className="block font-bold text-dark text-2xl md:text-4xl mt-24 lg:mt-10 mb-5 lg:text-5xl">{props.title} </h1>
      <h2 className="font-medium text-slate-700 text-justify text-sm md:text-md lg:mb-5 lg:text-2xl">{props.content}</h2>
    </div>
  )
}

const ImgCards = (props) => {
  return (
    <div className=" lg:my-20 mx-auto w-full self-end lg:w-1/2">
      <div className="relative lg:mt-10 lg:right-0">
        <img src={props.img} alt="ini foto saya.jpg" className="max-w-full mx-auto md:w-1/2 " />
      </div>
    </div>
  )
}

const TentangKami = () => {

  return (
    <div>
      {/* bagian 1 */}
      <div className='bg-white'>
        <div className="flex flex-wrap lg:my-10 mx-4 lg:mx-10">
          <Pcards {...DataCard[5]} />
          <ImgCards {...DataCard[5]} />
        </div>
      </div>

      {/* bagian 2 */}
      <div className='bg-white'>
        <div className="flex flex-wrap lg:my-10 my-10 mx-4 lg:mx-10">
          <ImgCards {...DataCard[3]} />
          <Pcards {...DataCard[3]} />
        </div>
      </div>

      {/* bagian 3 */}
      <div className="flex flex-col md:flex-row lg:my-5 mx-auto justify-around items-center pt-8">
        {/* {DataCard.map((card,index) => (<Cards key = {index}{...card}/>))} */}
        <Cards {...DataCard[0]} />
        <Cards {...DataCard[1]} />
        <Cards {...DataCard[2]} />
      </div>

      {/* bagian 4 */}
      <div className='bg-white'>
        <div className="flex flex-wrap my-20 mx-10">
          <Pcards {...DataCard[4]} />
          <ImgCards {...DataCard[4]} />
        </div>
      </div>

    </div>
  );
}

export default TentangKami;
