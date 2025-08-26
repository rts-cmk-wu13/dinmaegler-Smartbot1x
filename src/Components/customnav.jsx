import { useEffect, useRef } from "react";

import { NavLink, useLocation } from "react-router";
import NavBar from "./NavBar";
import "../Styles/nav.css";

function Navs() {
  const logoContainerRef = useRef(null);
  const logoLightRef = useRef(null);
  const navRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorCirclesRef = useRef([]);

  useEffect(() => {
    const logoContainer = logoContainerRef.current;
    const logoLight = logoLightRef.current;
    const nav = navRef.current;
    const cursor = cursorRef.current;
    const links = nav ? nav.querySelectorAll("a") : [];

    // === LOGO SPOTLIGHT TRACKING ===
    function focusLogoLight() {
      if (!logoContainer || !logoLight) return;
      const rect = logoContainer.getBoundingClientRect();
      logoLight.setAttribute("x", Math.floor(rect.left + rect.width * 0.5));
      logoLight.setAttribute("y", Math.floor(rect.top + rect.height * 0.5));
    }

    function triggerLogoGlow() {
      if (!logoContainer) return;
      logoContainer.classList.add("glow");
      setTimeout(() => logoContainer.classList.remove("glow"), 500);
    }

    let logoTracking = false;
    let trackLogoRAF;
    function trackLogoWithPointer() {
      if (!logoTracking) return;
      focusLogoLight();
      trackLogoRAF = requestAnimationFrame(trackLogoWithPointer);
    }

    if (nav) {
      nav.addEventListener("pointerenter", () => {
        logoTracking = true;
        triggerLogoGlow();
        trackLogoWithPointer();
      });
      nav.addEventListener("pointerleave", () => {
        logoTracking = false;
        cancelAnimationFrame(trackLogoRAF);
        focusLogoLight();
      });
    }

    // Global pointer fallback
    if (logoContainer && logoLight) {
      window.addEventListener(
        "pointermove",
        (e) => {
          if (!logoTracking) {
            logoLight.setAttribute("x", Math.floor(e.clientX));
            logoLight.setAttribute("y", Math.floor(e.clientY));
          }
        },
        { passive: true }
      );
      window.addEventListener("pointerleave", () => {
        if (!logoTracking) focusLogoLight();
      });
    }

    // === SPOTLIGHT & AMBIENCE CONFIG ===
    const config = {
      theme: "dark",
      spotlight: {
        speed: 0.25,
        deviation: 0.8,
        surface: 0.5,
        specular: 6,
        exponent: 65,
        light: "hsla(234, 14%, 72%, 0.25)",
        x: 0,
        y: 54,
        z: 82,
        pointer: true,
      },
      ambience: {
        deviation: 0.8,
        surface: 0.5,
        specular: 25,
        exponent: 65,
        light: "hsla(234, 14%, 72%, 0.25)",
        x: 120,
        y: -154,
        z: 160,
      },
    };

    // These selectors require SVG structure in the DOM
    const spotlightBlur = document.querySelector("#spotlight feGaussianBlur");
    const spotlightLight = document.querySelector(
      "#spotlight feSpecularLighting"
    );
    const spotlightPoint = document.querySelector("#spotlight fePointLight");
    const ambBlur = document.querySelector("#ambience feGaussianBlur");
    const ambLight = document.querySelector("#ambience feSpecularLighting");
    const ambPoint = document.querySelector("#ambience fePointLight");

    const syncLight = ({ x, y }) => {
      if (!nav || !spotlightPoint) return;
      const navBounds = nav.getBoundingClientRect();
      spotlightPoint.setAttribute("x", Math.floor(x - navBounds.x));
      spotlightPoint.setAttribute("y", Math.floor(y - navBounds.y));
    };

    let monitoring = false;
    const updateFilters = () => {
      document.documentElement.dataset.theme = config.theme;
      if (
        spotlightBlur &&
        spotlightLight &&
        spotlightPoint &&
        ambBlur &&
        ambLight &&
        ambPoint
      ) {
        spotlightBlur.setAttribute("stdDeviation", config.spotlight.deviation);
        spotlightLight.setAttribute("surfaceScale", config.spotlight.surface);
        spotlightLight.setAttribute(
          "specularConstant",
          config.spotlight.specular
        );
        spotlightLight.setAttribute(
          "specularExponent",
          config.spotlight.exponent
        );
        spotlightLight.setAttribute("lighting-color", config.spotlight.light);

        ambBlur.setAttribute("stdDeviation", config.ambience.deviation);
        ambLight.setAttribute("surfaceScale", config.ambience.surface);
        ambLight.setAttribute("specularConstant", config.ambience.specular);
        ambLight.setAttribute("specularExponent", config.ambience.exponent);
        ambLight.setAttribute("lighting-color", config.ambience.light);

        const anchor = document.querySelector('[data-active="true"]');
        if (!nav || !anchor) return;
        const navBounds = nav.getBoundingClientRect();
        const anchorBounds = anchor.getBoundingClientRect();

        spotlightPoint.setAttribute(
          "x",
          anchorBounds.left -
            navBounds.left +
            anchorBounds.width * 0.5 +
            config.spotlight.x
        );
        spotlightPoint.setAttribute("y", config.spotlight.y);
        spotlightPoint.setAttribute("z", config.spotlight.z);

        ambPoint.setAttribute("x", config.ambience.x);
        ambPoint.setAttribute("y", config.ambience.y);
        ambPoint.setAttribute("z", config.ambience.z);

        if (config.spotlight.pointer && !monitoring) {
          monitoring = true;
          nav.dataset.pointerLighting = true;
          window.addEventListener("pointermove", syncLight, { passive: true });
        } else if (!config.spotlight.pointer && monitoring) {
          monitoring = false;
          nav.dataset.pointerLighting = false;
          window.removeEventListener("pointermove", syncLight);
        }
      }
    };

    const selectAnchor = (anchor) => {
      links.forEach((l) => l.removeAttribute("data-active"));
      anchor.setAttribute("data-active", "true");
      if (!config.spotlight.pointer && spotlightPoint && nav) {
        const navBounds = nav.getBoundingClientRect();
        const anchorBounds = anchor.getBoundingClientRect();
        gsap.to(spotlightPoint, {
          duration: config.spotlight.speed,
          attr: {
            x:
              anchorBounds.left -
              navBounds.left +
              anchorBounds.width * 0.5 +
              config.spotlight.x,
          },
        });
      }
    };

    updateFilters();
    focusLogoLight();

    if (nav) {
      nav.addEventListener("click", (event) => {
        const anchor = event.target.closest("a");
        if (anchor) {
          event.preventDefault();
          selectAnchor(anchor);
          focusLogoLight();
          triggerLogoGlow();
        }
      });
    }

    // === GOOEY CURSOR ===
    const TAIL_LENGTH = 20;
    let mouseX = 0,
      mouseY = 0;
    let cursorCircles;
    let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });

    function onPointerMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    function onTouchMove(e) {
      const touch = e.touches[0];
      mouseX = touch.clientX;
      mouseY = touch.clientY;
    }

    function initCursor() {
      if (!cursor) return;
      cursor.innerHTML = "";
      for (let i = 0; i < TAIL_LENGTH; i++) {
        const div = document.createElement("div");
        div.classList.add("cursor-circle");
        cursor.append(div);
      }
      cursorCircles = Array.from(cursor.querySelectorAll(".cursor-circle"));
      cursorCirclesRef.current = cursorCircles;
    }

    function updateCursor() {
      cursorHistory.shift();
      cursorHistory.push({ x: mouseX, y: mouseY });
      for (let i = 0; i < TAIL_LENGTH; i++) {
        const current = cursorHistory[i];
        const next = cursorHistory[i + 1] || current;
        current.x += (next.x - current.x) * 0.35;
        current.y += (next.y - current.y) * 0.35;
        if (cursorCirclesRef.current[i]) {
          cursorCirclesRef.current[i].style.transform = `translate(${
            current.x
          }px, ${current.y}px) scale(${i / TAIL_LENGTH})`;
        }
      }
      requestAnimationFrame(updateCursor);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    initCursor();
    updateCursor();

    // Cleanup
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointermove", syncLight);
      window.removeEventListener("pointerleave", focusLogoLight);
      if (nav) {
        nav.removeEventListener("pointerenter", trackLogoWithPointer);
        nav.removeEventListener("pointerleave", focusLogoLight);
        nav.removeEventListener("click", selectAnchor);
      }
    };
  }, []);

  return (
    <>
      {/*  <div
        className="trademark-container logo-spotlight"
        id="logo"
        ref={logoContainerRef}
      >
        <div className="trademark-symbol">
          <span className="letter">R</span>
        </div>
        <span className="superscript-symbol">&amp;</span>
      </div> */}
      <NavBar />

      <svg className="sr-only">
        <filter id="spotlight">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting
            result="lighting"
            in="blur"
            surfaceScale="5"
            specularConstant="0.5"
            specularExponent="120"
            lightingColor="#ffffff"
          >
            <fePointLight x="50" y="50" z="300" />
          </feSpecularLighting>
          <feComposite
            in="lighting"
            in2="SourceAlpha"
            operator="in"
            result="composite"
          />
          <feComposite
            in="merged"
            in2="composite"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />
        </filter>
        <filter id="ambience">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting
            result="lighting"
            in="blur"
            surfaceScale="5"
            specularConstant="0.5"
            specularExponent="120"
            lightingColor="#ffffff"
          >
            <fePointLight x="50" y="50" z="300" />
          </feSpecularLighting>
          <feComposite
            in="lighting"
            in2="SourceAlpha"
            operator="in"
            result="composite"
          />
          <feComposite
            in="merged"
            in2="composite"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />
        </filter>
        <filter
          id="logo-spotlight"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting
            result="lighting"
            in="blur"
            surfaceScale="5"
            specularConstant="0.5"
            specularExponent="120"
            lightingColor="#ffffff"
          >
            <fePointLight id="logoLight" x="32" y="32" z="300" />
          </feSpecularLighting>
          <feComposite
            in="lighting"
            in2="SourceAlpha"
            operator="in"
            result="composite"
          />
          <feComposite
            in="SourceGraphic"
            in2="composite"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="goo"
        version="1.1"
        width="100%"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div id="cursor" ref={cursorRef}></div>
    </>
  );
}

export default Navs;

export function NavItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className={isActive ? "active" : ""}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}
