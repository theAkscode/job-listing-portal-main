import {motion} from 'framer-motion'

const animations = {
    initial: {opacity:0,x:5},
    animate: {opacity:1,x:0},
    exit: {opacity:0,x:-5},
}

const Animation = ({children}) =>{
    return (
        <motion.div 
            variants={animations} 
            initial='initial' 
            animate='animate' 
            exit='exit'
            transition={{duration:0.15}}
        >
            {children}
        </motion.div>
    )
}

export default Animation;