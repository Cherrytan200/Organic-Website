import PropTypes from 'prop-types'

export default function Search({setPerPage,setSearchValue,searchValue}) {
  return (
    <div className="flex justify-between items-center">
        <select onChange={(e)=>setPerPage(parseInt(e.target.value))} className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#d0d2d6]">
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
        </select>
        <input onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} type="text" placeholder="search" className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]"/>
    </div>
)}

Search.propTypes = {
  setPerPage: PropTypes.func.isRequired,
  setSearchValue:PropTypes.func.isRequired,
  searchValue:PropTypes.string.isRequired
}

