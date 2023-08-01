import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card';
import { API_URL } from '../CONSTANTS';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Home = () => {
	const [pokemons, setPokemons] = useState();
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

	
	return (
		<main className="flex flex-col gap-5">
			<h1 className="text-center text-4xl font-extrabold py-5">
				App using PokeAPI
			</h1>
			{loading ? (
				<Loading />
			) : error ? (
				<Error />
			) : (
				<section className="flex justify-center items-center flex-wrap gap-4 max-w-4xl mx-auto">
					{pokemons &&
						pokemons.map((pokemon) => (
							<Card key={pokemon.name} pokemon={pokemon} />
						))}
				</section>
			)}
		</main>
	);
};

export default Home;
