import React from "react";
import './video.css';

const Video = () => {
    return(<header>
            <div className="overlay"/>
            <video src="./aerial.mp4" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" type="video/mp4">
            Videos not supported
            </video>
            <div className="container h-100">
                <div className="d-flex h-100 text-center align-items-center">
                    <div className="w-100 text-white">
                        <h1 className="display-3">Bulls Marketplace</h1>
                        <p className="lead mb-0">Find your passion in helping your teammates.</p>
                    </div>
                </div>
            </div>
    </header>

    );
}

export default Video;