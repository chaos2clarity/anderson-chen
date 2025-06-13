import { motion } from 'framer-motion'
import React from 'react'

const BottomEditorialLine = () => {
  return (
    <div>
        <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 pt-2"
          >
            <div className="flex items-center justify-between">
              <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent"></div>
              <div className="px-6 text-xs text-white/40 whitespace-nowrap">
                Anderson Chen Studio
              </div>
              <div className="w-full h-[1px] bg-gradient-to-l from-white/20 via-white/40 to-transparent"></div>
            </div>
          </motion.div> 
    </div>
  )
}

export default BottomEditorialLine