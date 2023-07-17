import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "../style/main.css";
import Flights from "./FlightsPage/flights";

function NavBar() {
    const navRef = useRef<HTMLElement | null>(null);

    const showNavbar = () => {
        navRef.current?.classList.toggle("responsive_nav");
    };

    return (
        <header>
            <h3>LOGO</h3>
            <nav ref={navRef}>
                <a href="/flights">Flights</a>
                <a href="/#">My work</a>
                <a href="/#">Blog</a>
                <a href="/#">About me</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default NavBar;