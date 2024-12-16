import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroProps {
  firstPhrase: string;
  secondPhrase: string;
}


import Hotel2 from '../images/hotel2.jpg';
import All from '../images/all.jpg';
import Dormitory from '../images/dormitory.jpg';
import Deluxe from '../images/deluxe.jpg';
import Premiere from '../images/premiere.jpg';
import FunctionHall from '../images/functionhall.jpg';

const images = [Hotel2, All, Dormitory, Deluxe, Premiere, FunctionHall];

export default function Hero({ firstPhrase, secondPhrase }: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <section className="min-h-screen bg-cover bg-center px-4 py-8 sm:px-8 sm:py-16 flex items-center justify-center relative overflow-hidden">
      {/* Slideshow Background */}
      <motion.div
        key={currentImage} 
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center center', 
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      ></motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-green-50/90 p-8 sm:p-16 rounded-3xl backdrop-blur-md max-w-lg sm:max-w-4xl shadow-2xl transform hover:scale-105 hover:rotate-2 transition-all z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl sm:text-5xl font-bold text-green-600 mb-8 text-center shadow-lg transform hover:scale-110 transition-all"
        >
          WELCOME TO
          <br />
          LSMPC Hotel & Resto
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl sm:text-2xl text-gray-700 text-center mb-4 font-medium shadow-md transform hover:scale-105 transition-all"
        >
          Pres. Quezon Street, Busay District, Liloan, Philippines
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-xl sm:text-2xl text-gray-800 italic text-center mb-4 font-light shadow-sm transform hover:scale-105 transition-all"
        >
          {firstPhrase}
          <br />
          {secondPhrase}
        </motion.p>
      </motion.div>

      {/* Dimmed overlay to add depth */}
      <div className="absolute inset-0 z-10 bg-black opacity-5"></div>
    </section>
  );
}
