import solidityBAM from "../../public/assets/images/solidity-bam.jpg";
import ozGovernor from "../../public/assets/images/oz-governor.png";
import rainbowKitBAM from "../../public/assets/images/rainbow-bam.png";
import astar1 from "../../public/assets/images/astar-1.png";
import astar2 from "../../public/assets/images/astar-2.png";
import astar3 from "../../public/assets/images/astar-3.webp";

export const workshops = [
	{
		title: "Introducción a Solidity (BAM)",
		speakers: ["Platohedro"],
		imgUrl: solidityBAM,
		description:
			"Aprendamos los conceptos básicos Solidity, como tipos de datos, estructuras de control de flujo y funciones, así como aspectos más avanzados como la herencia y las bibliotecas. Además, hablaremos sobre la herramienta web Remix, que es una forma súper fácil de desarrollar, compilar y desplegar tus contratos inteligentes.",
		date: "04/15/2023",
		tags: ["Solidity", "EVM", "Smart Contracts", "Web3"],
		calendarEventUrl:
			"http://www.google.com/calendar/event?location=Globant+-+One+Plaza+-+Medellin&action=TEMPLATE&details=Aprendamos+un+poco+de+los+contratos+de+gobernanza+y+sus+usos.&text=OpenZeppelin+Governor&dates=20230408T190000Z%2F20230408T213000Z",
	},
	{
		title: "OpenZeppelin Governor",
		speakers: ["Juan Cogollo", "Tomas Calle"],
		imgUrl: ozGovernor,
		description:
			"Aprendamos un poco sobre los contratos de gobernanza creado por el equipo de Open Zeppelin y como podemos utilizarlos para crear nuestros propios protocolos de gobernanza.",
		date: "04/22/2023",
		tags: ["Blockchain", "Open Zeppelin", "Solidity"],
		calendarEventUrl:
			"http://www.google.com/calendar/event?location=Globant+-+One+Plaza+-+Medellin&action=TEMPLATE&details=Aprendamos+un+poco+de+los+contratos+de+gobernanza+y+sus+usos.&text=OpenZeppelin+Governor&dates=20230408T190000Z%2F20230408T213000Z",
	},
	{
		title: "Introducción a RainbowKit (BAM)",
		speakers: ["Platohedro"],
		imgUrl: rainbowKitBAM,
		description:
			"Exploremos RainbowKit: una librería React para agregar fácilmente conexiones de monedero a tu dapp. Es intuitiva, personalizable y con características útiles como la gestión de carteras lista para usar, soporte para numerosas billeteras, intercambio de cadenas de conexión, resolución de direcciones a ENS, balance y ¡mucho más! Únete a nosotros para conocer todas sus características.",
		date: "04/29/2023",
		tags: ["RainbowKit", "Solidity", "React", "Smart Contracts", "Web3"],
		calendarEventUrl:
			"http://www.google.com/calendar/event?location=Globant+-+One+Plaza+-+Medellin&action=TEMPLATE&details=Aprendamos+un+poco+de+los+contratos+de+gobernanza+y+sus+usos.&text=OpenZeppelin+Governor&dates=20230408T190000Z%2F20230408T213000Z",
	},
	{
		title: "De mortal a Dios con Rust I: Fundamentos.",
		speakers: ["Carlos Rodriguez"],
		imgUrl: astar1,
		description:
			"Aprende los fundamentos y las particularidades del lenguajes de programación Rust. Uno de los lenguajes más amados en la industria.",
		date: "05/6/2023",
		tags: ["Blockchain", "Rust", "Smart Contracts", "CLI"],
		calendarEventUrl:
			"http://www.google.com/calendar/event?location=Globant+-+One+Plaza+-+Medellin&action=TEMPLATE&details=Aprende+los+fundamentos+y+las+particularidades+del+lenguajes+de+programación+Rust.+Uno+de+los+lenguajes+más+amados+en+la+industria.&text=De+mortal+a+Dios+con+Rust+I:+Fundamentos&dates=20230415T190000Z%2F20230415T213000Z",
	},
	{
		title: "De mortal a Dios con Rust II: Astar Network.",
		speakers: ["Carlos Rodriguez"],
		imgUrl: astar2,
		description:
			"Conoce la parachain más popular del ecosistema de Polkadot. Crea tus primeros Smart Contracts en Astar Network y diseña tu primer proyecto.",
		date: "05/13/2023",
		tags: [
			"Blockchain",
			"Rust",
			"Smart Contracts",
			"Astar",
			"Polkadot",
			"Substrate",
		],
		calendarEventUrl:
			"http://www.google.com/calendar/event?location=Globant+-+One+Plaza+-+Medellin&action=TEMPLATE&details=Conoce+la+parachain+más+popular+del+ecosistema+de+Polkadot.+Crea+tus+primeros+Smart+Contracts+en+Astar+Network+y+diseña+tu+primer+proyecto.&text=De+mortal+a+Dios+con+Rust+II:+Astar+Network&dates=20230422T190000Z%2F20230422T213000Z",
	},
	{
		title: "De mortal a Dios con Rust III: Astar Network.",
		speakers: ["Carlos Rodriguez"],
		imgUrl: astar3,
		description:
			"Para finalizar con esta sega crea una DApp de tokenizacion en Astar Network. Tokeniza cualquier activo digital y compartelo.",
		date: "05/20/2023",
		tags: [
			"Blockchain",
			"Rust",
			"Smart Contracts",
			"Astar",
			"Polkadot",
			"Substrate",
		],
		calendarEventUrl:
			"http://www.google.com/calendar/event?location=Globant+-+One+Plaza+-+Medellin&action=TEMPLATE&details=Para+finalizar+con+esta+saga+crea+una+DApp+de+tokenizacion+en+Astar+Network.+Tokeniza+cualquier+activo+digital+y+compartelo.&text=De+mortal+a+Dios+con+Rust+III:+Astar+Network&dates=20230429T190000Z%2F20230429T213000Z",
	},
];
