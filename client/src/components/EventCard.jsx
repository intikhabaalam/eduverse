// UI Only — Event card component

import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/format';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getComments } from '../features/comments/commentsSlice';

const EventCard = ({ event }) => {
  const eventDate = new Date(event.eventDate);
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getComments(event._id))
  })

  return (
    <Link
      to={`/event/${event._id}`}
      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 bg-slate-100 overflow-hidden">
          <img
            src={event.eventImage}
            alt={event.eventName}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-4 left-4">
          <div className="bg-white rounded-xl shadow-lg p-3 text-center min-w-[60px]">
            <div className="text-xs font-bold text-purple-600">{month}</div>
            <div className="text-2xl font-bold text-slate-900">{day}</div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-slate-900 text-xl mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {event.eventName}
        </h3>

        <div className="space-y-2 text-sm text-slate-600 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDateTime(event.eventDate)}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center text-sm text-slate-600">
            <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-medium">{event.availableSeats} interested</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <svg className="w-4 h-4 mr-1 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">comments</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
