import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function Video() {
  console.log("videossss")
  const { url } = useParams();
  const videoRef = useRef(null);
  const [currentTime, setcurrentTime] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      let lastUpdateTime = 0;

      const handleTimeUpdate = () => {
        const now = Date.now();

        if (now - lastUpdateTime >= 1000) {
          setcurrentTime(videoElement.currentTime);
          lastUpdateTime = now;
        }
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      videoElement.addEventListener('ended', () => {
        setVideoEnded(true);
      });
      videoElement.addEventListener('loadedmetadata', () => {
        setVideoLoading(false);
      });



      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('ended', () => {
          setVideoEnded(true);
        });
      };
    }
  }, [videoRef]);


  const handleVideoContinue = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("Userdetail"))._id;
      const res = await axios.post('/api/v1/user/continueVideo', { userId: userId });
      const allContinueMovie = res.data.continueMovies;

      // Filter the data and return it once the filtering is done
      const continueMovie = allContinueMovie.filter((video) => {
        return video.videoId === url;
      });

      console.log("continueMovie is ", continueMovie[0].currentTime);

      return continueMovie;
    } catch (error) {
      // Handle errors from the API call
      console.error("Error fetching continueMovie:", error);
      return []; // Return an empty array or handle the error as needed
    }
  };


  useEffect(() => {
    console.log('Running useEffect hook with dependencies:', url, videoLoading);
    if (url) {
      console.log('URL is defined:', url);
      handleVideoContinue()
        .then((continueMovies) => {
          console.log('Received continueMovies:', continueMovies);
          const videoElement = videoRef.current;
          const videoSource = require(`../videos/${url}.mp4`);
          console.log('Video source:', videoSource);
          videoElement.src = videoSource;
          if (!videoLoading) {
            videoElement.currentTime = continueMovies[0].currentTime;
          }
          videoElement.loop = false;
          videoElement.load();
        })
        .catch((error) => {
          console.error("Error handling video continuation:", error);
        });
    } else {
      console.log('URL is not defined');
    }
  }, [url, videoLoading]);



  const handleUserInteraction = (interactionType) => {
    console.log("interactionType is ", interactionType);
    console.log("interactionType current time is ", currentTime);
    if (interactionType === 'play' && currentTime === 0) {
      console.log("Video started Skipping database storage.");
      return; // Skip database storage
    }
    // Check if the interaction is "seek" and the video has ended
    if (interactionType === 'seek' && videoEnded) {
      console.log("Interaction is 'seek' and video has ended. Skipping database storage.");
      return; // Skip database storage
    }

    // Implement database storage logic here
    const userId = JSON.parse(localStorage.getItem("Userdetail"))._id
    console.log(userId)
    sendToDatabase({
      userId,
      videoId: url,
      currentTime: currentTime,

    });
  };

  const handleVideoEnd = async () => {
    console.log("video ended");
    console.log("Video ended currentTime", currentTime);
    const userId = JSON.parse(localStorage.getItem("Userdetail"))._id;
    const res = await axios.post('/api/v1/user/deleteVideo', { userId: userId, videoId: url })
    console.log("res in  handleVideoEnd is ", res)
  };

  useEffect(() => {
    console.log("Current time is ", currentTime);
  }, [currentTime]);

  // Simulate sending data to the database
  const sendToDatabase = async (data) => {
    console.log("Sending data to the database:", data);
    const response = await axios.post('/api/v1/user/continueWatching', { continueWatching: data })
    console.log("Client side response is ", response);
    // Replace this with your actual database storage code
  };


  return (
    <div>
      <video
        id='videoBg'
        controls
        autoPlay={true}
        muted={false}
        loop={false}
        width='100%'
        height='100%'
        ref={videoRef}
        onError={(e) => {
          console.error("Video error: ", e);
        }}
        onPause={() => handleUserInteraction('pause')}
        onPlay={() => handleUserInteraction('play')}
        onSeeked={() => handleUserInteraction('seek')}
        onEnded={handleVideoEnd}
        onLoadedData={() => setVideoLoading(false)}
      ></video>
    </div>
  );
}

export default Video;
