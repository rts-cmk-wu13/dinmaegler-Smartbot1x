import { useEffect, useRef } from "react";
import "./darkmode.css";

export default function Darkmode() {
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    const rootElement = document.documentElement;

    const applyTheme = (isDark) => {
      if (isDark) {
        rootElement.classList.add("dark");
      } else {
        rootElement.classList.remove("dark");
      }
    };

    if (!input) return;

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    input.checked = prefersDark;
    applyTheme(prefersDark);

    const handleInput = () => {
      const isDark = input.checked;

      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;

      const toggleElement = document.querySelector(".toggle");

      if (toggleElement) {
        const rect = toggleElement.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }

      if (!document.startViewTransition) {
        console.warn("View Transition API not supported. Falling back.");
        applyTheme(isDark);
        return;
      }

      const transition = document.startViewTransition(() => {
        applyTheme(isDark);
      });

      transition.ready
        .then(() => {
          rootElement.style.setProperty("--x", `${x}px`);
          rootElement.style.setProperty("--y", `${y}px`);
        })
        .catch((error) => {
          console.error("Error during View Transition setup:", error);
        });

      transition.finished
        .then(() => {
          console.log("Transition finished.");
        })
        .catch((error) => {
          console.error("Error during View Transition finish:", error);
        });
    };

    input.addEventListener("input", handleInput);

    return () => {
      input.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <>
      <label className="toggle">
        <input type="checkbox" aria-label="Toggle dark mode" ref={inputRef} />
        <div></div>
      </label>

      {/* <section>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section> */}
    </>
  );
}
