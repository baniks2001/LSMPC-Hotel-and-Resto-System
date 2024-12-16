import { MapPin, Phone, Mail, Globe, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/shared/AnimatedCard';
import FadeIn from '../components/shared/FadeIn';
import Hotel2 from '../components/images/hotel2.jpg';
import { useEffect, useState } from 'react';


import HotelImage1 from '../components/images/hotel2.jpg';
import HotelImage2 from '../components/images/all.jpg';
import HotelImage3 from '../components/images/dormitory.jpg';
import HotelImage4 from '../components/images/deluxe.jpg';
import HotelImage5 from '../components/images/HotelBackground.jpg';
import HotelImage6 from '../components/images/premiere.jpg';

const images = [HotelImage1, HotelImage2, HotelImage3, HotelImage4, HotelImage5, HotelImage6]; 

export default function AboutUs() {
  const [currentImage, setCurrentImage] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <section
      id="about-us"
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage: `url(${Hotel2})`,
      }}
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-8">
        <AnimatedCard className="bg-green-50/95 backdrop-blur-sm shadow-lg rounded-lg p-8 hover:shadow-2xl transition-all duration-300">
          <FadeIn>
            <h2 className="text-4xl font-bold text-green-600 mb-6">About Us</h2>
            <p className="text-xl text-gray-800 mb-4">
              Welcome to <strong>LSMPC Hotel and Resto</strong> — your perfect
              getaway for relaxation and comfort. We offer a blend of modern
              amenities and traditional hospitality to ensure your stay is
              enjoyable. Experience delicious local cuisine at our restaurant.
            </p>
            <p className="text-xl text-gray-800 italic">
              'The place where you'd rather be to stay!'
            </p>
          </FadeIn>
        </AnimatedCard>

        <AnimatedCard
          className="bg-green-50/95 backdrop-blur-sm space-y-4 shadow-lg rounded-lg p-8 hover:shadow-2xl transition-all duration-300"
          delay={0.2}
        >
          <h2 className="text-2xl font-bold text-green-600 mb-4">Contact Information</h2>

          {[{
            icon: Facebook,
            text: 'Leyte South MPC Hotel and Resto',
            href: 'https://www.facebook.com/profile.php?id=100057335564173',
          },
          {
            icon: MapPin,
            text: 'Pres. Quezon Street, Busay District, Liloan, Philippines',
          },
          {
            icon: Phone,
            text: '0908 925 9074 (GLOBE)',
          },
          {
            icon: Mail,
            text: 'leytesouthmpc@gmail.com',
          },
          {
            icon: Globe,
            text: 'leytesouthmpc.com',
            href: 'http://leytesouthmpc.com',
          }].map(({ icon: Icon, text, href }, index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 py-2 px-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Icon className="w-6 h-6 text-green-600 flex-shrink-0" />
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  {text}
                </a>
              ) : (
                <span className="text-gray-700">{text}</span>
              )}
            </motion.div>
          ))}
        </AnimatedCard>
      </div>

      {/* Image Gallery Section */}
      <div className="mt-3 py-2 shadow-xl rounded-lg overflow-hidden">
        

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Gallery Images */}
          <motion.div
            className="flex transition-all duration-1000"
            style={{ width: '100%' }}
            animate={{
              x: `-${currentImage * 100}%`,
            }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="min-w-full flex items-center justify-center"
                style={{
                  height: '400px', 
                }}
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border-4 border-green-600"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
