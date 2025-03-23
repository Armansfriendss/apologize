import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Map of video IDs to their sources
  const videoSources = {
    'siddhi-birthday': '/images/Siddhi_Birthday.mp4',
    'jadu': '/images/Jadu.mp4',
    'cutest-moment': '/images/Cutest_Moment.mp4'
  };

  const videoSrc = videoSources[videoId];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, []);

  if (!videoSrc) {
    return <div>Video not found</div>;
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 right-4 z-50 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        onClick={() => navigate(-1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
      
      <div className="h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          playsInline
          className="max-h-[90vh] w-auto"
          style={{ maxWidth: '90vw' }}
          controlsList="nodownload"
          disablePictureInPicture
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;