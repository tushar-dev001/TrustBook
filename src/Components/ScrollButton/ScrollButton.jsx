import { useEffect, useState } from 'react';
import  './ScrollButton.css'
import { FaAngleUp } from 'react-icons/fa';

const ScrollButton = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    //// option-1
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // option-2
//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

  return (
    <div>
        {/* // option-2 */}
      {/* <button onClick={handleScrollToTop} className="scroll-button">
      <FaAngleUp className="icon-position icon-style" />
      </button> */}

      {/* // option-1 */}
      <div className="top-to-btm">
            {" "}
            {showTopBtn && (
                <FaAngleUp
                    className="icon-position icon-style"
                    onClick={goToTop}
                />
            )}{" "}
        </div>
    </div>
  );
};

export default ScrollButton;
