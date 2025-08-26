/* "use client"; */

import { motion } from "motion/react";

function Loading() {
  return (
    <div className="container">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "4px solid #e0e0e0",
          borderTopColor: "#00a2ff",
          willChange: "transform",
        }}
      />
      <StyleSheet />
    </div>
  );
}

function StyleSheet() {
  return (
    <style>
      {`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          
        }

        .spinner {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 4px solid #e0e0e0;
          border-top-color: #00a2ff;
          will-change: transform;
        }
      `}
    </style>
  );
}

export default Loading;
