
import { motion } from 'framer-motion'

export function Homepage({ pageOn }) {

    return (
        <motion.div layout style={{ width: '100%', height: '80%', paddingLeft: '10%' }}
        animate={{ opacity: pageOn?1:0 }}
        transition={{ duration: 0.4 }}
        >
            <h2>Homepage</h2>
            <p>Lorem ipsum</p>
        </motion.div>
    )
}