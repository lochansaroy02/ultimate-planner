"use client";

import { useIsOpenStore } from '@/store/accordianStore';
import { AnimatePresence, motion } from 'framer-motion';


const Child = ({ children }) => {
    const { isOpen, toggleIsOpen } = useIsOpenStore();

    return (
        <div className='w-3/4 md:w-1/2'>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='overflow-hidden px-4 py-3 bg-neutral-700 rounded-b-xl'
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Child