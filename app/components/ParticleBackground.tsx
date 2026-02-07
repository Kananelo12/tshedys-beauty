'use client';

import { useEffect, useState } from 'react';
import Particles from '@tsparticles/react';

export default function ParticleBackground() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize particles engine without passing engine parameter
    const initParticles = async () => {
      try {
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to load particles:', error);
      }
    };
    initParticles();
  }, []);

  if (!isInitialized) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 pointer-events-none z-0"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 50,
          },
          color: {
            value: ['#FF47B3', '#B05CFF', '#F72585'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.3,
          },
          size: {
            value: 3,
          },
          links: {
            enable: true,
            distance: 150,
            color: '#FF47B3',
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab',
            },
          },
          modes: {
            grab: {
              distance: 200,
            },
          },
        },
      }}
    />
  );
}
