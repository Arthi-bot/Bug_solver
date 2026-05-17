import Navbar from './Components/Navbar'
import InputPanel from './Components/InputPanel'
import OutputPanel from './Components/OutputPanel'

const App = () => {
  return (
    <div className='no-scrollbar flex flex-col bg-(--bg-color) '>
        <Navbar />
        <div className='flex-1 flex flex-col lg:flex-row gap-1 p-1'>
          <div className='w-full lg:w-1/2 flex flex-col h-full'>
                <InputPanel />
            </div>
          <div className='w-full lg:w-1/2 flex flex-col h-full'>
                <OutputPanel />
            </div>
        </div>  
    </div>
  )
}

export default App