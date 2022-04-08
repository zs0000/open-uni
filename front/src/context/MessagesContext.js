import React, {useState, createContext} from "react";


export const MessagesContext = createContext();

export const MessagesContextProvider = props => {

    const [receivedConversations, setReceivedConversations] = useState([]);
    const [startedConversations, setStartedConversations] = useState([]);
    const [messages, setMessages] = useState([])
    const [sender, setSender] = useState(null)
    const [receiver, setReceiver] = useState(null)


  
  

    return(
        <MessagesContext.Provider value={{
    
            receivedConversations, setReceivedConversations,
            startedConversations, setStartedConversations,
            messages, setMessages,
            sender, setSender,
            receiver, setReceiver
        }}>
            {props.children}
        </MessagesContext.Provider>
    );

}