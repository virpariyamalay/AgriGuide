import React from 'react';
import { motion } from 'framer-motion';
import PopularCrops from '../crops/PopularCrops';

const PopularCropsSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <PopularCrops />
                </motion.div>
            </div>
        </section>
    );
};

export default PopularCropsSection; 