import { useState } from 'react'
import { useSelector } from 'react-redux'

const API_URL = import.meta.env.PROD
    ? "/api/ai"
    : "http://localhost:8080/api/ai";

const AIHub = () => {

    const { user } = useSelector((state) => state.auth)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loadingEvent, setLoadingEvent] = useState(false)

    const [message, setMessage] = useState('')
    const [reply, setReply] = useState('')
    const [loadingChat, setLoadingChat] = useState(false)

    // EVENT GENERATOR
    const generateEvent = async () => {
        console.log("Sending AI request...");
        console.log("API URL:", `${API_URL}/generate-event`);
        console.log("Request Body:", { title });

        try {

            setLoadingEvent(true)

            const res = await fetch(`${API_URL}/generate-event`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json()
            console.log("AI response received:", data);

            setDescription(data.description)
            setTitle('')

        } catch (error) {

            console.error("AI Error:", error)

        } finally {

            setLoadingEvent(false)
        }
    }

    // CHATBOT
    const askAI = async () => {
        console.log("Sending AI request...");
        console.log("API URL:", `${API_URL}/chat`);
        console.log("Request Body:", { message });

        try {

            setLoadingChat(true)

            const res = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json()
            console.log("AI response received:", data);

            setReply(data.reply)

            setMessage('')

        } catch (error) {

            console.error("AI Error:", error)

        } finally {

            setLoadingChat(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">

            <div className="max-w-5xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
                        🚀 Eduverse AI Hub
                    </h1>

                    <p className="text-gray-600 text-lg">
                        Smart AI tools for students, events & guidance
                    </p>
                </div>

                <div className=" gap-8">

                    {/* ADMIN ONLY EVENT GENERATOR */}
                    {user?.isAdmin && (
                        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition duration-300">

                            <h2 className="text-3xl font-bold text-blue-600 mb-3">
                                🎯 AI Event Generator
                            </h2>

                            <p className="text-gray-500 mb-5">
                                Generate professional college event descriptions instantly.
                            </p>

                            <input
                                type="text"
                                placeholder="Enter event name..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            />

                            <button
                                onClick={generateEvent}
                                disabled={loadingEvent}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
                            >
                                {loadingEvent ? 'Generating...' : 'Generate Event'}
                            </button>

                            {description && (
                                <div className="mt-5 bg-gray-100 rounded-xl p-5 whitespace-pre-wrap text-gray-700 border">
                                    {description}
                                </div>
                            )}
                        </div>
                    )}

                    {/* CHATBOT */}
                    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition duration-300 w-full">

                        <h2 className="text-3xl font-bold text-green-600 mb-3">
                            💬 Eduverse AI Chatbot
                        </h2>

                        <p className="text-gray-500 mb-5">
                            Ask coding, events, books or student-related questions.
                        </p>

                        <input
                            type="text"
                            placeholder="Ask anything..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-green-300"
                        />

                        <button
                            onClick={askAI}
                            disabled={loadingChat}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
                        >
                            {loadingChat ? 'Thinking...' : 'Ask AI'}
                        </button>

                        {reply && (
                            <div className="mt-5 bg-gray-100 rounded-xl p-5 whitespace-pre-wrap text-gray-700 border">
                                {reply}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AIHub