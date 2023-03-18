function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative z-1 h-5/6 max-w-5xl mx-auto lg:mx-5">
        <div className="max-w-lg flex flex-col gap-4 items-center text-justify sm:max-w-fit sm:w-5/6 md:w-full lg:gap-6 lg:w-12/12 lg:max-w-full">
          <h1 className="text-5xl max-w-lg mx-3 text-transparent bg-clip-text bg-gradient-to-l from-gradient-purple  to-gradient-red text-start  font-bold sm:text-center  sm:max-w-3xl sm:text-6xl lg:text-7xl lg:max-w-5xl ">
            Bienvenido a Dotlabs(&ensp;)
          </h1>
          <p className="text-main text-2xl mx-3 md:max-w-2xl md:text-center lg:text-3xl">
            Donde aprenderás crypto al lado de los mejores de la comunidad
          </p>

          <p className="text-base mx-3 md:max-w-2xl lg:text-lg lg:text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
            voluptates cumque aliquam itaque maiores doloremque ea vel optio
            similique illum cupiditate totam quaerat veniam non accusamus.
            Perspiciatis omnis ex sequi.
          </p>

          <div className="grid grid-col gap-6 w-screen   items-center  max-w-lg sm:flex sm:gap-4  sm:flex-row sm:justify-center sm:w-full  lg:gap-10">
            <button className="rounded-sm  bg-main text-bold mx-3 flex-1  py-5 text-lg text-bold text-white sm:mx-0  sm:w-6/6 sm:py-3 sm:rounded-md  lg:px-4 lg:py-4 lg:text-lg">
              Join discord
            </button>
            <button className="rounded-sm bg-transparent border-2 border-main text-bold  mx-3 flex-1 py-5 text-lg text-bold  text-main  sm:py-3 sm:mx-0 sm:w-full sm:rounded-md lg:px-4 lg:py-4 lg:text-lg ">
              Watch our lives
            </button>
          </div>
        </div>

				{/* <p>
            Entusiastas de la tecnología unidos para compartir conocimientos y
            experiencias
          </p>
          <p>
            Dotlabs() es una comunidad de desarrolladores. Somos un equipo que
            comparte conocimientos, experiencias y grandes momentos.
          </p> */}
			</div>
		</>
	);
}

export { Home };
