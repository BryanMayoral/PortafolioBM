import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PerfilPortafolio from "C:/Users/brmay/OneDrive/Documents/NodeJS/react-app/src/components/PerfilPortafolio.jpg";

function App(){
  return (
    <CV/>
  );
}

function CV(){
  return(
    <>
      <body class="bg-gray-100 text-gray-900">
        <header class="bg-blue-600 text-white py-6 text-center">
          <title>Portafolio Bryan Mayoral</title>
          <h1 class="text-3xl font-bold">Bryan Omar Mayoral Gonzalez</h1>
          <p class="text-lg">Semiexperto en Java | Desarrollador Web</p>
          <img src={PerfilPortafolio} alt="Perfil" class="mx-auto mt-4 w-32 h-32 rounded-full border-4 border-white shadow-lg"></img>
        </header>
    
        <main class="max-w-4xl mx-auto p-6">
          <section class="mb-8">
            <h2 class="text-2xl font-semibold">Sobre mí</h2>
            <p class="mt-2">Soy un apasionado por la tecnología y el desarrollo web.</p>
          </section>
          
          <section class="mb-8">
            <h2 class="text-2xl font-semibold">Experiencia</h2>
            <ul class="list-disc list-inside mt-2">
              <li><strong>PLAi</strong> - Desarrollador Web Becario</li>
              <li><strong>UNEDL</strong> - Proyectos personales</li>
            </ul>
          </section>
          
          <section class="mb-8">
            <h2 class="text-2xl font-semibold">Habilidades laborales</h2>
            <ul class="grid grid-cols-2 gap-2 mt-2">
              <li class="bg-blue-200 p-2 rounded">HTML</li>
              <li class="bg-blue-200 p-2 rounded">CSS</li>
              <li class="bg-blue-200 p-2 rounded">JavaScript</li>
              <li class="bg-blue-200 p-2 rounded">Python</li>
              <li class="bg-blue-200 p-2 rounded">Java</li>
            </ul>
          </section>
          
          <section>
            <h2 class="text-2xl font-semibold">Contacto</h2>
            <p class="mt-2">Email: <a href="mailto:brmayoralg@gmail.com" class="text-blue-600">brmayoralg@gmail.com</a></p>
            <p>Tel: <a href="tel:+3315373501" class="text-blue-600">+33 1537 3501</a></p>
          </section>
        </main>
      </body>
    </>
  );
}

export default App