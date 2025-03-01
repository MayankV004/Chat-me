import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import notificationSound from '../assets/sounds/notification.mp3'
import useConversation from '../zustand/useConversation';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            console.log("New message received:", newMessage);
            
            try {
                const sound = new Audio(notificationSound);
                sound.play().catch(err => console.error("Error playing notification sound:", err));
            } catch (error) {
                console.error("Error with notification sound:", error);
            }
            
            // Make sure newMessage is valid before adding it
            if (newMessage && typeof newMessage === 'object') {
                newMessage.shouldShake = true;
                
                // Use a function to update state to avoid closure issues
                setMessages(prevMessages => {
                    // Ensure prevMessages is an array
                    const messagesArray = Array.isArray(prevMessages) ? prevMessages : [];
                    return [...messagesArray, newMessage];
                });
            } else {
                console.error("Received invalid message format:", newMessage);
            }
        };

        socket.on("newMessage", handleNewMessage);
        
        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);
}

export default useListenMessages;