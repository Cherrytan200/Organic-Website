
export default function SellerToAdmin() {
    return (
      <div className="px-2 lg:px-7 py-5">
          <div className="w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
              <div className="flex w-full h-full relative">
  
                  <div className="w-full  md:pl-4">
                      <div className="flex justify-between items-center">
                          
                          <div className="flex justify-start items-center gap-3">
                              <div className="relative">
                                  <img className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full" src="/Images/Profiles/seller.png" alt=""/>
                                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0">
  
                                  </div>
                  
                              </div>
                              <h2 className="text-base text-white font-semibold">Support</h2>
                          </div>
                          
                      </div>
  
                      <div className="py-4">
                          <div className="bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                              <div className="w-full flex justify-start items-center">
                                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                      <div>
                                          <img src="/Images/Profiles/seller.png" alt="" className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"/>
                                      </div>
                                      <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm ">
                                          <span>How are you?</span>
                                      </div>
                                  </div>
                              </div>
  
  
                              <div className="w-full flex justify-end items-center">
                                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                      
                                      <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/40 text-white py-1 px-2 rounded-sm ">
                                          <span>How are you?</span>
                                      </div>
                                      <div>
                                          <img src="/Images/Profiles/admin.jpeg" alt="" className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"/>
                                      </div>
                                  </div>
                              </div>
  
                              <div className="w-full flex justify-start items-center">
                                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                      <div>
                                          <img src="/Images/Profiles/seller.png" alt="" className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"/>
                                      </div>
                                      <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/40 text-white py-1 px-2 rounded-sm ">
                                          <span>I Need some help</span>
                                      </div>
                                      
                                  </div>
                              </div>
                      
                          </div>
                      </div>
  
                      <form className="flex gap-3">
                          <input className="w-full flex justify-between items-center  border px-2 border-slate-700 py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]" type="text" placeholder="Input Your Message"/>
                          <button className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex  justify-center items-center">Send</button>
                      </form>
  
                  </div>
  
  
              </div>
          </div>
      </div>
    )
  }
  