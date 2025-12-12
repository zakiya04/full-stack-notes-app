import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { TbPinnedFilled } from "react-icons/tb";
import { FaEllipsisH } from "react-icons/fa";

const Note = () => {
  const[open,setOpen] = useState<boolean>(false)

  return (
    <div className="bg-yellow-400  h-80 w-[300px] px-4 py-5 rounded-3xl">
      <input placeholder="What do i need to do?" className="placeholder: text-black font-bold focus:outline-none bg-transparent w-full"/>
      <textarea className="placeholder: text-black h-[70%] w-full focus:outline-none resize-none" placeholder="Time to take some notes!"></textarea>
      <div className="flex items-center justify-between ">
        <div>11/12/2025</div>
        <div className="bg-white relative rounded-full h-12 w-12 cursor-pointer hover:bg-zinc-100 flex items-center justify-center text-black" onClick={()=> setOpen(!open)}>
          <FaEllipsisH className="h-6 w-6 text-zinc-600"/>
          {open && (
            <div className="absolute bottom-full mb-2 flex flex-col gap-2 bg-white/30 backdrop-blur-md rounded-lg p-2">
             <button className="bg-white rounded-full h-12 w-12 flex items-center justify-center"><MdDelete className="h-6 w-6 text-zinc-600"/></button>
             <button className="bg-white rounded-full h-12 w-12 flex items-center justify-center"><TbPinnedFilled className="h-6 w-6 text-zinc-600"/></button>
            </div> 
          )}
        </div>
      </div>
    </div>
  )
}

export default Note
