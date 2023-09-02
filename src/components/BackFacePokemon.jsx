const BackFacePokemon = ({ pokemon }) => {
	const statsEmojis = {
		hp: '💖',
		attack: '⚔️',
		defense: '🛡️',
		speed: '🏃',
		'special-attack': '⚡️',
		'special-defense': '💎',
		evasion: '🌿',
		accuracy: '🎯',
	};
	return (
		<section className="w-full h-full flex flex-col justify-around ">
			<figure className="flex justify-center items-center w-full h-full">
				<img
					src={pokemon?.sprites?.back_default}
					alt=""
					className="scale-x-[-1]"
					width={180}
					height={180}
				/>
			</figure>
			<h2 className="text-center font-bold text-xl">Stats</h2>
			<article className="flex flex-col items-start w-full">
				{pokemon?.stats?.map(({ base_stat, stat }) => (
					<span key={stat?.name} className="capitalize">
						{statsEmojis[stat?.name.toLowerCase()] || ''}
						{stat?.name}: {base_stat}
					</span>
				))}
			</article>
		</section>
	);
};

export default BackFacePokemon;
