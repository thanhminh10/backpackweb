// Message.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { ErrorIcon, InfoIcon, SuccessIcon } from "@/utils/icon/notification";
 
type MessageType = "success" | "error" | "info";
 
interface MessageProps {
  message: string;
  type: MessageType;
  onClose: () => void;
}
const Message: React.FC<MessageProps> = ({ message, type, onClose }) => {
    let bgColor: string = "";
    let textColor: string = "";
    let borderColor: string = "";
    let icon: React.ReactElement = <></>;
  
    switch (type) {
      case "success":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        borderColor = "border-green-400";
        icon = <SuccessIcon />;
        break;
      case "error":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        borderColor = "border-red-400";
        icon = <ErrorIcon />;
        break;
      case "info":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        borderColor = "border-blue-400";
        icon = <InfoIcon />;
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
        borderColor = "border-gray-400";
    }
  
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg text-sm shadow-lg border ${bgColor} ${borderColor}
        ${
          isVisible
            ? "transition-opacity duration-500 ease-in-out opacity-100 translate-y-0"
            : "transition-opacity duration-500 ease-in-out opacity-0 -translate-y-4"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex-shrink-0">{icon}</div>
          <div className={`whitespace-nowrap ${textColor}`}>{message}</div>
        </div>
      </div>
    );
  };
  
const createMessage = (type: MessageType) => {
  return (msg: string) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
 
    const root = ReactDOM.createRoot(container);
    const onClose = () => {
      root.unmount();
      document.body.removeChild(container);
    };
 
    root.render(<Message message={msg} type={type} onClose={onClose} />);
  };
};
 
const message = {
  success: createMessage("success"),
  error: createMessage("error"),
  info: createMessage("info"),
};
 
export default message;