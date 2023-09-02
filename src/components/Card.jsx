import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../CONSTANTS';
import SkeletonCard from './SkeletonCard';

const Card = ({ pokemon }) => {
	const [pokemonInfo, setPokemonInfo] = useState(null);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		if (!pokemon) {
			return;
		}

		setLoading(true);
		fetch(`${API_URL}pokemon/${pokemon?.name}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Network response was not ok');
				}
				return res.json();
			})
			.then((data) => setPokemonInfo(data))
			.catch((err) => {
				console.error('Error fetching pokemon data: ', err);
			})
			.finally(() => setLoading(false));
	}, [pokemon]);

	//console.log(pokemonInfo);

	return (
		<article className="bg-red-400 flex flex-col items-center text-white rounded-md p-3 hover:scale-110 hover:bg-gray-500 cursor-pointer w-32 group">
			{loading ? (
				<SkeletonCard />
			) : (
				<Link to={`pokemon/${pokemon?.name}`}>
					<h2 className="text-lg font-bold text-center">
						{pokemonInfo?.species?.name}
					</h2>
					<img src={pokemonInfo?.sprites?.front_default} alt="" />
				</Link>
			)}
		</article>
	);
};

Card.propTypes = {
	pokemon: PropTypes.object.isRequired,
};

export default Card;
