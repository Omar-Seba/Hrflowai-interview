import React, { useEffect, useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";
import { Button } from "../ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    // Check if the user is near the top of the page
    if (currentScrollTop < 50) {
      // Adjust this value as needed
      setIsVisible(false);
      return;
    }

    if (
      currentScrollTop > lastScrollTop &&
      currentScrollTop + window.innerHeight <
        document.documentElement.scrollHeight
    ) {
      // Scrolling down and not at the bottom of the page
      setIsVisible(false);
    } else if (
      currentScrollTop < lastScrollTop ||
      currentScrollTop + window.innerHeight >=
        document.documentElement.scrollHeight
    ) {
      // Scrolling up or at the bottom of the page
      setIsVisible(true);
    }

    setLastScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    isVisible && (
      <Button
        variant={"ghost"}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="fixed w-15 h-15 right-5 bottom-5"
      >
        <IoIosArrowDropup className="w-10 h-10 " />
      </Button>
    )
  );
};

export default ScrollToTopButton;
