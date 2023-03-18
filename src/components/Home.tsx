function Home() {
	return (
		<>
			<div className="flex flex-col justify-center items-center relative z-1 h-screen max-w-4xl mx-auto">
				<h1 className="mb-4 font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-l from-gradient-purple  to-gradient-red">
					Bienvenido a Dotlabs( )
				</h1>
				<div className="max-w-lg flex flex-col gap-6 items-center text-center">
					<p className="text-main text-2xl">
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
