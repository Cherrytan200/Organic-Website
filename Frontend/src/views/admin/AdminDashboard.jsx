import { MdCurrencyRupee } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Chart from 'react-apexcharts';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import seller from '../../assets/seller.png'
import { get_admin_dashboard_data } from './../../store/Reducers/dashBoardReducer.js';
import moment from "moment";

export default function AdminDashboard() {

  const dispatch = useDispatch()
  const {totalSale,totalOrder,totalProduct,totalSeller,recentOrder,recentMessage} = useSelector(state=> state.dashboard)
  const {userInfo} = useSelector(state=> state.auth)

  useEffect(() => {
    dispatch(get_admin_dashboard_data())
}, [])

  const state={
    series:[
      {
        name:"Orders",
        data:[23,34,45,56,76,34,23,76,87,78,23,72]
      },
      {
        name:"Revenue",
        data:[45,23,56,7,8,90,34,67,89,9,34,56]
      },
      {
        name:"Sellers",
        data:[34,5,67,89,12,43,24,65,24,6,23,46]
      },
    ],
    options:{
      color:['#181ee8','#181ee8'],
      plotOptions:{
        radius:30
      },
      chart:{
        background:'transparent',
        foreColor:'#d0d2d6'
      },
      dataLabels:{
        enabled:false
      },
      strock:{
        show:true,
        curve:['smooth','straight','stepline'],
        lineCap:'butt',
        colors:'#f0f0f0',
        width:.5,
        dashArray:0
      },
      xaxis:{
        categories:['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      },
      legend:{
        position:'top'
      },
      responsive:[
        {
          breakpoint:565,
          yaxis:{
            categories:['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
          },
          options:{
            plotOptions:{
              bar:{
                horizontal:true
              }
            },
            chart:{
              height:"550px"
            }
          }
        }
      ]
    }
  }


  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">

        {/* 1 */}
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                <h2 className="text-3xl font-bold">&#8377;{totalSale}</h2>
                <span className="text-md font-medium">Total Sales</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <MdCurrencyRupee className="text-white shadow-lg" />
          </div>
        </div>

        {/* 2 */}
        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                <h2 className="text-3xl font-bold">{totalProduct}</h2>
                <span className="text-md font-medium">Products</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <MdProductionQuantityLimits className="text-white shadow-lg" />
          </div>
        </div>

        {/* 3 */}
        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                <h2 className="text-3xl font-bold">{totalSeller}</h2>
                <span className="text-md font-medium">Sellers</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <FaUsers className="text-white shadow-lg" />
          </div>
        </div>

        {/* 4 */}
        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                <h2 className="text-3xl font-bold">{totalOrder}</h2>
                <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <FaCartShopping className="text-white shadow-lg" />
          </div>
        </div>

      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
              <Chart options={state.options} series={state.series} type='bar' height={350} />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
            <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
              <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">Recent Seller Message</h2>
                  <Link className="font-semibold text-sm text-[#d0d2d6]">
                    view All
                  </Link>
              </div>
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
                <ol className="relative border-1  border-slate-600 ml-4">
                  {
                      recentMessage.map((m, i) => <li key={i} className='mb-3 ml-6'>
                      <div className='flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10'>
                        {
                            m.senderId === userInfo._id ? <img className='w-full rounded-full h-full shadow-lg' src={userInfo.image} alt="AdminD157" /> : <img className='w-full rounded-full h-full shadow-lg' src={seller} alt="AdminD157" />
                        } 
                        </div>
                        <div className='p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm'>
                          <div className='flex justify-between items-center mb-2'>
                            <Link className='text-md font-normal'>{m.senderName}</Link>
                            <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'> {moment(m.createdAt).startOf('hour').fromNow()}</time>
                          </div>
                          <div className='p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800'>
                              {m.message}
                          </div>
                      </div>
                  </li>)
                  }
                </ol>
            </div>
            </div>
        </div>
      </div>


      <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
          <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                    Recent Orders
                </h2>
                <Link className="font-semibold text-sm text-[#d0d2d6]">
                  View All
                </Link>
          </div>

          
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-[#d0d2d6] uppercase border-b border-slate-700">
              <thead className="etxt-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4" scope="col">ORDER ID</th>
                  <th className="py-3 px-4" scope="col">PRICE</th>
                  <th className="py-3 px-4" scope="col">PAYMENT STATUS</th>
                  <th className="py-3 px-4" scope="col">ORDER STATUS</th>
                  <th className="py-3 px-4" scope="col">ACTIVE</th>
                </tr>
              </thead>
              <tbody>
                {
                  recentOrder.map((d,i)=> 
                  <tr key={i}>
                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                        #{d._id}
                    </td>
                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                    &#8377;{d.price}
                    </td>
                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                        {d.payment_status}
                    </td>
                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                        {d.delivery_status}
                    </td>
                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                      <Link to={`/admin/dashboard/order/details/${d._id}`}>View</Link> 
                    </td>
                  </tr>
                  )
                }
              </tbody>
            </table>
          </div>
      </div>


    </div>
  )
}
