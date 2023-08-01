import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../CONSTANTS';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Pokemon = () => {
	const { name } = useParams();
	const [pokemons, setPokemons] = useState();
	const [pokemon, setPokemon] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(`${API_URL}pokemon`)
			.then((res) => {
				if (!res.ok) setError(true);
				return res.json();
			})
			.then((data) => {
				const { results } = data;
				setPokemons(results);
			})
			.catch((err) => 'error ' + err)
			.finally(setLoading(false));
	}, []);

	const pokemonData = pokemons?.find((poke) => poke?.name === name);

	//console.log(pokemonData);

	useEffect(() => {
		fetch(`${API_URL}pokemon/${pokemonData?.name}`)
			.then((res) => {
				if (!res.ok) return 'error';
				return res.json();
			})
			.then((data) => setPokemon(data))
			.catch((err) => 'error ' + err);
	}, [pokemonData]);

	//console.log(pokemon);

	console.log(pokemon?.types);

	return (
		<main className="min-w-full min-h-screen flex flex-col justify-center items-center gap-5">
			<Link to={'/'}>Back</Link>
			{loading ? (
				<Loading />
			) : error ? (
				<Error />
			) : (
				<section className="bg-red-400 text-white flex flex-col items-center rounded-md border-2 border-red-500">
					<h1 className="text-4xl py-4">{pokemon?.name?.toUpperCase()}</h1>
					<article className="flex gap-1 text-red-100">
						<span>Type: </span>
						{pokemon &&
							pokemon?.types &&
							pokemon?.types?.map((item) => (
								<span key={item?.type?.name} className="">
									{item?.type?.name}
								</span>
							))}
					</article>
					<figure>
						<img
							src={pokemon?.sprites?.other?.dream_world?.front_default}
							alt=""
							className="p-10"
							width={300}
							height={300}
						/>
					</figure>
					<article className="flex gap-1 text-red-100">
						<span>Abilities: </span>
						{pokemon &&
							pokemon?.abilities &&
							pokemon?.abilities?.map((item) => (
								<span key={item?.ability?.name} className="">
									{item?.ability?.name}
								</span>
							))}
					</article>
				</section>
			)}
		</main>
	);
};

Pokemon.propTypes = {};

export default Pokemon;
