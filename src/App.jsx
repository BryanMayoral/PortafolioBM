import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PerfilPortafolio from "C:/Users/brmay/OneDrive/Documents/NodeJS/react-app/src/components/PerfilPortafolio.jpg";

function App() {
  return (
    <CV/>
  );
}

function CV() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
    console.log("Chat estado:", !isChatOpen); 
  };

  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      setTimeout(() => {
        const userQuestion = userMessage.text.toLowerCase();
        
                
        const responseMap = [
          {
            keywords: ["hola", "saludos"],
            response: "Hola, soy el asistente virtual de Bryan. ¿En qué puedo ayudarte?"
          },
          {
            keywords: ["experiencia", "trabajo"],
            response: "Bryan ha trabajado como becario en PLAi y tiene varios proyectos personales."
          },
          {
            keywords: ["contacto", "email", "correo", "teléfono"],
            response: "Puedes contactar a Bryan por email en brmayoralg@gmail.com o por teléfono al +33 1537 3501."
          },
          {
            keywords: ["habilidades", "tecnologías", "lenguajes"],
            response: "Las habilidades de Bryan incluyen HTML, CSS, JavaScript, Python y Java."
          },
          {
            keywords: ["java"],
            response: "Bryan es un semiexperto en Java con experiencia en desarrollo de aplicaciones."
          }
        ];
        
        // Buscar coincidencia en el mapa
        let response = "Lo siento, no entendí tu pregunta. ¿Puedes ser más específico?";
        for (const item of responseMap) {
          if (item.keywords.some(keyword => userQuestion.includes(keyword))) {
            response = item.response;
            break;
          }
        }
        
        const botMessage = { 
          text: response, 
          sender: 'bot' 
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen relative">
      <header className="bg-blue-600 text-white py-6 text-center">
        <title>Portafolio Bryan</title>
        <h1 className="text-3xl font-bold">Bryan Omar Mayoral Gonzalez</h1>
        <p className="text-lg">Semiexperto en Java | Desarrollador Web</p>
        <img src={PerfilPortafolio} alt="Perfil" className="mx-auto mt-4 w-32 h-32 rounded-full border-4 border-white shadow-lg" />
      </header>
  
      <main className="max-w-4xl mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Sobre mí</h2>
          <p className="mt-2">Soy un apasionado por la tecnología y el desarrollo web.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Experiencia</h2>
          <ul className="list-disc list-inside mt-2">
            <li><strong>PLAi</strong> - Desarrollador Web Becario</li>
            <li><strong>UNEDL</strong> - Proyectos personales</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Habilidades laborales</h2>
          <ul className="grid grid-cols-2 gap-2 mt-2">
            <li className="bg-blue-200 p-2 rounded">HTML</li>
            <li className="bg-blue-200 p-2 rounded">CSS</li>
            <li className="bg-blue-200 p-2 rounded">JavaScript</li>
            <li className="bg-blue-200 p-2 rounded">Python</li>
            <li className="bg-blue-200 p-2 rounded">Java</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Contacto</h2>
          <p className="mt-2">Email: <a href="mailto:brmayoralg@gmail.com" className="text-blue-600">brmayoralg@gmail.com</a></p>
          <p>Tel: <a href="tel:+3315373501" className="text-blue-600">+33 1537 3501</a></p>
        </section>
      </main>

      
      
      <button onClick={toggleChat} className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50">
        {isChatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col z-40">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">ChatBot</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto bg-gray-100">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 my-4">
                <p>¡Hola! Soy el asistente virtual de Bryan. ¿En qué puedo ayudarte?</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex mb-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-300 text-black rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-300 px-3 py-2 rounded-lg rounded-bl-none flex space-x-1">
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="p-3 bg-white border-t border-gray-200" onSubmit={handleSendMessage}>
            <div className="flex">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe un mensaje..." disabled={isLoading} className="flex-1 px-3 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              <button type="submit" disabled={isLoading || input.trim() === ''}className="px-4 py-2 bg-blue-600 text-white rounded-r-full transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;