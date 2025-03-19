export default function Pagination({ pageNumber, setPageNumber, totalItem, perPage, showItem }) {
  let totalPage = Math.ceil(totalItem / perPage);
  let startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
  let endPage = Math.min(totalPage, startPage + showItem - 1);

  if (endPage - startPage + 1 < showItem) {
      startPage = Math.max(1, endPage - showItem + 1);
  }

  const createPaginationArray = () => {
      const pagination = [];
      for (let i = startPage; i <= endPage; i++) {
          pagination.push(i);
      }
      return pagination;
  }

  return (
      <div className="flex items-center gap-2">
          {/* First Page */}
          {pageNumber > 1 && (
              <button 
                  onClick={() => setPageNumber(1)}
                  className="w-9 h-9 rounded-lg flex justify-center items-center bg-white text-gray-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
              </button>
          )}

          {/* Previous */}
          {pageNumber > 1 && (
              <button 
                  onClick={() => setPageNumber(pageNumber - 1)}
                  className="w-9 h-9 rounded-lg flex justify-center items-center bg-white text-gray-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
              </button>
          )}

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
              {createPaginationArray().map((p, i) => (
                  <button
                      key={i}
                      onClick={() => setPageNumber(p)}
                      className={`w-9 h-9 rounded-lg flex justify-center items-center transition-all duration-300 shadow-sm ${
                          pageNumber === p 
                              ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md' 
                              : 'bg-white text-gray-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white'
                      }`}
                  >
                      {p}
                  </button>
              ))}
          </div>

          {/* Next */}
          {pageNumber < totalPage && (
              <button 
                  onClick={() => setPageNumber(pageNumber + 1)}
                  className="w-9 h-9 rounded-lg flex justify-center items-center bg-white text-gray-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
              </button>
          )}

          {/* Last Page */}
          {pageNumber < totalPage && (
              <button 
                  onClick={() => setPageNumber(totalPage)}
                  className="w-9 h-9 rounded-lg flex justify-center items-center bg-white text-gray-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
              </button>
          )}
      </div>
  );
}