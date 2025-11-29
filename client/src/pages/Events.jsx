// UI Only — Events listing page

import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../components/EventCard';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { getEvents } from '../features/events/eventSlice';

const Events = () => {

  const {allEvents,eventsLoading,evenstSuccess,eventsError,eventsErrorMessage}= useSelector(state => state.events)

 const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getEvents())

    if(eventsError && eventsErrorMessage){
  
        toast.error(eventsErrorMessage)
      
    }
  },[eventsError,eventsErrorMessage])

  if(eventsLoading){
    return(
      <Loader/>
    )
  }



  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Campus Events 🎉
          </h1>
          <p className="text-lg text-slate-600">
            Stay updated with all the exciting happenings on campus!
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        <div className="mt-12 flex justify-center items-center space-x-2">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
            Previous
          </button>
          {[1, 2].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                page === 1
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;
