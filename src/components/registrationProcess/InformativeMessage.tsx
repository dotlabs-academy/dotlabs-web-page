import styles from "@/styles/registration/InformativeMessage.module.scss"

export const InformativeMessage = () => {
	return (
		<div className="flex flex-col justify-center border-b-2 pt-10 pb-10 gap-2">
			<h1 className={`${styles.title} text-5xl md:text-7xl font-extrabold `}>
				HI<span className={`${styles.title__span}`}>!</span>
			</h1>
			<h3 className="text-xl md:text-2xl font-bold mx-auto">
				We are testing a new registration system and we love your{" "}
				<a href="https://forms.gle/uo7WmYfvGoKFA5B2A" target="_blank" rel="noreferrer" className="text-blue-400">
					feedback
				</a>{" "}
				about it.
			</h3>
		</div>
	);
};
