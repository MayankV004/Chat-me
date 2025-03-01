import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // Use window.location.origin to dynamically determine the server URL
      // This ensures it works in both development and production
      const socketServerUrl = window.location.origin;
      console.log("Connecting to socket server:", socketServerUrl);
      
      const newSocket = io(socketServerUrl, {
        query: { userId: authUser._id },
      });
  
      setSocket(newSocket);

      // Log socket connection events
      newSocket.on("connect", () => {
        console.log("Socket connected successfully");
      });

      newSocket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      // Updating online users in the onlineUsers state
      newSocket.on("getOnlineUsers", (users) => {
        console.log("Online users updated:", users);
        setOnlineUsers(users); 
      });

      return () => {
        console.log("Closing socket connection");
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};