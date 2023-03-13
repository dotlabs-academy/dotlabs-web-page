import VanillaTilt from "vanilla-tilt";
import { useEffect, useRef } from "react";

function Title() {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      VanillaTilt.init(divRef.current, {
        perspective: 1000,
        max: 15,
        reset:false,
        scale: 1.05,
        speed: 100,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        glare: true,
        "max-glare":0.2,
      });
    }
  }, []);
  return (
    <div
      data-tilt
      data-tilt-full-page-listening
      ref={divRef}
      className="tilt tail_container flex items-center justify-center py-5 md:py-7 lg:py-10 px-5  md:px-15 lg:px-20  "
    >
      <div className="tail_cont flex flex-col justify-center items-center space-y-5">
        <h1
          data-tilt-axis="y"
          className="title  font-bold text-3xl md:text-7xl lg:text-7xl text-main "
        >
          DOTLABS ( )
        </h1>
        <p className="font-bold  text-md px-8 font-bitter text-center z-10">
          Entusiastas de la tecnología unidos para compartir conocimientos y
          experiencias
        </p>
        <p className="z-10 font-bitter  text-sm px-8 text-center">
          Dotlabs() es una comunidad de desarrolladores. Somos un equipo que
          comparte conocimientos, experiencias y grandes momentos.
        </p>
      </div>
    </div>
  );
}

export { Title };
