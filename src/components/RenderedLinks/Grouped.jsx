import React from 'react'
import coming from "../../coming.png"
const Grouped = () => {
  return (
    <div className="bg-[#242425] bg-opacity-50 flex flex-col items-center justify-center py-[10px] mt-4 shadow-xl">
      <img src={coming} alt="" className="w-28 h-28 object-contain"/>
          <h2 className="text-white text-[28px] font-semibold pb-4">
            Coming Soon🙃...
          </h2>
          
        </div>
  )
}

export default Grouped