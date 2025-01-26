import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import PropTypes from 'prop-types';

export default function Pagination({pageNumber,setPageNumber,totalItem,perPage,showItem}) {
  let totalPage=Math.ceil(totalItem/perPage)
  let startPage=pageNumber

  let dif=totalPage-pageNumber
  if(dif<=showItem){
    startPage=totalPage-showItem
  }
  
  Pagination.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    setPageNumber: PropTypes.func.isRequired,
    totalItem: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    showItem: PropTypes.number.isRequired,
  };
  
  let endPage=startPage<0?showItem:showItem+startPage;

  if(startPage<=0){
    startPage=1
  }

  const createBtn=()=>{
    const btns=[]
    for(let i=startPage;i<endPage;i++){
        btns.push(
            <li onClick={()=>setPageNumber(i)} className={`${pageNumber===i ? 'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white':'bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'} w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}>
                {i}
            </li>
        )
    }
    return btns;
  }
  return(
    <ul className="flex gap-3 ">
        {
            pageNumber>1 && <li onClick={()=>setPageNumber(pageNumber-1)} className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#0a0a0b] cursor-pointer">
                <MdOutlineKeyboardDoubleArrowLeft/>
            </li>
        }
        {
            createBtn()
        }
        {
            pageNumber<totalPage && <li onClick={()=>setPageNumber(pageNumber+1)} className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#0a0a0b] cursor-pointer">
                <MdOutlineKeyboardDoubleArrowRight/>
            </li>
        }
    </ul>
  )
}
