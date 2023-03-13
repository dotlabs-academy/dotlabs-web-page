import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export const ParticlesBack = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="relative z-0"
      options={{
        background: {
          color: {
            value: "#eff6ff",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: "rgb(221, 115, 115)",
          },
          links: {
            color:"rgb(28, 13, 93)",
            distance: 200,
            enable: true,
            opacity: 0.7,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
            max: 90,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 8 },
          },
        },
        detectRetina: true,
      }}
      // options={{
      //   background: {
      //     color: {
      //       value: "#DCDEF2",
      //     },
      //   },
      //   fpsLimit: 120,
      //   particles: {
      //     color: {
      //       value: "#500759",
      //     },
      //     links: {
      //       color: "#500759",
      //       distance: 300,
      //       enable: true,
      //       opacity: 0.5,
      //       width: 1,
      //     },
      //     interactivity: {
      //       events: {
      //         onClick: {
      //           enable: true,
      //           mode: "push",
      //         },
      //         onHover: {
      //           enable: true,
      //           mode: "repulse",
      //         },
      //         resize: true,
      //       },
      //       modes: {
      //         push: {
      //           quantity: 4,
      //         },
      //         repulse: {
      //           distance: 200,
      //           duration: 0.4,
      //         },
      //       },
      //     },

      //     move: {
      //       direction: "none",
      //       enable: true,
      //       outModes: {
      //         default: "bounce",
      //       },
      //       random: false,
      //       speed: 1.2,
      //       straight: false,
      //     },
      //     number: {
      //       density: {
      //         enable: true,
      //         area: 1000,
      //       },
      //       value: 80,
      //     },
      //     opacity: {
      //       value: 0.5,
      //     },
      //     shape: {
      //       type: "circle",
      //     },
      //     size: {
      //       value: { min: 1, max: 5 },
      //     },
      //   },
      //   detectRetina: true,
      // }}
    />
  );
};
