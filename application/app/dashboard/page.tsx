import {  FaJarWheat, FaTrash } from 'react-icons/fa6';

function Card({props} : {props : {title : string, value : number, icon? : any}}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm h-[160px]">
      <div className="flex p-4 justify-center items-center">
        {props?.icon}
        {/* <FaJarWheat /> */}
        <h3 className="ml-2 text-sm font-medium">{props.title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {props.value}
      </p>
  </div>
  )
}


const items = [
  {
    title : "my applicants",
    value : 10,
    icon : <BiSolidShoppingBagAlt />
  },
  {
    title : "my offers",
    value : 100,
    icon : <TiThListOutline />
  },
  {
    title : "jobs accepted",
    value : 10,
    icon : <IoMdCheckmarkCircleOutline />
  },
  {
    title : "jobs rejected",
    value : 0,
    icon : <AiOutlineClose />
  },
]

function Status() {
  return (
    <ul className="grid grid-cols-4 gap-4 w-full mt-10">
      {items.map((i, index) => <li key={index} className="w-full h-[160px]">
          <Card props={i} />
      </li>)}
    </ul>
  )
}

import React from "react";
import Applicants from './Applicants';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BiSolidShoppingBagAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { TiThListOutline } from 'react-icons/ti';
export default  function Page() {


  return (
    <div className="w-full">
        <div className="h-[100px] flex items-center px-10 border-b-1 border-black/10">
            <h1 className="uppercase text-2xl font-bold">Home</h1>
        </div>
        <div className="w-full">
          <Status />
        </div>
        <div className='mt-10'>
          <h1 className='capitalize'>recent application history :</h1>
          <div className='mt-4'>
            <Applicants />
          </div>
        </div>
    </div>  
  );
}