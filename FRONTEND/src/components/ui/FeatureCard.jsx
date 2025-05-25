import { motion } from 'framer-motion'

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-primary-50 p-6 rounded-lg"
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export default FeatureCard