import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import styled, { keyframes } from "styled-components";
import T from "i18n-react";

// Define keyframes for animations
const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

// Styled components for the alert
const AlertStyled = styled.div<{ type: string }>`
  padding: 12px 24px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: white;
  background-color: ${({ type }) => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#F44336";
      case "warning":
        return "#FF9800";
      case "info":
        return "#2196F3";
      default:
        return "#2196F3";
    }
  }};
  animation: ${slideIn} 0.3s ease-out, ${slideOut} 0.3s ease-out 2.7s;
`;

const AlertsWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5080;
`;

// Alert component
const AlertComponent: React.FC<{ type: string; message: string; onClose: () => void }> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return <AlertStyled type={type}>{T.translate(message)}</AlertStyled>;
};

// Alert manager component
const AlertManager: React.FC = () => {
  const [alerts, setAlerts] = useState<{ id: number; type: string; message: string }[]>([]);

  const addAlert = (type: string, message: string) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, type, message }]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Expose addAlert to the global scope
  useEffect(() => {
    (window as any).addAlert = addAlert;
  }, []);

  return (
    <AlertsWrapper>
      {alerts.map((alert) => (
        <AlertComponent key={alert.id} type={alert.type} message={alert.message} onClose={() => removeAlert(alert.id)} />
      ))}
    </AlertsWrapper>
  );
};

// Render the AlertManager into the DOM
const renderAlertManager = () => {
  const alertContainer = document.createElement("div");
  alertContainer.setAttribute("id", "alert-container");
  document.body.appendChild(alertContainer);

  const root = createRoot(alertContainer);
  root.render(<AlertManager />);
};

// Export the alert functions
const createAlert = (type: string, text: string) => {
  if (!document.getElementById("alert-container")) {
    renderAlertManager();
  }

  // Use the globally exposed addAlert function
  if ((window as any).addAlert) {
    (window as any).addAlert(type, text);
  }
};

const success = (text: string) => createAlert("success", text);
const error = (text: string) => createAlert("error", text.replace("GraphQL error:", ""));
const warning = (text: string) => createAlert("warning", text);
const info = (text: string) => createAlert("info", text);

const Alert = {
  success,
  error,
  warning,
  info,
};

export default Alert;