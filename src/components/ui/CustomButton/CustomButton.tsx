"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomButton = ({ children, className, path }: any) => {
  const classes = " lg:px-4 text-md  font-Bayon transform duration-500";
  const pathName = usePathname();
  return (
    <Link
      href={path}
      className={`${classes} ${
        pathName === path
          ? "text-light-primary-color dark:text-dark-primary-color"
          : "text-[#575757c5] dark:text-light-secondary-color hover:text-light-primary-color dark:hover:text-dark-primary-color"
      } ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomButton;
