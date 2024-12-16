import { motion } from 'framer-motion';
import { CardProps } from '../shared/Card';

interface AnimatedCardProps extends CardProps {
  delay?: number;
  title: string;
  children: React.ReactNode;
  className: React.ReactNode;
}



export default function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}