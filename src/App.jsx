import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import VideoPlayer from './components/VideoPlayer';
import afreenAudio from './assets/Afreen Afreencutted.mp3';

// Heart Loader Component
const HeartLoader = () => (
  <div className="heart-loader">
    <div className="heart"></div>
    <div className="heart"></div>
    <div className="heart"></div>
  </div>
);

// Floating Hearts Component
const FloatingHearts = () => {
  return (
    <div className="floating-hearts">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="heart"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 20,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
            x: Math.random() * 100 - 50
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Image Modal Component
const ImageModal = ({ image, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-7xl mx-auto p-4"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={image}
          alt="Full size"
          className="max-h-[90vh] w-auto rounded-lg shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

// Story Item Component
const StoryItem = ({ image, title, description, isVideo = false, videoId }) => {
  const navigate = useNavigate();
  // List of portrait images that need special handling
  const portraitImages = ['My_fav.jpg'];
  
  const handleVideoClick = () => {
    if (isVideo && videoId) {
      navigate(`/video/${videoId}`);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="story-item relative min-h-screen flex items-center py-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              {isVideo ? (
                <div 
                  className="w-full aspect-[4/3] object-cover cursor-pointer relative group"
                  onClick={handleVideoClick}
                >
                  <video
                    src={image}
                    className="w-full h-full"
                    poster="/images/Fall1.jpg"
                    preload="metadata"
                    style={{ maxHeight: '500px' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors z-10">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium z-10 transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                    Click to play
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                </div>
              ) : (
                <img 
                  src={image} 
                  alt={title} 
                  className={`w-full ${
                    portraitImages.includes(image.split('/').pop()) 
                      ? 'aspect-[3/4] object-cover object-top' 
                      : 'aspect-[4/3] object-cover'
                  }`}
                />
              )}
            </div>
          </div>
          
          {/* Text Side */}
          <div className="w-full md:w-1/2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-primary mb-4">{title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Collection Gallery Component
const CollectionGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    'Chai.jpg', 'Don.jpg', 'Fall1.jpg', 'Fell_harder.jpg', 'First_meet.jpg',
    'First_meet2.jpg', 'First_meet3.jpg', 'My_fav.jpg', 'Siddhi.jpg', 'Siddhi2.jpg',
    'Traditional_1.jpg', 'Traditional_2.jpg', 'Your_birthday.jpg', 'trad.jpg',
    'IMG-20250312-WA0015.jpg', 'IMG-20250312-WA0021.jpg', 'IMG-20250312-WA0009.jpg',
    'IMG-20250312-WA0008.jpg', 'IMG-20250312-WA0026.jpg', 'IMG-20250312-WA0027.jpg',
    'IMG-20250307-WA0022.jpg', 'IMG-20250307-WA0021.jpg', 'IMG-20250307-WA0022(1).jpg',
    'IMG_20250307_152352.jpg', 'IMG_20250307_152521.jpg', 'IMG_20250307_152523.jpg',
    'IMG_20250307_152801.jpg', 'IMG-20250227-WA0002.jpg', 'IMG-20250227-WA0003.jpg',
    'IMG-20250221-WA0001.jpg', 'IMG_20250205_174609.jpg', 'IMG_20250205_174710.jpg',
    'IMG_20250205_174717.jpg', 'IMG_20250205_174726.jpg', 'IMG_20250205_175054.jpg',
    'IMG_20250205_175048.jpg', 'IMG_20250205_174936.jpg', 'IMG_20250205_175106.jpg',
    'IMG_20250205_175141.jpg', 'IMG_20250205_175626.jpg', 'Screenshot_20250202_231056.jpg',
    'Screenshot_20250131_220505.jpg', 'Screenshot_20250201_164818.jpg', 'IMG-20250126-WA0026.jpg',
    'Snapchat-1597498754.jpg', 'IMG_20250127_175528.jpg', 'Screenshot_2025_0126_083940.jpg',
    'IMG-20250123-WA0004.jpg', 'Screenshot_2025_0119_152742.jpg', 'Screenshot_2025_0119_152742(1).jpg',
    'WhatsApp Image 2025-01-18 at 15.33.59_5efdc5a5.jpg', 'IMG-20250106-WA0002.jpg',
    'Screenshot_20250104_143733.jpg', 'IMG-20241219-WA0053.jpg', 'IMG-20241219-WA0054.jpg',
    'IMG-20241220-WA0006.jpg', 'IMG-20241220-WA0007.jpg', 'IMG-20241220-WA0008.jpg',
    'IMG-20241217-WA0013.jpg', 'IMG-20241223-WA0001.jpg', 'IMG-20241124-WA0012 - Copy.jpg',
    'IMG-m3kgaaof (1) - Copy.jpg', 'IMG-m3n0a5nx.jpg', 'IMG-20241124-WA0009.jpg',
    'IMG-20241124-WA0010.jpg', 'IMG-20241124-WA0011.jpg', 'IMG-20241124-WA0013.jpg',
    'IMG-20241124-WA0014.jpg', 'IMG-20241210-WA0020.jpg', 'IMG-20241210-WA0025.jpg',
    't1.jpg', 't2.jpg', 't3.jpg', 't4.jpg', 't5.jpg', 't6.jpg', 't7.jpg', 't8.jpg', 't9.jpg', 't10.jpg', 't11.jpg', 't12.jpg', 't13.jpg', 't14.jpg', 't15.jpg', 't16.jpg']

  // List of portrait images that need special handling
  const portraitImages = [
    'IMG-20241124-WA0009.jpg',
    'IMG-20241220-WA0008.jpg',
    'IMG-20241220-WA0007.jpg',
    'Screenshot_2025_0119_152742.jpg',
    'Screenshot_20250201_164818.jpg',
    'IMG-20250227-WA0003.jpg',
    'My_fav.jpg'
  ];

  // Shuffle the images array
  const shuffledImages = [...images].sort(() => Math.random() - 0.5);

  return (
    <section className="section bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-primary"
        >
          Our Memories Collection
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shuffledImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative group cursor-pointer ${
                portraitImages.includes(img) ? 'aspect-[3/4]' : ''
              }`}
              style={{
                aspectRatio: portraitImages.includes(img) 
                  ? '3/4' 
                  : `${Math.random() * 0.5 + 0.75}`,
              }}
            >
              <div 
                className="relative h-full rounded-xl overflow-hidden shadow-lg"
                onClick={() => setSelectedImage(`/images/${img}`)}
              >
                <img
                  src={`/images/${img}`}
                  alt={`Memory ${index + 1}`}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                    portraitImages.includes(img) ? 'object-contain' : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white text-base md:text-lg font-semibold block">
                      Memory {index + 1}
                    </span>
                    <span className="text-white/80 text-xs md:text-sm mt-1 block">
                      Click to view full size
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Mouse Blob Component
const MouseBlob = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: position.x - 100,
        y: position.y - 100,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.5
      }}
    >
      <div
        className={`w-[200px] h-[200px] rounded-full bg-pink-500 blur-3xl transition-all duration-300 ${
          isHovering ? 'scale-150 opacity-50' : 'scale-100 opacity-30'
        }`}
      />
    </motion.div>
  );
};

// Audio Control Component
const AudioControl = ({ isPlaying, onTogglePlay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
      >
        <span className="text-sm font-medium">Click to play music</span>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white transform rotate-45" />
      </motion.div>

      {/* Play Button */}
      <motion.button
        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 relative"
        onClick={onTogglePlay}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 0 0 rgba(236, 72, 153, 0.4)",
            "0 0 0 10px rgba(236, 72, 153, 0)",
            "0 0 0 0 rgba(236, 72, 153, 0.4)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(afreenAudio);
    audioRef.current.loop = true; // Loop the song

    // Try to play on window load
    const handleWindowLoad = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Audio playback failed:", error);
      }
    };

    window.addEventListener('load', handleWindowLoad);

    let scroll;
    try {
      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.05,
        multiplier: 0.5,
        smartphone: {
          smooth: true,
          lerp: 0.05,
          multiplier: 0.5,
        },
      });
    } catch (error) {
      console.error('Locomotive Scroll initialization error:', error);
    }

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (scroll) scroll.destroy();
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div ref={scrollRef} data-scroll-container className="bg-gradient-to-b from-pink-50 to-white">
      <MouseBlob />
      <AudioControl isPlaying={isPlaying} onTogglePlay={togglePlay} />
      {/* Hero Section */}
      <section className="section relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingHearts />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100/50 to-white/50 backdrop-blur-sm" />
        <div className="text-center px-4 relative z-10">
          <HeartLoader />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-bold text-primary mb-6"
          >
            Dear Best Friend <span className="text-pink-500">Siddhu</span>💗
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            This is My Apology and a cute gift for you. I know you will love it. and please forgive me for my mistakes. I will always be there for you.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl text-primary font-semibold"
          >
            Our Snap Journey
          </motion.p>
        </div>
      </section>

      {/* Storyline Gallery */}
      <div className="storyline-container">
        <StoryItem
          image="/images/Chai.jpg"
          title="Our Second Chai"
          description="I think this is the second time we had chai together. It was an awesome experience for both of us we both where so anxious that what if somebody caught us. But Contiued with our chai. Thanks Siddhu."
        />
        <StoryItem
          image="/images/Siddhi_Birthday.mp4"
          title="My gift for siddhu "
          description="mla mahit aahe eka video madhe kai hotai pn ya madhe majay khup feeling aahet💗"
          isVideo={true}
          videoId="siddhi-birthday"
        />
        <StoryItem
          image="/images/Don.jpg"
          title="Siddhu The Don Of Baramti"
          description="Tu hya dress madhe khup chan disat hoti ani mla tai tula sangaych hot tula pn tula mahit ch asel apl kai zalt pn aai shappet apun Tya nunter cafe madhe ghelto tai me kevhach visru nahi shaket!!!"
        />
        <StoryItem
          image="/images/Fall1.jpg"
          title="Miss Beautiful"
          description="Aaai shappet ha photo mla etka avedla hota na mi nahi sangu shaket kiti mla avedla hota mi ha photo roj bagaycho, khar tr mi hya photo chi print annar hoto pn mhunl jr kunala bheatl tr apl kam hoil."
        />
        <StoryItem
          image="/images/Jadu.mp4"
          title="Swapnatli Duniya"
          description="Khup majja Not suttti."
          isVideo={true}
          videoId="jadu"
        />
        <StoryItem
          image="/images/First_meet2.jpg"
          title="Our Snap"
          description="So ha apla pahila photo jai apun kharch sang kadla hota to divas khup changla ghelta apun purn mundir pasn rankala pariyant hat dharun ghelo❤️💕"
        />
        <StoryItem
          image="/images/Cutest_Moment.mp4"
          title="Cutie Pie"
          description="Rankala vrch tuja Cutest Moment ekdum asa lahan bala gut😍."
          isVideo={true}
          videoId="cutest-moment"
        />
        <StoryItem
          image="/images/My_fav.jpg"
          title="Sarri kai bolu atta💗"
          description="Tujya vr saarri itki chan distay pn tula kelatch nahi ki. Please mostly sarri ghalet ja.😍😍😍💗"
        />
      </div>

      {/* Collection Gallery */}
      <CollectionGallery />

      {/* Final Message Section */}
      <section className="section bg-gradient-to-b from-white to-pink-50 min-h-screen relative overflow-hidden">
        <FloatingHearts />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-6xl font-bold text-primary mb-8">
            Love you as a Best Friend
          </h2>
          <p className="text-2xl text-gray-600 leading-relaxed">
            Thanks <span className="text-pink-500">Siddhu</span> mla samjun ghenya stahi tula pn mahit aahe mi lagech chidtoy pn tu mla samjun ghetya tya sathi khup khup mana pasn thanks <span className="text-pink-500">siddhu</span>❤️💕. mi tula majya life madhn kadhi ch visru nahi shaket Thank you so so much for being my best friend.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
