function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative z-1 h-screen max-w-4xl mx-auto">
        <div className="max-w-lg flex flex-col gap-4 items-center text-justify">
          <h1 className="text-5xl max-w-lg mx-3 text-transparent bg-clip-text bg-gradient-to-l from-gradient-purple  to-gradient-red text-start  font-bold sm:text-center sm:text-5xl lg:text-6xl ">
            Bienvenido a Dotlabs(&ensp;)
          </h1>
          <p className="text-main text-2xl mx-3 sm:text-xl lg:text-2xl">
            Donde aprenderás crypto al lado de los mejores de la comunidad
          </p>

					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
						voluptates cumque aliquam itaque maiores doloremque ea vel optio
						similique illum cupiditate totam quaerat veniam non accusamus.
						Perspiciatis omnis ex sequi.
					</p>

					<div className="flex gap-12">
						<button className="rounded-md text-white p-4 bg-main text-sm">
							Join discord
						</button>
						<button className="rounded-md text-main p-4 bg-transparent border-2 border-main text-sm">
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
