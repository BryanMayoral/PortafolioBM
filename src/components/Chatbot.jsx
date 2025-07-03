import { useState, useEffect, useRef } from 'react';
import { Bot, MessageSquare, X, ArrowLeftCircle, Loader } from 'lucide-react';
import { createDirectus, rest, readItems } from '@directus/sdk';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [contentStructure, setContentStructure] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainMenuKey, setMainMenuKey] = useState(null);

  const messagesEndRef = useRef(null);
  const [txtVolver, setVolver] = useState(["Principal"]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const fetchChatbotData = async () => {
      try {
        setLoading(true);
        setError(null);

        const directus = createDirectus('http://localhost:8055').with(rest());
        const response = await directus.request(readItems('MensajesChatbot'));
        const data = response.data || response;

        const messageMap = {};
        data.forEach(item => {
          messageMap[item.id] = {
            id: item.id,
            title: item.titulo,
            text: item.mensaje,
            children: item.mensajes || []
          };
        });

        
        const processedStructure = {};
        Object.values(messageMap).forEach(item => {
          const buttons = item.children.map(childId => messageMap[childId]?.title).filter(Boolean);
          processedStructure[item.title] = {
            text: item.text,
            buttons: buttons.length > 0 ? buttons : undefined
          };
        });

        const rootItem = data.find(item => item.parent_message_id === null);
        const rootTitle = rootItem?.titulo || "Principal";

        setContentStructure(processedStructure);
        setMainMenuKey(rootTitle);

        const initialMessages = [
          { from: 'bot', text: '¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte hoy?' }
        ];

        if(processedStructure[rootTitle]?.buttons) {
          initialMessages.push({
            from: 'bot',
            type: 'buttons',
            category: rootTitle,
            buttons: processedStructure[rootTitle].buttons
          });
        }

        setMessages(initialMessages);
      } catch (err) {
        console.error('Error al cargar datos del chatbot:', err);
        setError('Error al conectar con el servidor. Por favor intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchChatbotData();
  }, []);

  const handleButtonClick = (buttonText) => {
    setMessages(prev => [...prev, { from: 'user', text: buttonText }]);
    setTyping(true);

    setTimeout(() => {
      const content = contentStructure[buttonText];

      if (!content || !content.text) {
        setTyping(false);
        return;
      }

      const newMessages = [];
      setVolver(prev => [...prev, buttonText]);
      newMessages.push({ from: 'bot', text: content.text });

      if (content.buttons && content.buttons.length > 0) {
        newMessages.push({
          from: 'bot',
          type: 'buttons',
          category: buttonText,
          buttons: content.buttons
        });
      }

      setMessages(prev => [...prev, ...newMessages]);
      setTyping(false);
    }, 800);
  };

  const resetToMainMenu = () => {
    if (!mainMenuKey || !contentStructure[mainMenuKey]) return;

    setMessages([
      { from: 'bot', text: '¿En qué más puedo ayudarte?' },
      {
        from: 'bot',
        type: 'buttons',
        category: mainMenuKey,
        buttons: contentStructure[mainMenuKey].buttons
      }
    ]);
    setVolver(["Principal"]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !loading && mainMenuKey && contentStructure[mainMenuKey]) {
      setMessages([
        { from: 'bot', text: '¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte hoy?' },
        {
          from: 'bot',
          type: 'buttons',
          category: mainMenuKey,
          buttons: contentStructure[mainMenuKey].buttons
        }
      ]);
    }
  };

  const renderButtons = (buttons, category) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {buttons.map((btnText, index) => (
        typeof btnText === 'string' && (
          <button
            key={`${category}-${index}`}
            onClick={() => handleButtonClick(btnText)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition whitespace-nowrap"
          >
            {btnText}
          </button>
        )
      ))}
    </div>
  );

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-700 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={28} />
      </button>

      <div
        className={`fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{ maxHeight: '500px' }}
      >
        <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="mr-2" />
            <h2 className="font-bold">Asistente Virtual</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={resetToMainMenu}
              className="p-1 rounded-full hover:bg-blue-500 transition"
              title="Volver al menú principal"
              disabled={loading}
            >
              <ArrowLeftCircle size={24} />
            </button>
            <button
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-blue-500 transition"
              title="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto" style={{ height: '400px' }}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center">
                <Loader className="animate-spin mb-2" size={24} />
                <p className="text-sm text-gray-600">Cargando...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded mb-3 text-sm">
              {error}
            </div>
          ) : null}

          {!loading && messages.map((msg, i) => (
            <div key={i} className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'buttons' ? (
                <div className="w-full">
                  {renderButtons(msg.buttons, msg.category)}
                </div>
              ) : (
                <div className={`px-3 py-2 rounded max-w-[80%] text-sm ${msg.from === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                  {msg.text.split('\n').map((paragraph, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex justify-start mb-3">
              <div className="bg-gray-200 px-3 py-2 rounded rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
}

export default ChatBot;
