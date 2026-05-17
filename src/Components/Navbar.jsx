const Navbar = () => {
  return (
    <div className='w-full h-[8vh] flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 md:py-4 bg-(--primary-color) border-b border-(--outline) shrink-0'>
        <div>
            <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-(--text-color) font-bold'>Bug Solver</h1>
        </div>
    </div>
  )
}

export default Navbar