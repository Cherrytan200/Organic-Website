import { MdCurrencyRupee, MdProductionQuantityLimits } from "react-icons/md";
import { FaLeaf, FaCartShopping } from "react-icons/fa6";
import Chart from 'react-apexcharts';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_dashboard_data } from '../../store/Reducers/dashboardReducer';
import moment from "moment";

export default function SellerDashboard() {
  const dispatch = useDispatch()
  const { totalSale, totalOrder, totalProduct, totalPendingOrder, recentOrder, recentMessage } = useSelector(state => state.dashboard)
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(get_seller_dashboard_data())
  }, [])

  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 23, 72]
      },
      {
        name: "Revenue",
        data: [45, 23, 56, 7, 8, 90, 34, 67, 89, 9, 34, 56]
      },
      {
        name: "Products",
        data: [34, 5, 67, 89, 12, 43, 24, 65, 24, 6, 23, 46]
      },
    ],
    options: {
      colors: ['#4CAF50', '#FF9800', '#2196F3'],
      plotOptions: {
        radius: 30
      },
      chart: {
        background: 'transparent',
        foreColor: '#333'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        curve: ['smooth'],
        lineCap: 'butt',
        width: 2,
        dashArray: 0
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      legend: {
        position: 'top'
      },
      responsive: [{
        breakpoint: 565,
        options: {
          chart: {
            height: "550px"
          }
        }
      }]
    }
  }

  return (
    <div className="px-2 md:px-7 py-5 bg-gradient-to-br from-[#dee9e3] to-[#dee9e3]]">
      {/* Decorative SVG Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-0 top-0 opacity-10" viewBox="0 0 200 200">
          <path fill="#4CAF50" d="M44.5,-76.3C59.1,-69.9,73.3,-60.1,79.9,-46.3C86.5,-32.5,85.5,-14.7,83.3,2.2C81.1,19.1,77.7,35.1,69.3,48.5C60.9,61.9,47.5,72.7,32.4,77.7C17.3,82.7,0.4,81.9,-15.6,77.4C-31.6,73,-46.7,65,-59.4,53.3C-72.1,41.6,-82.4,26.2,-85.9,9C-89.4,-8.2,-86,-27.2,-76.6,-42.1C-67.2,-57,-51.8,-67.8,-36.3,-73.8C-20.8,-79.8,-5.2,-81,8.7,-77.8C22.7,-74.6,29.9,-82.7,44.5,-76.3Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute right-0 bottom-0 opacity-10" viewBox="0 0 200 200">
          <path fill="#FF9800" d="M39.5,-65.3C50.9,-59.8,59.7,-48.3,65.9,-35.4C72.1,-22.4,75.7,-8,74.7,6.1C73.7,20.2,68,34,59.3,45.7C50.6,57.4,38.8,67,25.3,72.3C11.9,77.6,-3.2,78.6,-17.4,74.8C-31.6,71,-44.9,62.4,-54.4,51.1C-63.9,39.8,-69.5,25.8,-72.5,10.8C-75.4,-4.2,-75.6,-20.2,-69.7,-33.5C-63.8,-46.8,-51.7,-57.4,-38.5,-62C-25.3,-66.6,-11.1,-65.2,2,-68.4C15.2,-71.5,28.1,-70.8,39.5,-65.3Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {/* Total Sales Card */}
        <div className="group flex justify-between items-center p-6 bg-gradient-to-br from-[#4CAF50] to-[#81C784] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(76,175,80,0.3)] transition-all duration-300">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-4xl font-bold mb-1">₹{totalSale}</h2>
            <span className="text-md font-medium opacity-90">Total Sales</span>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white group-hover:rotate-12 transition-transform duration-300">
            <MdCurrencyRupee />
          </div>
        </div>

        {/* Products Card */}
        <div className="group flex justify-between items-center p-6 bg-gradient-to-br from-[#FF9800] to-[#FFB74D] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,152,0,0.3)] transition-all duration-300">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-4xl font-bold mb-1">{totalProduct}</h2>
            <span className="text-md font-medium opacity-90">Products</span>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white group-hover:rotate-12 transition-transform duration-300">
            <FaLeaf />
          </div>
        </div>

        {/* Orders Card */}
        <div className="group flex justify-between items-center p-6 bg-gradient-to-br from-[#2196F3] to-[#64B5F6] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(33,150,243,0.3)] transition-all duration-300">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-4xl font-bold mb-1">{totalOrder}</h2>
            <span className="text-md font-medium opacity-90">Orders</span>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white group-hover:rotate-12 transition-transform duration-300">
            <FaCartShopping />
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="group flex justify-between items-center p-6 bg-gradient-to-br from-[#9C27B0] to-[#BA68C8] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(156,39,176,0.3)] transition-all duration-300">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-4xl font-bold mb-1">{totalPendingOrder}</h2>
            <span className="text-md font-medium opacity-90">Pending Orders</span>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white group-hover:rotate-12 transition-transform duration-300">
            <MdProductionQuantityLimits />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7 gap-6">
        <div className="w-full lg:w-[58%]">
          <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
            <Chart options={state.options} series={state.series} type='bar' height={350} />
          </div>
        </div>

        <div className="w-full lg:w-[38%]">
          <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-xl text-gray-800">Recent Messages</h2>
              <Link to='/seller/dashboard/chat-support' className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {recentMessage && recentMessage.map((m, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      className="w-full h-full object-cover"
                      src={m.senderId === userInfo._id ? userInfo.image : m.image}
                      alt={m.senderName}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">{m.senderName}</h3>
                      <span className="text-sm text-gray-500">
                        {moment(m.createdAt).fromNow()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{m.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-xl text-gray-800">Recent Orders</h2>
          <Link to='/seller/dashboard/orders' className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-4 font-medium text-gray-500">Price</th>
                <th className="px-6 py-4 font-medium text-gray-500">Payment Status</th>
                <th className="px-6 py-4 font-medium text-gray-500">Order Status</th>
                <th className="px-6 py-4 font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrder && recentOrder.map((order, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">#{order._id}</td>
                  <td className="px-6 py-4">₹{order.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.payment_status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.delivery_status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.delivery_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/seller/dashboard/order/details/${order._id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}