import React, { useState, useEffect } from "react";
import { FaBuilding, FaUniversity, FaShieldAlt } from "react-icons/fa";
import slidernew from "../assets/hero-img.png";
import DiscoverSolutions from "./DiscoverSolutions";
import Percentage from "../components/Percentage";
import Video from "./home/Video";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./marquee.css"; // Import the custom CSS for marquee
const slides = [
  {
    image: slidernew,
    title: "Accelerate Your Business Growth with",
    highlight: "Performance Marketing",
    description:
      "Unlock the potential of your business by leveraging cutting-edge marketing strategies that drive measurable growth and deliver exceptional ROI.",
  },
  {
    image: slidernew,
    title: "Enhance Brand Visibility through",
    highlight: "Targeted Campaigns",
    description:
      "Boost your brand's presence and engage the right audience with precision-targeted marketing efforts designed for maximum impact.",
  },
  {
    image: slidernew,
    title: "Drive Success with",
    highlight: "Data-Driven Strategies",
    description:
      "Empower your business decisions with data-driven insights that lead to sustainable growth and long-term success in a competitive market.",
  },
];
const marqueeItems = [
  "10+ Years of Experience",
  "890 Cases Solved",
  "250 Business Partners",
  "Tailored Financial Solutions",
  "10+ Years of Experience",
  "890 Cases Solved",
  "250 Business Partners",
  "Tailored Financial Solutions",
  "250 Business Partners", // Duplicate item example
];
const serviceItems = [
  {
    icon: <FaBuilding />,
    title: "Corporate Services",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: <FaUniversity />,
    title: "Banking Institutions",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Insurance Solutions",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change slide every 8 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);
  return (
    <>
      <div className="font-sans max-w-[80rem] max-md:max-w-md mx-auto">
        <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6">
          {/* Text Section (Left) */}
          <motion.div
            className="sm:mt-30px mt-10 order-1 md:order-1 text-center md:text-left  relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-gray-800 lg:text-6xl md:text-5xl text-3xl font-extrabold mb-4 md:!leading-[56px]">
              <span className="text-bardum">Assuring</span> Your Future
              <span className="text-bardum"> and Financial Success</span>
            </h2>
            <p className="text-gray-700 mt-6 text-base leading-relaxed px-4 md:px-0">
              At Assurance Partners LLC, we guide you through every step of your
              financial journey. Whether you're planning for retirement,
              investing, or seeking comprehensive solutions, our expert team is
              here to ensure your goals are achieved with precision and care.
              Trust us to navigate the complexities of financial planning, so
              you can enjoy a secure and prosperous future.
            </p>
            <Link to="/HomeEquity">
              <button
                type="button"
                className="mt-6 bg-transparent hover:bg-bardum hover:text-white border-2 border-bardum transition-all text-bardum font-semibold text-sm tracking-wide rounded-md px-6 py-2.5"
              >
                Get Started
              </button>
            </Link>
          </motion.div>
          {/* Image Section (Right) */}
          <motion.div
            className="lg:h-[550px] w-full md:h-[550px] flex items-center justify-center relative order-2 md:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={slides[currentIndex].image}
              className="rounded-md w-full h-auto mt-8 max-w-full max-h-full object-cover relative "
              alt={slides[currentIndex].title}
            />
          </motion.div>
        </div>
        {/* Marquee Section */}
        <motion.div
          className="relative mt-12 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="marquee-container">
            <div className="marquee-content">
              {marqueeItems.map((item, index) => (
                <div key={index} className="marquee-item">
                  {item}
                </div>
              ))}
              {/* Duplicate the items to create the continuous effect */}
              {marqueeItems.map((item, index) => (
                <div key={`duplicate-${index}`} className="marquee-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="p-8 max-sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        ></motion.div>
        <Video />
        {/* Updated Video Container */}
        <div className="w-full mb-6 flex justify-center pt-10">
          <iframe
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] aspect-video"
            src="https://www.youtube.com/embed/XAJMPvxs2Aw"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};
export default HomeScreen;
