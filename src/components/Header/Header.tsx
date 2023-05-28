import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import quizLogo from "../../assets/quiz-logo.png";
import style from "./Header.module.scss";

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // store header height as a global style variable
    const handleLoad = () => {
      document.documentElement.style.setProperty(
        "--headerHeight",
        `${headerRef?.current?.offsetHeight || 0}px`
      );
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div ref={headerRef} className={style.header}>
      <Link to="/" className={style.header__logo}>
        <img src={quizLogo} alt="quiz" />
      </Link>
      <Link to="/" className={style.header__link}>
        Home
      </Link>
    </div>
  );
};

export default Header;
