import { useParams, Link } from 'react-router-dom';
import { formatDateTime } from '../utils/format';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { getEvent } from '../features/events/eventSlice';
import { addComment, getComments } from '../features/comments/commentsSlice';


const EventDetail = () => {

  const {event,eventsLoading,evenstSuccess,eventsError,eventsErrorMessage}= useSelector(state => state.events)
 const {allComments,commentsLoading,commentsSuccess,commentsError,commentsErrorMessage}= useSelector (state => state.comments)
  
  const { eid } = useParams();
  const dispatch = useDispatch()



  useEffect(()=>{
  
    dispatch(getEvent(eid))
    dispatch(getComments(eid))
  },[eid])

  if(eventsLoading){
    return(
      <Loader/>
    )
  }
 

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/events"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 font-medium group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="relative">
            <img
              src={event.eventImage}
              alt={event.eventName}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
                {event.eventName}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Date & Time</p>
                  <p className="text-lg font-bold text-slate-900">{formatDateTime(event.eventDate)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Location</p>
                  <p className="text-lg font-bold text-slate-900">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-slate-100 h-64 rounded-xl flex items-center justify-center mb-4">
                <div className="text-center text-slate-400">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="font-medium">Map Placeholder</p>
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Event</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                {event.eventDescription}
              </p>
            </div>

            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-xl mb-8">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-lg font-bold text-slate-900">{event.availableSeats} people interested</span>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                I'm Interested
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Comments ({allComments.length})
          </h2>
          <CommentList comments={allComments} />
        </div>

        <CommentForm eid={eid}/>
      </div>
    </div>
  );
};

export default EventDetail;
