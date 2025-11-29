// UI Only — Admin dashboard page

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarAdmin from '../components/SidebarAdmin';
import StatsCard from '../components/StatsCard';
import { formatPrice, formatDate } from '../utils/format';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getAllListings, getAllUsers, updateUser, updateListing, editEvent } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import AddEvent from '../components/AddEvent';


const Admin = () => {

const {user} = useSelector(state => state.auth)
const {allUsers,allEvents,allListings,adminLoading,adminSuccess,adminError,adminErrorMessage} = useSelector(state =>state.admin)
const navigate = useNavigate()
const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState('dashboard');
  const [editModal, setEditModal] = useState(null);

  const handeEditEvent = (event) =>{
    dispatch(editEvent(event))
    setActiveTab('add')
  }




  useEffect( ()=>{
    if(!user?.isAdmin){
      navigate("/myprofile")
    }
   //getallusers
    dispatch(getAllUsers())
    //getallevents
    dispatch(getAllEvents())
    //getallproducts
    dispatch(getAllListings())

    if(adminError && adminErrorMessage){
      toast.error(adminErrorMessage,{position : "top-center"})
    }

  },[user,adminError,adminErrorMessage])
  if(adminLoading){
    return(
      <Loader />
    )

  }

  const DashboardView = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Products"
          value={allListings.length}   
          gradient="from-purple-600 to-pink-500"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
        />
        <StatsCard
          title="Total Events"
          value={allEvents.length}
          gradient="from-pink-500 to-cyan-400"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatsCard
          title="Active Users"
          value={allUsers.length}
         
          gradient="from-cyan-400 to-purple-600"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
      
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Listing</h2>
        <div className="space-y-4">
          {allListings.map((Listing) => (
            <div key={Listing._id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className={`w-2 h-2 rounded-full bg-gray-500`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{Listing.title}</p>
              </div>
              <p className="text-xs text-slate-500">{new Date (Listing.createdAt).toLocaleDateString('en-IN')}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

  const ProductsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Manage Products</h1>
          <p className="text-slate-600">View and manage all marketplace listings</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 ">
              {allListings.slice(0, 8).map((product) => (
                <tr key={product._id} className={product.isAvailable ?"hover:bg-slate-50 transition-colors" :"hover:bg-slate-50 transition-colors bg-gray-200"}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={product.itemImage} alt={product.title} className="w-12 h-12 rounded-lg object-cover mr-3" />
                      <div>
                        <p className="font-medium text-slate-900">{product.title}</p>
                        <p className="text-sm text-slate-500 line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.user.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatDate(product.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditModal(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <Link
                        to={`/product/${product._id}`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                  
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const EventsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Manage Events</h1>
          <p className="text-slate-600">View and manage all campus events</p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allEvents.map((event) => (
          <div key={event._id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <img src={event.eventImage} alt={event.eventName} className="w-full h-40 object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1">{event.eventName}</h3>
              <p className="text-sm text-slate-600 mb-3">{formatDate(event.eventDate)}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {event.availableSeats}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>handeEditEvent(event)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <Link
                    to={`/event/${event._id}`}
                    className="px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    View
                  </Link>
              
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

 <AddEvent />

  const UsersView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Users Management</h1>
        <p className="text-slate-600">View and manage registered users</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="space-y-4">
          {allUsers.map((user) => (
            <div key={user._id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold mr-4">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2"> 
                <button onClick={()=>dispatch(updateUser({_id: user._id,isActive: user.isActive ? false : true}))} className={user.isActive ? "cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500": "px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"}>
                 {user.isActive ? "Deactivate Account":"Activate Account"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <SidebarAdmin activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-6 lg:p-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'products' && <ProductsView />}
        {activeTab === 'events' && <EventsView />}
        {activeTab === 'users' && <UsersView />}
         {activeTab === 'add' && <AddEvent/>}
      </div>

      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                Edit {editModal.type === 'product' ? 'Product' : 'Event'}
              </h3>
              <button
                onClick={() => setEditModal(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <h1 className='my-4 text-2xl font-bold'>{editModal.title}</h1>
            <h1 className='my-4 text-xl font-bold'>Listed By :{editModal.user.name}</h1>
            <p className=" text-xs my-4 text-slate-600 mb-6">
             Note : Admin can only make product available and unavailable
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                 dispatch(updateListing({isAvailable : editModal.isAvailable ? false : true, _id: editModal._id}))
                  setEditModal(null);           
                }}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
               {editModal.isAvailable ?"make it Unavailable" : "make it Available"}
              </button>
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
