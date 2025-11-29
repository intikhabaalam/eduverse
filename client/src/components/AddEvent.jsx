import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { addEvent, updateEvent } from '../features/admin/adminSlice'

const AddEvent = () => {

  const {edit} = useSelector(state => state.admin )

  const dispatch = useDispatch()
  const navigate = useNavigate()

    const [formData,setFormData] = useState({
        eventName : "",
        eventDescription : "",
        eventDate:"",
        eventImage:"",
        status: "",
        location:"",
        availableSeats: "",
        organizer : "",
        price : "",

    })

    const{eventName,eventDescription,eventDate,eventImage,status,location,availableSeats,organizer,price} = formData
    const handleChange = (e)=>{
        setFormData((prev) =>{
            return{
                ...prev,
                [e.target.name]: e.target.value


            }
        })
    }
    const handleAddEvent = (e) =>{
        e.preventDefault()
        !edit.isEdit ? dispatch(addEvent(formData)) : dispatch(updateEvent(formData))
        navigate("/auth/events")
        
    }

    useEffect (()=>{
      setFormData(edit.event)
    },[edit])
  return (
   
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Add Event</h1>
        <p className="text-slate-600">Add New Event Here</p>
      </div>

      <form onSubmit={handleAddEvent}className='border border-gray-300 p-4 rounded-md w-full'>
        <input name='eventName' value={eventName} onChange={handleChange} className='border border-gray-300 rounded-md p-1.5 w-full my-2' type='text' placeholder='Enter Event Title'/>
        <textarea name='eventDescription' value={eventDescription} onChange={handleChange}  className='border border-gray-300 rounded-md p-1.5 w-full my-2' type="text" placeholder='Enter Event Description' ></textarea>
        <input name='eventDate' value={eventDate} onChange={handleChange}  className='border border-gray-300 rounded-md p-1.5 w-full my-2' type="date" placeholder='Enter Event Date' />
        <input name='eventImage' value={eventImage} onChange={handleChange}  className='border border-gray-300 rounded-md p-1.5 w-full my-2' type="text" placeholder='Enter Event Image URL' />
        <select name='status' value={status} onChange={handleChange} className='border border-gray-300 rounded-md p-1.5 w-full my-2' >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="postponed">Postponed</option>
         

        </select>
        <input name='location' value={location} onChange={handleChange}  className='border border-gray-300 rounded-md p-1.5 w-full my-2' type="text" placeholder='Enter Event Location' />
        <input name='availableSeats' value={availableSeats} onChange={handleChange}  className='border border-gray-300 rounded-md p-1.5 w-full my-2' type="number"placeholder='Enter Event Available Seats ' />
        <input name='organizer' value={organizer} onChange={handleChange}  className='border border-gray-300 rounded-md p-1.5 w-full my-2' type="text" placeholder='Enter Event Organizer '/>
        <input name='price' value={price} onChange={handleChange}  className='border border-gray-300 rounded-md p-1.5 w-full my-2' type="number"placeholder='Enter Event Ticket Pric  ' />
         <button className="cursor-pointer w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          {edit.isEdit ?"Update Event":"+ Add Event"}
        </button>
      </form>
    </div>
    )
  }
  

export default AddEvent
