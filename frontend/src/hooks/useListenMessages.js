import { useEffect, useRef } from 'react'
import { useSocketContext } from '../context/SocketContext'
import notificationSound from '../assets/sounds/notification.mp3'
import useConversation from '../zustand/useConversation';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    const prevMessagesRef = useRef(messages);

    useEffect(() => {
        prevMessagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            console.log("New message received:", newMessage);
            newMessage.shouldShake = true;
            
            try {
                const sound = new Audio(notificationSound);
                sound.play().catch(err => console.error("Error playing notification sound:", err));
            } catch (error) {
                console.error("Error with notification sound:", error);
            }
            
            // Use a callback to ensure we're working with the latest messages state
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);
        
        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);
}

export default useListenMessages;