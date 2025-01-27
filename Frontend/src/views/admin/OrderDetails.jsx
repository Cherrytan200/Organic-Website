import React from 'react'

export default function OrderDetails() {
  return (
    <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            <div className='flex justify-between items-center p-4'>
                <h2 className='text-xl text-[#d0d2d6]'>Order Details</h2>
                <select name="" id='' className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]'>
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="warehouse">warehouse</option>
                    <option value="placed">placed</option>
                    <option value="cancel">cancelled</option>
                </select>
            </div>

            <div className='p-4'>
                <div className='flex gap-2 text-lg text-[#d0d2d6]'>
                    <h2>#34344</h2>
                    <span>26 jan 2025</span>
                </div>

                <div className='flex flex-wrap'>
                    <div className='w-[30%]'>
                        <div className='pr-3 text-[#d0d2d6] text-lg'>
                            <div className='flex flex-col gap-1'>
                                <h2 className='pb-2 font-semibold'>Deliver To : Sekhar</h2>
                                <p>
                                    <span className='text-sm'>
                                        12-14/13,<br/>
                                        near venkayapalli,<br/>
                                        kurnool,<br/>    
                                        Andhra Pradesh.
                                    </span>
                                </p>
                                
                            </div>
                            <div className='flex justify-start items-center gap-3'>
                                <h2>Payment Status :</h2>
                                <span className='text-base'>Paid</span>
                            </div>

                            <span>
                                Price : &#8377;5672
                            </span>


                            <div className='mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md'>
                                <div className='text-[#d0d2d6]'>
                                    <div className='flex gap-3 text-md'>
                                        <img className='w-[65px] h-[85px]' src='../../../../public/Images/Category/1.jpeg' alt='Image'/>
                                        <div>
                                            <h2> Name : Apple</h2>
                                            <p>
                                                <span>
                                                    Price : &#8377;120
                                                </span>
                                                <br/>
                                                <span className='text-lg'>
                                                    Quantity : 2kg
                                                </span>
                                                

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md'>
                                <div className='text-[#d0d2d6]'>
                                    <div className='flex gap-3 text-md'>
                                        <img className='w-[65px] h-[85px]' src='../../../../public/Images/Category/1.jpeg' alt='Image'/>
                                        <div>
                                            <h2> Name : Apple</h2>
                                            <p>
                                                <span>
                                                    Price : &#8377;120
                                                </span>
                                                <br/>
                                                <span className='text-lg'>
                                                    Quantity : 2kg
                                                </span>
                                                

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md'>
                                <div className='text-[#d0d2d6]'>
                                    <div className='flex gap-3 text-md'>
                                        <img className='w-[65px] h-[85px]' src='../../../../public/Images/Category/1.jpeg' alt='Image'/>
                                        <div>
                                            <h2> Name : Apple</h2>
                                            <p>
                                                <span>
                                                    Price : &#8377;120
                                                </span>
                                                <br/>
                                                <span className='text-lg'>
                                                    Quantity : 2kg
                                                </span>
                                                

                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>


                    <div className='w-[70%]'>
                        <div className='pl-3'>
                            <div className='mt-4 flex flex-col bg-[#8288ed] rounded-md p-4'>

                                <div className='text-[#d0d2d6] mt-2'>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h2>Seller 1 Order : </h2>
                                        <span>Pending</span>
                                    </div> 
                                    <div>
                                        <div className='flex gap-3 text-md mt-2'>
                                            <img className='w-[65px] h-[85px]' src='/Images/Category/1.jpeg' alt='Image'/>
                                            <div>
                                                <h2> Name : Apple</h2>
                                                <p>
                                                    <span>
                                                        Price : &#8377;120
                                                    </span>
                                                    <br/>
                                                    <span className='text-lg'>
                                                        Quantity : 2kg
                                                    </span>
                                                    

                                                </p>
                                            </div>
                                        </div>
                                    </div> 
                                </div>

                                <div className='text-[#d0d2d6] mt-2'>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h2>Seller 1 Order : </h2>
                                        <span>Pending</span>
                                    </div> 
                                    <div>
                                        <div className='flex gap-3 text-md mt-2'>
                                            <img className='w-[65px] h-[85px]' src='/Images/Category/1.jpeg' alt='Image'/>
                                            <div>
                                                <h2> Name : Apple</h2>
                                                <p>
                                                    <span>
                                                        Price : &#8377;120
                                                    </span>
                                                    <br/>
                                                    <span className='text-lg'>
                                                        Quantity : 2kg
                                                    </span>
                                                    

                                                </p>
                                            </div>
                                        </div>
                                    </div> 
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
