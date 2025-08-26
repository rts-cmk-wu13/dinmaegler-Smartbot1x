import * as motion from "motion/react-client";
import phonefoto from "../../assets/1stfone.png";
import secondfoto from "../../assets/sndfone.svg";

const transition = {
  duration: 4,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "reverse",
  ease: "easeInOut",
};

const phoneAnimation = {
  duration: 3,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "loop",
  ease: "easeInOut",
};

export default function MotionPath() {
  return (
    <div style={{ position: "relative", width: 451, height: 437 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="451"
        height="437"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <motion.path
          d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
          fill="transparent"
          strokeWidth="12"
          stroke="var(--hue-6-transparent)"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={transition}
        />
      </svg>

      <img
        src={phonefoto}
        alt="Left Phone"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 271,
          height: "auto",
          zIndex: 2,
        }}
      />

      <motion.img
        src={secondfoto}
        alt="Right Phone"
        style={{
          position: "absolute",
          /*   width: 271, */
          zIndex: 2,
          bottom: -5,
          right: 0,
        }}
        initial={{
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          x: 0,
          y: 0,
          /*  filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))", */
        }}
        animate={{
          rotateX: [0, -15, -15, 0],
          rotateY: [0, 15, 15, 0],
          scale: [1, 1.1, 1.1, 1],
          x: [0, 0, 50, 0],
          y: [0, -30, -30, 0],
          filter: [
            "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
            "drop-shadow(10px 10px 20px rgba(0,0,0,0.3))",
            "drop-shadow(15px 15px 25px rgba(0,0,0,0.3))",
            "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
          ],
        }}
        transition={phoneAnimation}
      />
    </div>
  );
}
