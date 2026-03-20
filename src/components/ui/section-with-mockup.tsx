"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionWithMockupProps {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    primaryImageSrc: string;
    secondaryImageSrc: string;
    reverseLayout?: boolean;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    reverseLayout = false,
}) => {

    const containerVariants = {
        hidden: {},
        visible: {
             transition: {
                staggerChildren: 0.2,
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const layoutClasses = reverseLayout
        ? "md:grid-cols-2 lg:grid-flow-col-dense"
        : "md:grid-cols-2";

    const textOrderClass = reverseLayout ? "md:col-start-2" : "";
    const imageOrderClass = reverseLayout ? "md:col-start-1" : "";


    return (
        <section className="relative py-24 md:py-32 bg-transparent overflow-hidden">
            <div className="max-w-6xl w-full px-6 relative z-10 mx-auto">
                <motion.div
                     className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Text Content */}
                    <motion.div
                        className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-xl mx-auto md:mx-0 ${textOrderClass}`}
                        variants={itemVariants}
                    >
                         <div className="space-y-4 md:space-y-6">
                            <h2 className="text-[#f4ebd0] text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1]">
                                {title}
                            </h2>
                            <div className="text-[#9ca3af] text-lg md:text-xl leading-relaxed space-y-4">
                                {description}
                            </div>
                        </div>
                    </motion.div>

                    {/* App mockup/Image Content */}
                    <motion.div
                        className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[471px]`}
                        variants={itemVariants}
                    >
                        {/* Decorative Background Element */}
                        <motion.div
                             className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#2196f3]/10 rounded-[32px] z-0`}
                             style={{
                                top: reverseLayout ? 'auto' : '10%',
                                bottom: reverseLayout ? '10%' : 'auto',
                                left: reverseLayout ? 'auto' : '-20%',
                                right: reverseLayout ? '-20%' : 'auto',
                                transform: reverseLayout ? 'translate(0, 0)' : 'translateY(10%)',
                                filter: 'blur(10px)'
                            }}
                            initial={{ y: reverseLayout ? 0 : 0 }}
                            whileInView={{ y: reverseLayout ? -20 : -30 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <div
                                className="relative w-full h-full bg-cover bg-center rounded-[32px] opacity-30"
                                style={{
                                    backgroundImage: `url(${secondaryImageSrc})`,
                                }}
                            />
                        </motion.div>

                        {/* Main Mockup Card */}
                        <motion.div
                            className="relative w-full h-[405px] md:h-[637px] bg-[#111]/80 rounded-[32px] backdrop-blur-[15px] border border-[#333] z-10 overflow-hidden shadow-2xl shadow-black/50"
                            initial={{ y: reverseLayout ? 0 : 0 }}
                            whileInView={{ y: reverseLayout ? 20 : 30 }}
                             transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                             viewport={{ once: true, amount: 0.5 }}
                        >
                            <div className="p-0 h-full">
                                <div
                                    className="h-full relative"
                                    style={{
                                        backgroundSize: "100% 100%",
                                    }}
                                >
                                    {/* Primary Image */}
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${primaryImageSrc})`,
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};


export default SectionWithMockup;
