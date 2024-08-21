import React from "react";
import { motion } from "framer-motion";

// Import the Google Font directly within your component
const googleFontLink = document.createElement("link");
googleFontLink.href =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
googleFontLink.rel = "stylesheet";
document.head.appendChild(googleFontLink);

function Video() {
  return (
    <div
      className="flex flex-col lg:flex-row  h-auto"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Right Side - Titles and Text */}
      <div className="w-full lg:w-full flex flex-col justify-center items-start p-8 lg:p-0  text-gray-800">
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-bardum"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Assurance Partners LLC
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl lg:text-2xl mb-6  text-gray-700 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          light
        >
          Your Gateway to Financial Success.
        </motion.p>
        <motion.p
          className="text-base md:text-lg lg:text-xl leading-relaxed mb-8 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          At Assurance Partners LLC, we specialize in crafting business
          promotion strategies that ensure long-term financial stability and
          growth. Our expert team is dedicated to helping you reach your
          business goals with precision and professionalism.
        </motion.p>
      </div>
    </div>
  );
}

export default Video;
