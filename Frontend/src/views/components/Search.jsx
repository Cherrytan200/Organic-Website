export default function Search({ setPerPage, setSearchValue, searchValue }) {
  return (
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Per Page Selector */}
          <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
              <select 
                  onChange={(e) => setPerPage(parseInt(e.target.value))} 
                  className="relative px-4 py-2 bg-white border border-gray-100 rounded-lg text-gray-600 focus:border-green-400 outline-none appearance-none cursor-pointer transition-all duration-300"
              >
                  <option value="5">5 Items</option>
                  <option value="10">10 Items</option>
                  <option value="15">15 Items</option>
                  <option value="20">20 Items</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
              </div>
          </div>

          {/* Search Input */}
          <div className="relative group flex-1 max-w-xs">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
              <div className="relative flex items-center">
                  <input 
                      type="text"
                      placeholder="Search..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full px-4 py-2 pl-10 bg-white border border-gray-100 rounded-lg text-gray-600 focus:border-green-400 outline-none transition-all duration-300"
                  />
                  <svg 
                      className="absolute left-3 w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                  >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </div>
          </div>
      </div>
  );
}