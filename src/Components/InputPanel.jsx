import { Editor } from '@monaco-editor/react'
import ErrorInput from './ErrorInput'
import { useContext,} from 'react'
import { Context } from '../Context/Context'
import assets from '../assets/assets'

const InputPanel = () => {

const {selectlang, setSelectlang, handleeditorchange_input, code, newSession} = useContext(Context)

    return (
    <div className='w-full h-full flex flex-col'>
        <div className='flex flex-wrap justify-between gap-2 items-center bg-(--primary-color) px-2 md:px-3 lg:px-4 border border-(--outline) w-full py-2 shrink-0'>

            <select value={selectlang} onChange={(e)=>{setSelectlang(e.target.value)}}
            name="language" id="language" className='bg-(--secondary-color) text-(--text-color) text-xs md:text-sm border-2 border-(--outline) px-2 md:px-3 py-1.5 rounded-sm outline-0 cursor-pointer'>
                <option value="">Select Language</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
            </select>

            <button onClick={newSession}
            className='flex flex-row items-center justify-between bg-(--secondary-color) text-(--text-color) text-xs md:text-sm border-2 border-(--outline) px-2 md:px-3 py-1.5 rounded-sm outline-0 cursor-pointer gap-1.5 hover:bg-opacity-80 transition'>
                <img src={assets.New_session} alt='' className='w-3.5 h-3.5 md:w-4 md:h-4'/> 
                <span className='hidden sm:inline'>New Session</span>
                <span className='sm:hidden'>New</span>
            </button>
        </div>

        <div className='h-[60vh] border border-(--outline) mt-1'>
            <Editor 
                value={code || "// Paste your code here..."}
                onChange={handleeditorchange_input}
                height="100%"
                language={selectlang}
                theme="vs-dark"
                defaultValue="// Paste your code here..."
            />
        </div> 
        <div className='shrink-0'>
            <ErrorInput />
        </div>
    </div>
    )
}

export default InputPanel