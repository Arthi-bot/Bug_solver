import { useContext } from "react"
import assets from "../assets/assets"
import { Context } from "../Context/Context"
import { Editor } from '@monaco-editor/react'

const OutputPanel = () => {

  const { selectlang, handleeditorchange_output, fixedCode, handleCopy, copyimg, output, runCode, runLoading } = useContext(Context)

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex flex-wrap justify-end gap-2 items-center bg-(--primary-color) px-2 md:px-3 lg:px-4 border border-(--outline) w-full py-2 shrink-0'>
        <button onClick={runCode} className='flex flex-row items-center justify-between bg-(--secondary-color) text-(--text-color) text-xs md:text-sm border-2 border-(--outline) px-2 md:px-3 py-1.5 rounded-sm outline-0 cursor-pointer gap-1.5 hover:bg-opacity-80 transition'>
            <img src={runLoading ? assets.Pause : assets.Play} alt='' className='w-3.5 h-3.5 md:w-4 md:h-4'/> 
            <span className='hidden sm:inline'>Run Code</span>
            <span className='sm:hidden'>Run</span>
        </button>
        <button onClick={handleCopy}
        className='flex flex-row items-center justify-between bg-(--secondary-color) text-(--text-color) text-xs md:text-sm border-2 border-(--outline) px-2 md:px-3 py-1.5 rounded-sm outline-0 cursor-pointer gap-1.5 hover:bg-opacity-80 transition'>
                <img src={copyimg} alt='' className='w-3.5 h-3.5 md:w-4 md:h-4 transition-all'/> 
                <span className='hidden sm:inline'>Copy Code</span>
                <span className='sm:hidden'>Copy</span>
            </button>
      </div>
      <div className='h-[60vh] border border-(--outline) mt-1 '>
          <Editor 
              value={fixedCode || "// Fixed code will appear here..."}
              onChange={handleeditorchange_output}
              height="100%"
              language={selectlang}
              theme="vs-dark"
              defaultValue="// Fixed code will appear here..."
          />
      </div>
      <div className='output-scroll overflow-auto bg-(--primary-color) h-[22vh] border border-(--outline) w-full px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 mt-1 text-sm md:text-base'>
          <pre className='p-3 text-(--text-color) text-sm bg-(--bg-color)'>
              {output || "Output will appear here..."}
          </pre>
      </div>

    </div>
  )
}

export default OutputPanel