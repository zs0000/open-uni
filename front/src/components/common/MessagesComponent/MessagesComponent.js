import React, { useState, useEffect, useContext, useParams } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";

import DashboardApi from "../../../apis/DashboardApi";
import MessagesApi from "../../../apis/MessagesApi";
import { MessagesContext } from "../../../context/MessagesContext";
import { UsersContext } from "../../../context/UsersContext";
import s from "./MessagesComponent.module.css"



export default function MessagesComponent({users}){
    
    let navigate = useNavigate();
    let queryClient = useQueryClient();

    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    const [username, setUsername] = useState("")
    const [loadedMessagesReceived, setLoadedMessagesReceived] = useState(false)
    const [loadedMessagesStarted, setLoadedMessagesStarted] = useState(false)
    const {receivedConversations, setReceivedConversations} = useContext(MessagesContext)
    const {startedConversations, setStartedConversations} = useContext(MessagesContext)
    
    const handleStartedConversationClick = async(item) => {
        try {
            let starter_new_message = false;
            const body = { starter_new_message };
            
            if(item.starter_new_message=== true){
                const setStarterViewedMessage = await MessagesApi.put(`/set_starter/${item.conversation_key}`,{
                    starter_new_message 
                })
               
            }
            navigate(`/inbox/${users}${item.conversation_receiver}`, { replace: true })
       
            
          
        } catch (error) {
            
        }
       
    }
    
    const handleReceivedConversationClick = async(item) => {
       try {
      

        if(item.receiver_new_message ===true) {
            let receiver_new_message = false;
            const setReceiverViewedMessage = await MessagesApi.put(`/set_receiver/${item.conversation_key}`, {
                receiver_new_message
            })
        }
        
        navigate(`/inbox/${item.conversation_starter}${users}`, { replace: true })
       } catch (err) {
           console.error(err.message)
       }
       
        
        
    }

    useEffect(()=> {



        const fetchMessages = async() => {
            try {
                
                const conversationsStarted = await queryClient.fetchQuery(`${users}-conversations-started`, () => MessagesApi.get(`/sent/${users}`) )
                const conversationsReceived = await queryClient.fetchQuery(`${users}-conversations-received`, () =>  MessagesApi.get(`/received/${users}`))
            
                if(conversationsStarted){
                    setStartedConversations(conversationsStarted.data.data.conversations)
                    console.log(startedConversations)
                }
                if(conversationsReceived){
                    setReceivedConversations(conversationsReceived.data.data.conversations)
                    console.log(conversationsReceived)
                }
            } catch (err) {
                console.error(err.message)
            }
        }

        fetchMessages();
    },[])

    return(
        <div className={s.main}>
            <span className={s.conversationstitle}>
                Conversations
            </span>
            <div className={s.content}>
           
                <div className={s.first}>
                    
                    <span className={s.inboxtitle}>
                        Initiated
                    </span>
                    {startedConversations.length === 0 ?
                     <div className={s.blankdata}>
                         None initiated.
                     </div> :
                      startedConversations.map((item)=>(
                          <div className={item.starter_new_message === true ? s.newmessagecard : s.messagecard} onClick={() => handleStartedConversationClick(item)}>
                              {item.conversation_receiver}
                          </div>
                      ))
                      
                      }
                </div>
                <div className={s.second}>
                <span className={s.inboxtitle}>
                        Received
                    </span>
                    {receivedConversations.length === 0 ?
                     <div className={s.blankdata}>
                         None received.
                     </div> :
                      receivedConversations.map((item)=>(
                          <div className={item.receiver_new_message === true ? s.newmessagecard : s.messagecard} onClick={() => handleReceivedConversationClick(item)}>
                              {item.conversation_starter}
                          </div>
                      ))
                      
                      }
                </div>
            </div>
        </div>
    )
}