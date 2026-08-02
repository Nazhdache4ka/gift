import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { GalleryModal } from './gallery-modal';
import smile from '../assets/gallery/smile.webp';
import newYear from '../assets/gallery/newyear.mp4';
import fck from '../assets/gallery/fck.webp';
import hiddenImage from '../assets/gallery/gift.webp';
import dance from '../assets/dance.webp';
import burger from '../assets/gallery/burger.webp';
import dauni from '../assets/gallery/dauni.webp';
import ezhi from '../assets/gallery/ezhi.webp';
import fck2 from '../assets/gallery/fck2.webp';
import fight from '../assets/gallery/fight.webp';
import jinglebells from '../assets/gallery/jinglebells.webp';
import lox from '../assets/gallery/lox.mp4';
import omg from '../assets/gallery/omg.webp';
import shapka from '../assets/gallery/shapka.mp4';
import sobaki from '../assets/gallery/sobaki.mp4';

const mediaSx = {
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: 3,
} as const;

export function GalleryCards() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      columns={{ xs: 1, sm: 2, md: 3 }}
      sx={{ pb: { xs: 4, md: 8 } }}
    >
      {galleryItems.map(item => (
        <Grid
          key={item.id}
          size={1}
        >
          <Box
            sx={{
              aspectRatio: '1 / 1',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <SealedCard modalText={item.modalText}>
              {item.component === 'img' ? (
                <GalleryImage
                  src={item.src}
                  objectFit={item.objectFit}
                />
              ) : (
                <GalleryVideo
                  src={item.src}
                  objectFit={item.objectFit}
                />
              )}
            </SealedCard>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function SealedCard({ modalText, children }: { modalText: string; children: ReactNode }) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [revealed, setRevealed] = useState(false);
  const [lidGone, setLidGone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const lidSpring = useSpring({
    opacity: revealed ? 0 : 1,
    transform: revealed ? 'scale(1.4)' : 'scale(1)',
    immediate: prefersReducedMotion,
    config: { mass: 1, tension: 100, friction: 20 },
    onRest: result => {
      if (result.finished && revealed) {
        setLidGone(true);
      }
    },
  });

  const contentSpring = useSpring({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'scale(1)' : 'scale(0.97)',
    immediate: prefersReducedMotion,
    delay: revealed && !prefersReducedMotion ? 100 : 0,
    config: { tension: 180, friction: 22 },
  });

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {revealed && (
        <animated.div
          style={{
            ...contentSpring,
            position: 'absolute',
            inset: 0,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: 3,
            }}
          >
            {children}
          </Box>
        </animated.div>
      )}

      {!lidGone && (
        <animated.div
          style={{
            ...lidSpring,
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: revealed ? 'none' : 'auto',
            cursor: 'pointer',
            transformOrigin: 'center',
            willChange: 'transform, opacity',
          }}
          onClick={() => {
            if (!revealed) setModalOpen(true);
          }}
        >
          <Box
            component="img"
            src={hiddenImage}
            alt=""
            sx={{ ...mediaSx, objectFit: 'contain', pointerEvents: 'none' }}
          />
        </animated.div>
      )}

      <GalleryModal
        open={modalOpen}
        text={modalText}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          setRevealed(true);
          if (prefersReducedMotion) {
            setLidGone(true);
          }
        }}
      />
    </Box>
  );
}

function GalleryImage({ src, objectFit }: { src: string; objectFit: 'cover' | 'contain' }) {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      sx={{ ...mediaSx, objectFit }}
    />
  );
}

function GalleryVideo({ src, objectFit }: { src: string; objectFit: 'cover' | 'contain' }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      const video = videoRef.current;
      const active = document.fullscreenElement === video;
      setIsFullscreen(active);

      if (!active && video) {
        video.pause();
        video.currentTime = 0;
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleOpenFullscreen = async () => {
    const video = videoRef.current;
    if (!video || isFullscreen) return;

    try {
      const iosFullscreen = (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen;

      if (typeof iosFullscreen === 'function') {
        iosFullscreen.call(video);
      } else if (video.requestFullscreen) {
        await video.requestFullscreen();
      }

      await video.play();
    } catch {
      // user cancelled fullscreen / autoplay policy — ignore
    }
  };

  return (
    <Box
      component="video"
      ref={videoRef}
      src={src}
      playsInline
      controls={isFullscreen}
      preload="metadata"
      onClick={handleOpenFullscreen}
      sx={{ ...mediaSx, objectFit, cursor: isFullscreen ? 'default' : 'pointer' }}
    />
  );
}

interface GalleryItem {
  id: number;
  component: 'img' | 'video';
  src: string;
  objectFit: 'cover' | 'contain';
  modalText: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 0,
    component: 'img',
    src: omg,
    objectFit: 'cover',
    modalText: 'Там нюдсы, лучше подумай прежде чем открыть'
  },
  {
    id: 1,
    component: 'img',
    src: fck,
    objectFit: 'cover',
    modalText: 'А кто-то говорил, что порядочная, а тут такое😑',
  },
  {
    id: 2,
    component: 'video',
    src: newYear,
    objectFit: 'contain',
    modalText: 'Аккуратнее, на видео пьяное животное☠️',
  },
  {
    id: 3,
    component: 'img',
    src: smile,
    objectFit: 'cover',
    modalText: 'Наверное фотка с самой красивой улыбкой, которую я видел в своей жизни😁',
  },
  {
    id: 4,
    component: 'img',
    src: dance,
    objectFit: 'cover',
    modalText: 'Если что, там просто бешеный кабанидзе😱',
  },
  {
    id: 5,
    component: 'img',
    src: jinglebells,
    objectFit: 'cover',
    modalText: 'А тут дикие красавчики',
  },
  {
    id: 6,
    component: 'img',
    src: dauni,
    objectFit: 'cover',
    modalText: 'На фото два дауна и один умни чел, кто кто сама угадай',
  },
  {
    id: 7,
    component: 'img',
    src: ezhi,
    objectFit: 'cover',
    modalText: 'Я может и не может но хотя бы не я✊',
  },
  {
    id: 8,
    component: 'img',
    src: fck2,
    objectFit: 'cover',
    modalText: 'Тут кстати опять пруф непорядочности',
  },
  {
    id: 9,
    component: 'img',
    src: fight,
    objectFit: 'cover',
    modalText: 'Левой чистоту - правой суету',
  },
  {
    id: 10,
    component: 'video',
    src: lox,
    objectFit: 'cover',
    modalText: 'На видео кибербуллинг',
  },
  {
    id: 11,
    component: 'img',
    src: burger,
    objectFit: 'cover',
    modalText: 'Тут тупа мем хихи-хаха',
  },
  {
    id: 12,
    component: 'video',
    src: sobaki,
    objectFit: 'cover',
    modalText: 'Честно, я ничего смешнее не видел',
  },
  {
    id: 13,
    component: 'video',
    src: shapka,
    objectFit: 'cover',
    modalText: 'А тут воришка убегает',
  }
];
