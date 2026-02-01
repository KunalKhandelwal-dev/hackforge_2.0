import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-root">
      {/* Background effects */}
      <div className="notfound-noise" />
      <div className="notfound-vignette" />

      {/* Floating glow */}
      <motion.div
        className="notfound-orb"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="notfound-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="notfound-404">404</h1>

        <h2 className="notfound-title">
          BUILD. <span>BREAK.</span> LOST.
        </h2>

        <p className="notfound-text">
          You just hacked your way into the void.<br />
          This route doesn’t exist — yet.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn-primary">
            Go Back Home
          </Link>
          <Link to="/#tracks" className="btn-secondary">
            Explore Tracks
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
