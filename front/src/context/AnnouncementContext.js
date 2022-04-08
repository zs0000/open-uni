import React, { useState, createContext } from "react";

export const AnnouncementContext = createContext();

export const AnnouncementContextProvider = props => {

    const [announcementTitle, setAnnouncementTitle] = useState(null)
    const [announcementDescription, setAnnouncementDescription] = useState(null);
    const [announcementInstruction, setAnnouncementInstruction] = useState(null);
    const [announcementDate, setAnnouncementDate] = useState(null);
    const [announcementDue, setAnnouncementDue] = useState(null);
    const [announcementLink, setAnnouncementLink] = useState(null);

    return(
        <AnnouncementContext.Provider value={{
        announcementTitle, setAnnouncementTitle,
       announcementDescription, setAnnouncementDescription,
        announcementInstruction, setAnnouncementInstruction,
        announcementDate, setAnnouncementDate,
        announcementDue, setAnnouncementDue,
        announcementLink, setAnnouncementLink
        }}>
            {props.children}
        </AnnouncementContext.Provider>
    )


}