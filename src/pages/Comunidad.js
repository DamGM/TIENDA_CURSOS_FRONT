import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Comunidad() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5001');

    socket.onopen = () => {
      console.log('Connectado al Websocket');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'new-post') {
        setMessages((prevMessages) => [...prevMessages, message.content]);
      }
    };

    socket.onclose = () => {
      console.log('Desconectado de WebSocket');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:5001/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: input }),
    });
    setInput('');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
    <div>
      <h1>Foro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
    </Container>
  );
}

export default Comunidad;
