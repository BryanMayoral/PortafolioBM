import { useState, useEffect, useRef } from 'react';
import { Bot, User, MessageSquare, X,ArrowLeftCircle} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
  
      <header className="bg-blue-600 text-white p-6 shadow-md flex flex-col items-center justify-center space-y-4">
        <img
          src="src/components/PerfilPortafolio.jpg"
          alt="Foto de perfil"
          className="w-20 h-20 rounded-full border-2 border-white object-cover"
        />
        <h1 className="text-3xl font-bold">Bryan Mayoral</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8 font-serif">
    
        <section>
          <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Perfil Laboral</h2>
          <p>
            Soy un desarrollador de software apasionado por crear soluciones tecnológicas eficientes y centradas en el usuario. Me especializo en desarrollo web con React y en aplicaciones de escritorio con Java.
          </p>
        </section>

        
        <section>
          <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Proyectos</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Chatbot para Plai usando React</li>
            <li>Cotizador desarrollado en Java</li>
          </ul>
        </section>

        
        <section>
          <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Nivel de Estudio</h2>
          <p>Estudié Ingeniería en Software en la UNEDL.</p>
        </section>
      </main>
      <ChatBot/>
    </div>
  );
}

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el asistente virtual de PLAI. ¿En qué puedo ayudarte hoy?' },
    { from: 'bot', type: 'buttons', category: 'main' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const contentStructure = {
    main: {
      buttons: ['Oferta académica', 'Espacios', 'Campus Virtual', 'Servicios tecnológicos', 'PLAI', 'Vinculación'],
      text: 'Selecciona una opción para obtener más información:'
    },
    'Oferta académica': {
      buttons: ['Cursos y programas', 'Inscripciones', 'Modalidades de cursos', 'Sesiones grabadas', 'Problemas con cursos'],
      text: 'PLAI ofrece una variedad de opciones educativas:'
    },
    'Cursos y programas': {
      text: 'Desde PLAI, en alianza con especialistas locales, nacionales e internacionales, desarrollamos e impulsamos una oferta educativa compuesta por talleres, cursos y programas de vanguardia, en las modalidades presencial, híbrida y virtual.\n\nPara conocer toda la oferta de cursos y programas de PLAI visita: https://aprender.plai.mx/'
    },
    'Inscripciones': {
      text: 'Para inscribirte a nuestra oferta educativa:\n\n1. Necesitas una cuenta en PLAI (si no tienes una, consulta cómo crearla)\n2. Ingresa a https://campus.plai.mx\n3. Inicia sesión\n4. Accede a "Aprender"\n5. Selecciona el curso de tu preferencia\n6. Haz click en "Inscribirme"\n\nRecibirás un correo de confirmación si la inscripción fue exitosa.'
    },
    'Modalidades de cursos': {
      text: 'La oferta educativa de PLAI está disponible en tres modalidades:\n\n- Presencial\n- Híbrida\n- Virtual\n\nPara conocer la modalidad de un curso específico:\n1. Ingresa a https://aprender.plai.mx/\n2. Busca el curso\n3. Haz click en "Información + programa detallado"\n4. Verás la modalidad en la parte inferior derecha'
    },
    'Sesiones grabadas': {
      text: 'Si te perdiste una sesión:\n\n1. Ingresa a https://campus.plai.mx\n2. Ve a "Mis cursos"\n3. Selecciona "Ver curso"\n4. Consulta el apartado de módulos\n5. Encuentra la sesión que necesitas\n\nNota: Las grabaciones estarán disponibles 2 días hábiles después de la sesión y no todos los cursos tienen grabaciones.'
    },
    'Problemas con cursos': {
      buttons: ['No puedo ingresar', 'No aparece mi curso', 'No recibí confirmación', 'Error en la página'],
      text: 'Selecciona el problema que estás experimentando:'
    },
    'No puedo ingresar': {
      text: 'Si tienes problemas para acceder a tu curso:\n\n1. Verifica que ya hayas creado una cuenta\n2. Confirma que el correo y contraseña sean correctos\n3. Intenta ingresar desde https://campus.plai.mx\n4. Asegúrate de tener conexión a internet estable\n5. Verifica la fecha de inicio del curso\n\nSi el problema persiste, contacta a soporte.'
    },
    'No aparece mi curso': {
      text: 'Si no ves tu curso:\n\n1. Ingresa a https://campus.plai.mx\n2. Ve a "Mis cursos"\n3. Verifica que hayas recibido el correo de confirmación\n\nSi aún no aparece, contacta a soporte.'
    },
    'No recibí confirmación': {
      text: 'Si no recibiste el correo de confirmación:\n\n1. Verifica que completaste la inscripción\n2. Revisa todas las bandejas de tu correo (incluyendo spam)\n3. Confirma que usaste el correo correcto\n\nSi aún no lo encuentras, contacta a soporte.'
    },
    'Error en la página': {
      text: 'Si la página de tu curso muestra errores:\n\n1. Verifica tu conexión a internet\n2. Limpia el caché de tu navegador\n3. Intenta en modo incógnito o con otro navegador\n\nSi el problema persiste, puede ser un error temporal del sistema.'
    },
    'Espacios': {
      buttons: ['Reservar espacio', 'Auditorio', 'Aulas flexibles', 'Cowork', 'Laboratorios', 'Ubicación', 'Horarios'],
      text: 'PLAI cuenta con diversos espacios físicos para diferentes necesidades:'
    },
    'Reservar espacio': {
      text: 'Para reservar un espacio en PLAI:\n\n1. Ingresa a https://plai.mx/reservarespaciosfisicos\n2. Llena el formulario\n3. Recibirás respuesta en 48 horas hábiles\n\nRecomendamos solicitarlo con al menos 15 días de anticipación.'
    },
    'Auditorio': {
      text: 'Auditorio:\n\n- Capacidad: 200 personas\n- Horario: L-V 10:00-20:00h\n- Equipamiento:\n  • 3 proyectores HD\n  • 2 Smart TV 75"\n  • Sistema de sonido\n  • Micrófonos\n  • Podium\n  • Acceso para discapacidad'
    },
    'Aulas flexibles': {
      text: 'Aulas flexibles:\n\n- Capacidad: 20, 26 y 40 personas\n- Horario: L-V 10:00-20:00h\n- Características:\n  • Mobiliario adaptable\n  • Equipo tecnológico\n  • Ideales para talleres y cursos'
    },
    'Cowork': {
      text: 'Espacio Cowork:\n\n- Capacidad: 20 personas\n- Horario: L-V 10:00-21:00h\n- Equipamiento:\n  • Mesas de trabajo\n  • Proyectores\n  • Muro blanco\n  • Ambiente colaborativo'
    },
    'Laboratorios': {
      buttons: ['Realidad Virtual', 'Robótica', 'Coding-Gaming', 'Multimedia'],
      text: 'PLAI cuenta con laboratorios especializados:'
    },
    'Realidad Virtual': {
      text: 'Laboratorio de Realidad Virtual:\n\n- Capacidad: 40 personas\n- Horario: L-V 08:00-20:00h\n- Equipamiento:\n  • Visores de RV\n  • Computadoras especializadas\n  • Pantallas 4K\n\nIdeal para explorar aplicaciones de RV en educación, salud, etc.'
    },
    'Robótica': {
      text: 'Laboratorio de Robótica:\n\n- Capacidad: 20 personas\n- Horario: L-V 08:00-20:00h\n- Equipamiento:\n  • Kits de robótica\n  • Sensores digitales\n  • Drones\n  • iPads\n\nEnfocado en STEM y makers.'
    },
    'Coding-Gaming': {
      text: 'Laboratorio Coding-Gaming:\n\n- Capacidad: 20 personas\n- Horario: L-V 08:00-20:00h\n- Equipamiento:\n  • Computadoras Alienware\n  • Smart TV 4K\n  • Equipo para desarrollo de videojuegos\n\nIdeal para programadores y gamers.'
    },
    'Multimedia': {
      text: 'Estudio Multimedia:\n\n- Capacidad: 5 personas\n- Horario: L-V 10:00-17:00h\n- Equipamiento:\n  • Cámaras profesionales\n  • Sistema de audio\n  • Fondo verde\n  • Iluminación\n\nPerfecto para producción de video y podcast.'
    },
    'Ubicación': {
      text: 'PLAI se encuentra en:\n\nTorre C de Ciudad Creativa Digital\nCalle Independencia N°55, Zona Centro\nGuadalajara, Jalisco\n\nVer en mapa: https://maps.app.goo.gl/uJUU3MDGRb2NWcxh8\n\nTransporte público: Rutas 500, 153-CTM, 258, 39 o 400 (Trolebús)'
    },
    'Horarios': {
      text: 'Horarios generales de espacios:\n\n- Auditorio: 10:00-20:00h\n- Aulas: 10:00-20:00h\n- Cowork: 10:00-21:00h\n- Laboratorios: 08:00-20:00h\n- Estudio Multimedia: 10:00-17:00h\n\nLunes a viernes, excepto días festivos.'
    },
    'Servicios tecnológicos': {
      buttons: ['Producción de contenido', 'Diseño de cursos virtuales', 'Virtualización de cursos', 'Asesorías para producción'],
      text: 'PLAI ofrece los siguientes servicios tecnológicos:'
    },
    'Producción de contenido': {
      text: 'En PLAI, diseñamos, desarrollamos, virtualizamos y brindamos asesorías personalizadas para la producción de contenido educativo con base en el modelo ADDIE: Análisis, Diseño, Desarrollo, Implementación.'
    },
    'Diseño de cursos virtuales': {
      text: 'PLAI brinda este servicio a personas e instituciones que requieren contenido educativo virtual. Este servicio incluye realizar el diseño institucional y multimedia, así como orientación en el diseño curricular, atendiendo las necesidades de la persona o institución solicitante para entregar un contenido hecho a la medida.'
    },
    'Virtualización de cursos': {
      text: 'El servicio de virtualización de cursos en PLAI tiene como objetivo desarrollar un producto educativo que pueda distribuirse por medios digitales, abarca la generación de contenido desde cero o la virtualización de contenido presencial.',
      buttons: ['Contactar para virtualización']
    },
    'Asesorías para producción': {
      text: 'En PLAI, somos expertos en la producción de contenido educativo y en habilitar espacios de aprendizaje virtuales o híbridos.',
      buttons: ['Contactar para asesoría']
    },
    'Contactar para virtualización': {
      text: 'Para solicitar virtualización de cursos:\n\n1. Visita https://plai.mx/contacto\n2. Llena tus datos personales\n3. Selecciona categoría "Alianzas"\n4. En asunto elige "Virtualización de cursos"\n5. Describe tu solicitud'
    },
    'Contactar para asesoría': {
      text: 'Para solicitar asesoría:\n\n1. Visita https://plai.mx/contacto\n2. Llena tus datos personales\n3. Selecciona categoría "Alianzas"\n4. En asunto elige "Producción de contenido educativo"\n5. Describe tu solicitud'
    },
    'Campus Virtual': {
      buttons: ['Editar información de cuenta', 'Recuperar cuenta', 'Problemas para ingresar', 'Cambiar correo electrónico'],
      text: 'El Campus Virtual PLAI es un espacio virtual donde, mediante un solo punto de acceso, podrás ingresar a cursos, contenidos y otros servicios.'
    },
    'Editar información de cuenta': {
      text: 'Para editar la información de tu perfil:\n\n1. Accede a http://campus.plai.mx\n2. Haz click en "Aprender"\n3. Haz click en tu correo y selecciona "Mi perfil"\n4. Realiza los cambios\n5. Haz click en "Guardar"'
    },
    'Recuperar cuenta': {
      text: 'Para recuperar tu cuenta:\n\n1. Ingresa a https://campus.plai.mx/\n2. Haz click en "¿Olvidaste tu contraseña?"\n3. Proporciona tu correo\n4. Sigue las instrucciones en el correo que recibirás\n\nEl enlace de recuperación expira en 30 minutos.'
    },
    'Problemas para ingresar': {
      text: 'Si no puedes ingresar:\n\n1. Verifica que el correo sea correcto\n2. Confirma la contraseña\n3. Prueba otro navegador o red\n\nSi persiste el problema, contacta a soporte.'
    },
    'Cambiar correo electrónico': {
      text: 'Para cambiar el correo asociado a tu cuenta:\n\n1. Contacta a soporte a través de https://plai.mx/contacto\n2. Selecciona "Usuario y contraseña"\n3. Elige "Cambiar correo electrónico"\n4. Indica el correo actual y el nuevo'
    },
    'PLAI': {
      buttons: ['¿Qué es PLAI?', '¿Qué es Aprender?', '¿Qué es Conectar?', '¿Qué es Innovar?', 'Redes sociales'],
      text: 'PLAI es la Plataforma Abierta de Innovación y Desarrollo del Estado de Jalisco.'
    },
    '¿Qué es PLAI?': {
      text: 'La Plataforma Abierta de Innovación y Desarrollo del Estado de Jalisco (PLAI) es una Institución de Educación Superior con sede física y virtual, que promueve el desarrollo de competencias y habilidades para los empleos y demandas de la era digital.'
    },
    '¿Qué es Aprender?': {
      text: 'Eje orientado a las competencias del futuro y el desarrollo de talento. Contamos con una oferta enfocada en cubrir la demanda de talento de empresas tecnológicas y en desarrollar las habilidades requeridas para responder a las tendencias de la era digital.'
    },
    '¿Qué es Conectar?': {
      text: 'A través de este eje se pueden conectar personas y/o comunidades académicas, de investigación, de innovación, de emprendimiento, creativas y sociales de Jalisco, para el fomento a la creatividad y el desarrollo de soluciones a retos sociales.'
    },
    '¿Qué es Innovar?': {
      text: 'PLAI apoya mediante asesorías y mentorías la mejora de capacidades empresariales, científicas y tecnológicas de nuestro Estado. Se busca acelerar la innovación, incrementar la competitividad y transferir conocimientos.'
    },
    'Redes sociales': {
      text: 'Síguenos en:\n\n- Facebook: https://www.facebook.com/plai.mx\n- Instagram: https://www.instagram.com/plai.mx/\n- Twitter: https://twitter.com/plai_mx\n- LinkedIn: https://mx.linkedin.com/school/plaimx/\n- YouTube: https://www.youtube.com/c/PLAimx\n\nWhatsApp: 33 1410 1620\nTeléfono: 33 1253 4700'
    },
    'Vinculación': {
      buttons: ['Servicio social', 'Prácticas profesionales', 'Bolsa de trabajo', 'Red de talento', 'Impartir cursos'],
      text: 'Opciones de vinculación con PLAI:'
    },
    'Servicio social': {
      text: 'Para servicio social en PLAI:\n\n1. Verifica si tu institución tiene convenio\n2. Consulta las áreas disponibles\n3. Solicita información en https://plai.mx/contacto\n\nÁreas comunes: Alianzas, Laboratorios, Redes sociales, Diseño, etc.'
    },
    'Prácticas profesionales': {
      text: 'Para prácticas profesionales:\n\n1. Confirma si tu institución tiene convenio\n2. Revisa las áreas disponibles\n3. Contacta a tu unidad de prácticas\n4. O envía solicitud a través de https://plai.mx/contacto'
    },
    'Bolsa de trabajo': {
      text: 'Para unirte al equipo de PLAI:\n\n1. Envía tu CV a través de https://plai.mx/contacto\n2. Selecciona "Bolsa de trabajo"\n3. Elige "Unirse al equipo"\n\nTambién puedes ver vacantes en: https://plai.zohorecruit.com/jobs/Careers'
    },
    'Red de talento': {
      text: 'La Red de Talento conecta egresados con empleadores:\n\n1. Únete a la Comunidad Virtual de Aprendizaje en WhatsApp\n2. Accede a https://conectar.plai.mx/\n3. Publica tu perfil o busca vacantes\n\nSubgrupos disponibles: Oportunidades, Emprende, PyMEs, Conecta tu talento'
    },
    'Impartir cursos': {
      text: 'Para impartir un curso en PLAI:\n\n1. Visita https://plai.mx/contacto\n2. Selecciona "Alianzas"\n3. Elige "Impartir un curso"\n4. Describe tu propuesta\n\nTemas preferentes: Innovación, Industria 4.0, Tecnologías, Soft Skills'
    }
  };

  const handleButtonClick = (category) => {
    setMessages(prev => [
      ...prev,
      { from: 'user', text: category }
    ]);
    
    setTyping(true);
    
    setTimeout(() => {
      const content = contentStructure[category];
      
      if (content) {
        const newMessages = [];
        
        if (content.text) {
          newMessages.push({ from: 'bot', text: content.text });
        }
        
        if (content.buttons) {
          newMessages.push({ from: 'bot', type: 'buttons', category });
        }
        
        setMessages(prev => [...prev, ...newMessages]);
      } else {
        setMessages(prev => [...prev, { from: 'bot', text: `Lo siento, no tengo información sobre "${category}" en este momento.` }]);
      }
      
      setTyping(false);
    }, 800);
  };

  const resetToMainMenu = () => {
    setMessages([
      { from: 'bot', text: '¿En qué más puedo ayudarte?' },
      { from: 'bot', type: 'buttons', category: 'main' }
    ]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([
        { from: 'bot', text: '¡Hola! Soy el asistente virtual de PLAI. ¿En qué puedo ayudarte hoy?' },
        { from: 'bot', type: 'buttons', category: 'main' }
      ]);
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-700 ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageSquare size={28} />
      </button>

      
      <div
        className={`fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg flex flex-col transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ maxHeight: '500px' }}
      >
      
        <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="mr-2" />
            <h2 className="font-bold">Asistente PLAI</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={resetToMainMenu}
              className="p-1 rounded-full hover:bg-blue-500 transition"
              title="Volver al menú principal"
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
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'buttons' ? (
                <div className="w-full">
                  <div className="flex flex-wrap gap-2">
                    {(contentStructure[msg.category]?.buttons || []).map((btnText) => (
                      <button
                        key={btnText}
                        onClick={() => handleButtonClick(btnText)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                      >
                        {btnText}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className={`px-3 py-2 rounded max-w-[80%] text-sm ${
                    msg.from === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
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

export default App;