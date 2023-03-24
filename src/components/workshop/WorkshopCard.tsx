export interface IWorkshopCard {
	title: string;
	date: string;
	speakers: string[];
	tags: string[];
	description: string;
}

export const WorkshopCard = ({
	title,
	date,
	speakers,
	tags,
	description,
}: IWorkshopCard) => {
	const Speakers = () => (
		<p>
			<span className="font-bold">Presentado por:</span> {speakers.join(", ")}
		</p>
	);

	const Description = () => {
		if (description === "") return null;
		return <p>{description}</p>;
	};

	return (
		<div className="flex flex-col border-2 border-main rounded-md z-30 p-5 h-min mx-auto w-full gap-2 backdrop-blur-sm shadow-md max-w-xl">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl md:text-4xl font-extrabold flex items-start">
					{title}
				</h1>
				<Description />
			</div>
			<p className="w-full bg-gray-200 py-1 px-3 rounded-2xl">
				{new Date(date).toDateString()}
			</p>
			<Speakers />
			<div className="flex flex-wrap gap-2 mt-3">
				{tags.map((t) => {
					return <span className="bg-[#e4eaf4] py-1 px-3 rounded-xl">{t}</span>;
				})}
			</div>
		</div>
	);
};
