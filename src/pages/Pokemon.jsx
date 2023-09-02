import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiArrowLeft, HiArrowUturnLeft } from 'react-icons/hi2';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { API_URL } from '../CONSTANTS';
import FrontFacePokemon from '../components/FrontFacePokemon';
import BackFacePokemon from '../components/BackFacePokemon';

const Pokemon = () => {
	const { name } = useParams();
	const [pokemons, setPokemons] = useState([]);
	const [pokemon, setPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(`${API_URL}pokemon`)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Network response was not ok');
				}
				return res.json();
			})
			.then((data) => {
				const { results } = data;
				setPokemons(results);
			})
			.catch((err) => {
				setError(true);
				console.error('Error fetching pokemon list:', err);
			})
			.finally(() => setLoading(false));
	}, []);

	const pokemonData = pokemons.find((poke) => poke.name === name);

	useEffect(() => {
		if (!pokemonData) {
			return;
		}

		fetch(`${API_URL}pokemon/${pokemonData.name}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Network response was not ok');
				}
				return res.json();
			})
			.then((data) => setPokemon(data))
			.catch((err) => {
				setError(true);
				console.error('Error fetching pokemon data:', err);
			});
	}, [pokemonData]);

	return (
		<main
			className={`min-w-full min-h-screen flex flex-col justify-center items-center gap-5`}
		>
			<Link to={'/'}>
				<HiArrowLeft className="w-7 h-7" />
			</Link>
			{loading ? (
				<Loading />
			) : error ? (
				<Error />
			) : (
				<section
					className={`min-h-[420px] min-w-[320px] max-w-xs h-full w-full bg-red-400 text-white flex flex-col items-center rounded-md border-2 border-red-500 p-5 `}
				>
					<button
						className="self-end cursor-pointer hover:text-red-200 "
						onClick={() => setIsFlipped(!isFlipped)}
					>
						<HiArrowUturnLeft className="w-5 h-5" />
					</button>
					<main className="flex flex-col items-center w-full h-full">
						{!isFlipped ? (
							<>
								<FrontFacePokemon pokemon={pokemon} />
							</>
						) : (
							<>
								<BackFacePokemon pokemon={pokemon} />
							</>
						)}
					</main>
				</section>
			)}
		</main>
	);
};

export default Pokemon;
