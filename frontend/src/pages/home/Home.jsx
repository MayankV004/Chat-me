import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import { motion } from "motion/react"
function Home() {
  return (
    <motion.div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
        delay: 0.1,
      }}
    >
			<Sidebar />
			<MessageContainer />
		</motion.div>
  )
}

export default Home