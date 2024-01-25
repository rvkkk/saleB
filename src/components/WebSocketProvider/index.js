import React, {
  createContext,
  useContext,
  //useEffect,
  useRef,
  //useState,
} from "react";

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(window.localStorage.getItem("socket") || null);
  //const [isOn, setIsOn] = useState(false);

  /*useEffect(() => {
    console.log(2);
    if (!socketRef.current) {
      console.log(1);
      socketRef.current = new WebSocket("ws://localhost:3001");
      window.localStorage.setItem("socket", socketRef.current);
      setIsOn(true);
    }
    const socket = socketRef.current;

    const handleOpen = () => {
      console.log("WebSocket connected");
    };

    const handleClose = () => {
      console.log("WebSocket disconnected");
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("close", handleClose);
    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("close", handleClose);
      //socket.close();
    };
  }, []);

 /* useEffect(() => {
    const socket = socketRef.current;

    return () => {
      if (isOn) {
        socket.close();
        setIsOn(false);
      }
    };
  }, [isOn]);*/

  return (
    <WebSocketContext.Provider value={socketRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
