import axios from "axios"

const fetchMessages = async (token)=>{
    let options = {
        headers :{
            authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get("/api/message",options)
    return response.data
}

const sendMessage = async (pid,token)=>{
    let options = {
        headers :{
            authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post("/api/message/"+ pid,{text: "I am Intresed In Your Listing Kindly Contact Me! thanks"},options)
    return response.data
}

const messageService = {fetchMessages,sendMessage}

export default messageService