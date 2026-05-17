import { useContext } from 'react'
import assets from '../assets/assets'
import { Context } from '../Context/Context'

const ErrorInput = () => {

  const {handlefixbug, errorinput, setErrorinput,  feedback, loading} = useContext(Context)
  
  return (
    <div className='bg-(--primary-color) border border-(--outline) w-full h-[22vh] px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 mt-1 text-sm md:text-base'>
        <div>
            <input value={errorinput} onChange={(e)=>{setErrorinput(e.target.value)}}
            type="text" placeholder="Paste your error here..." className='border border-(--outline) outline-0 bg-(--bg-color) text-(--text-color) placeholder:text-(--text-color) px-2 md:px-3 py-1.5 md:py-2 w-full rounded-sm text-sm'/>
        </div>

        <div className='mt-2 flex flex-wrap gap-2'>
            <button onClick={handlefixbug} disabled={loading} className='flex items-center gap-1.5 md:gap-2 bg-[#b4432f] text-(--text-color) px-3 md:px-4 py-1 md:py-1.5 rounded-sm outline-0 cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:bg-[#c5513a] active:bg-[#eb5f47] active:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-md'>
              <img src={assets.Bold_right_arrow} alt="" className='w-4 md:w-5'/><span>{loading ? "Processing..." : "Fix Bug"}</span>
            </button>
        </div>

        {
          feedback? 
          <div className='mt-2 md:mt-4 text-start text-lg md:text-sm wrap-break-word'>
         <p className={feedback === "Bug fixed successfully!" ? "text-green-500" : "text-red-500"}>** {feedback} **</p>
        </div>  : null
        }
    </div>
  )
}

export default ErrorInput