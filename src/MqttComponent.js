import React, { useState, useEffect } from 'react';
import connectToBroker from './mqttClient';

function MqttComponent() {
  const [messages, setMessages] = useState([]);
  const [mqttClient, setMqttClient] = useState(null);

  useEffect(() => {
    const client = connectToBroker();
    setMqttClient(client);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  useEffect(() => {
    if (mqttClient) {
      const handleIncomingMessage = function (topic, message) {
        const newMessage = message.toString();
        if (newMessage.includes('payload')) {
          // Skip messages containing 'payload'
          return;
        }

        if (topic === 'status') {
          // setOnlineStatus(message.toString());
        } else {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };

      mqttClient.on('message', handleIncomingMessage);

      return () => {
        mqttClient.off('message', handleIncomingMessage);
      };
    }
  }, [mqttClient]);

  return (
    <div>
      <h1>MQTT Messages</h1>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}

export default MqttComponent;
