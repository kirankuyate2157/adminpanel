const DashboardSkeleton = () => {
  return (
    <div className='w-full  mb-20 flex flex-col h-[100vh]'>
      <div className='flex max-w-full max-h-[300px] flex-col sm:flex-row px-4 my-2 gap-3'>
        <div
          className={`w-full bg-gray-300 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          <div className='h-3 m-4 w-[40%] bg-gray-400 rounded-md' />
          <div className='h-3 m-4 w-[30%] bg-gray-400 rounded-md' />
        </div>
        <div
          className={`w-full bg-gray-300 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          {" "}
          <div className='h-3 m-4 w-[40%] bg-gray-400 rounded-md' />
          <div className='h-3 m-4 w-[30%] bg-gray-400 rounded-md' />
        </div>
      </div>
      <div className='flex max-w-full h-full flex-col lg:flex-row px-4 my-2 gap-3'>
        <div
          className={`w-full bg-gray-300 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          {" "}
          <div className='h-3 m-4 w-[40%] bg-gray-400 rounded-md' />
          <div className='h-3 m-4 w-[30%] bg-gray-400 rounded-md' />
        </div>
        <div
          className={`w-full bg-gray-300 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          {" "}
          <div className='h-3 m-4 w-[40%] bg-gray-400 rounded-md' />
          <div className='h-3 m-4 w-[30%] bg-gray-400 rounded-md' />
        </div>
        <div
          className={`w-full bg-gray-300 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          {" "}
          <div className='h-3 m-4 w-[40%] bg-gray-400 rounded-md' />
          <div className='h-3 m-4 w-[30%] bg-gray-400 rounded-md' />
        </div>
      </div>
      <div className='flex max-w-full flex-col lg:flex-row px-4 py-2 gap-3'>
        <div
          className={`w-full lg:w-[60%] bg-gray-300 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          <div className='h-full w-full flex flex-col justify-between'>
            <div className='w-full h-[30%]'>
              <div className='h-3 m-4 w-[40%] bg-gray-400 rounded-md' />
              <div className='h-3 m-4 w-[30%] bg-gray-400 rounded-md' />
            </div>
            <div className='h-[70%] m-4 w-[95%] bg-gray-400/50  animate-pulse   rounded-md' />
          </div>
        </div>
        <div
          className={`w-full lg:w-[40%] bg-gray-300 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          <div className='h-full w-full flex flex-col justify-between'>
            <div className='w-full h-[30%]'>
              <div className='h-3 m-4 w-[40%] bg-gray-400 rounded-md' />
              <div className='h-3 m-4 w-[30%] bg-gray-400 rounded-md' />
            </div>
            <div className='h-[70%] m-4 w-[95%] bg-gray-400/50  animate-pulse   rounded-md' />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardSkeleton;
