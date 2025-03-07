"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomButton = ({ children, className, path, onClick }: any) => {
  const pathName = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Link
        onClick={onClick ? onClick : () => { }}
        href={path}
        className={`xl:px-4 text-md font-Bayon transform duration-500 ${pathName === path
          ? "text-light-primary-color dark:text-dark-primary-color"
          : "text-[#575757c5] dark:text-light-secondary-color hover:text-light-primary-color dark:hover:text-dark-primary-color"
          } ${className} flex`}
      >
        <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default CustomButton;