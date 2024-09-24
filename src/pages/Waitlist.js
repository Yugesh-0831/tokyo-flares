import React from "react";
import videoSrc from "../app/video.mp4"; // Import the video file

function Waitlist() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />{" "}
        {/* Use the imported video */}
        Your browser does not support the video tag.
      </video>

      {/* Content on Top */}
      <div className="relative z-10">
        <h1 className="text-white text-4xl font-bold">Join the Waitlist now</h1>
        <div className="mt-10 flex h-5 items-center">
          <input
            placeholder="Your email Id here"
            className="p-3 w-[300px] rounded-md backdrop-blur-xl bg-white/20 border-none text-white focus:outline-none"
          />
          <button className="p-3 bg-white ml-5 rounded-md">
            Join Waitlist!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Waitlist;
