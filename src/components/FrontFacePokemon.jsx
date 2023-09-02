const FrontFacePokemon = ({ pokemon }) => {
	return (
		<>
			<figure className="flex justify-center items-center">
				<img
					src={pokemon?.sprites?.front_default}
					alt=""
					className=""
					width={200}
					height={200}
				/>
			</figure>
			<h1 className="text-4xl py-4 font-bold">
				{pokemon?.name?.toUpperCase()}
			</h1>
			<section className="self-start">
				<article className="flex gap-1 text-red-100">
					<span className="font-bold">Type: </span>
					{pokemon &&
						pokemon?.types &&
						pokemon?.types?.map((item) => (
							<span key={item?.type?.name} className="">
								{item?.type?.name}
							</span>
						))}
				</article>
				<article className="flex gap-1 flex-wrap text-red-100">
					<span className="font-bold">Abilities: </span>
					{pokemon &&
						pokemon?.abilities &&
						pokemon?.abilities?.map((item) => (
							<span key={item?.ability?.name} className="">
								{item?.ability?.name}
							</span>
						))}
				</article>
			</section>
		</>
	);
};

export default FrontFacePokemon;
