import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link to="/">
          <img src={logo} alt="logo" className="w-48 h-22" />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-x-5 text-[19px]">
          <Link
            to="/"
            className="hover:text-bardum text-gray-500 block font-semibold"
          >
            Home
          </Link>
          <Link
            to="/HomeEquity"
            className="hover:text-bardum text-gray-500 block font-semibold"
          >
            Services
          </Link>

          <Link
            to="/contactus"
            className="hover:text-bardum text-gray-500 block font-semibold"
          >
            Contact Us
          </Link>
        </nav>
        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden flex max-lg:ml-auto  ">
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={handleMenuToggle}
            className="text-bardum"
            style={{ fontSize: "24px", cursor: "pointer", color: "#000" }} // Ensure the cross button is visible by setting color
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </motion.button>
        </div>
        {/* Overlay for click outside to close */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={handleCloseMenu}
          />
        )}
        {/* Sidebar for Mobile */}
        <CSSTransition
          in={isMenuOpen}
          timeout={300}
          classNames={{
            enter: "sidebar-slide-enter",
            enterActive: "sidebar-slide-enter-active",
            exit: "sidebar-slide-exit",
            exitActive: "sidebar-slide-exit-active",
          }}
          unmountOnExit
        >
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={
              isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: "-100%" }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="m-0 text-center lg:hidden fixed top-0  transform -translate-x-1/2 w-11/12 max-w-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out rounded-lg"
          >
            <ul className="space-y-3 p-6 ">
              <li className="border-b border-gray-300 py-3 px-3">
                <Link
                  to="/"
                  className="hover:text-bardum text-gray-500 block font-semibold"
                  onClick={handleLinkClick} // Close menu on link click
                >
                  Home
                </Link>
              </li>
              <li className="border-b border-gray-300 py-3 px-3">
                <Link
                  to="/HomeEquity"
                  className="hover:text-bardum text-gray-500 block font-semibold"
                  onClick={handleLinkClick} // Close menu on link click
                >
                  Services
                </Link>
              </li>

              <li className="border-b border-gray-300 py-3 px-3">
                <Link
                  to="/contactus"
                  className="hover:text-bardum text-gray-500 block font-semibold"
                  onClick={handleLinkClick} // Close menu on link click
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        </CSSTransition>
      </div>
      {/* Inline Styles for Sidebar Transition */}
      <style jsx="true">{`
        .sidebar-slide-enter {
          transform: translateY(-100%);
        }
        .sidebar-slide-enter-active {
          transform: translateY(0);
          transition: transform 300ms ease-in-out;
        }
        .sidebar-slide-exit {
          transform: translateY(0);
        }
        .sidebar-slide-exit-active {
          transform: translateY(-100%);
          transition: transform 300ms ease-in-out;
        }
      `}</style>
    </header>
  );
};
export default Header;
