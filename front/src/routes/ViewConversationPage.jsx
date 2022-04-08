import React, { useState, useEffect, useContext } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import MessagesApi from "../apis/MessagesApi";
import s from "../styles/ViewConversationPage.module.css"
import {MessagesContext} from "../context/MessagesContext"
import { UsersContext } from "../context/UsersContext";
import DashboardApi from "../apis/DashboardApi";
import MessagesComponent from "../components/common/MessagesComponent/MessagesComponent";
import dateFormat, { masks } from "dateformat";
import LoadingPage from "../components/common/LoadingPage/LoadingPage";

export default function ViewConversationPage(){

    let navigate = useNavigate()
    let queryClient = useQueryClient()
    let { conversation_key } = useParams()

    const [loadedConversation, setLoadedConversation] = useState(false);
    
    const {messages, setMessages } = useContext(MessagesContext)
    const {receiver, setReceiver} = useContext(MessagesContext)
    const {sender, setSender} = useContext(MessagesContext)
    const [username, setUsername] = useState("")

    const [ inputs, setInputs ] = useState({
        messageText:""
    })
    const { messageText} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    }
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }

    const handleDashboardNavigate = () => {
        navigate(`/dashboard`, { replace: true })
    }

    const onSubmitForm = async (e) => {
   
        try {
            const body = { messageText };
            const response = await MessagesApi.post(`/send/${conversation_key}`, {
                message_content:messageText,
                message_sent_by:username,
            })
            const updateConversationTime = await MessagesApi.put(`/set_time/${conversation_key}`)
            console.log(updateConversationTime)

            if(receiver === username) {
                let starter_new_message = true;
                const setStarterViewedMessage = await MessagesApi.put(`/set_starter/${conversation_key}`,{
                    starter_new_message 
                })
               
            }
            if(sender === username) {
                let receiver_new_message = true;
        const setReceiverViewedMessage = await MessagesApi.put(`/set_receiver/${conversation_key}`, {
            receiver_new_message

           
        })
        setLoadedConversation(true)
            }

            window.location.reload()
          console.log(messages)
  

        } catch (err) {
          
            console.error(err.message)
        
        }
    }
    

     useEffect(()=> {

        const fetchConversationMessages = async() => {
            try {
                const conversationMessages = await queryClient.fetchQuery(`${conversation_key}-messages`, () => MessagesApi.get(`/retrieve/${conversation_key}`))

                if (conversationMessages){
                    setMessages(conversationMessages.data.data.messages)
                    console.log(conversationMessages)
                }
                setLoadedConversation(true)
            } catch (err) {
                console.error(err.message)
            }
        }

        const fetchConversationDetails = async() => {
            try {
                const conversationDetails = await queryClient.fetchQuery(`${conversation_key}-details`, () => MessagesApi.get(`/details/${conversation_key}`),{
                    cacheTime:Infinity,
                    staleTime: Infinity
                })

                const userConfirmation  = await DashboardApi.get('/', options)

    
    
                if(conversationDetails){
                    console.log(conversationDetails.data.data.details)
                    setSender(conversationDetails.data.data.details.conversation_starter)
                    setReceiver(conversationDetails.data.data.details.conversation_receiver)
                }

                if(userConfirmation) {
                    console.log(userConfirmation)
                    setUsername(userConfirmation.data.user_username)
          
                }
            } catch (err) {
                console.error(err.message)
            }
        }

        fetchConversationMessages();
        fetchConversationDetails();
     },[])


      if(loadedConversation === false){
          return(
              <LoadingPage/>
          )
      }
    
 
     if(receiver === username || sender === username){
        return(
            <div className={s.main} >
                 <div className={s.content}>
                 
                    
                    <div className={s.messagesbox}>
                    <span className={s.name}>
                    {sender === username ? receiver : sender }
                    </span>  
                        {messages.length === 0 ? 
                        <div className={s.skeletonbox}>
                            <span className={s.blankmessage}>
                                No Messages. Say Hi!
                            </span>
                        </div> :
                        <div className={s.messages}>
                            {messages.slice(0,5).reverse().map((item)=>(
                                <div className={s.message}>
                                    {item.message_sent_by === username ? 
                                    <div className={s.sentcard}>
                                    <div className={s.sentby}>
                                    {item.message_sent_by}
                                    </div>
                                        <span className={s.senttext}>
                                    {item.message_content}
                                        </span>
                                        <div className={s.senttime}>
                                            {dateFormat(item.message_sent_time, "ddd h:MM TT")}
                                        </div>
                                    </div> 
                                    :
                                    <div className={s.receivedcard}>
                                        <div className={s.sentby}>
                                    {item.message_sent_by}
                                    </div>
                                        <span className={s.receivedtext}>
                                    {item.message_content}
                                        </span>
                                        <div className={s.senttime}>
                                            {dateFormat(item.message_sent_time, "ddd h:MM TT")}
                                        </div>
                                    </div> 
                                    }
                                </div>
                            ))}
                        </div>
                        }
                        <div className={s.textbox}>
                            <textarea className={s.textinput} placeholder="Type your message here." name="messageText" value={messageText} onChange={e => onChange(e)} />
                            <button className={s.button} onClick={onSubmitForm} >
                                Send
                            </button>
                        </div>
                    </div> 
                </div>   
            </div>
            )
     }

     return(
         <div className={s.blankmain}>
             <div className={s.blankcontent}>
                 <span className={s.blankfirst}>
                    Oops!
                 </span>
                <span className={s.blanksecond}>
                    Looks like you're not supposed to be here!
                </span>
                 <button onClick={() => handleDashboardNavigate()} className={s.blankbutton}>
                     Navigate to Dashboard.
                 </button>
             </div>
         </div>
     )
    
}