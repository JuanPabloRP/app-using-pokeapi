import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../CONSTANTS';

const Card = ({ pokemon }) => {
	const [pokemonInfo, setPokemonInfo] = useState();

	useEffect(() => {
		fetch(`${API_URL}pokemon/${pokemon?.name}`)
			.then((res) => {
				if (!res.ok) return 'error';
				return res.json();
			})
			.then((data) => setPokemonInfo(data))
			.catch((err) => 'error ' + err);
	}, []);

	//console.log(pokemonInfo);

	return (
		<article className="bg-red-400 flex flex-col items-center text-white rounded-md p-3 hover:scale-110 hover:bg-gray-500 cursor-pointer">
			<Link to={`pokemon/${pokemon?.name}`}>
				<h2 className="text-lg font-bold text-center">
					{pokemonInfo?.species?.name}
				</h2>
				<img src={pokemonInfo?.sprites?.front_default} alt="" />
			</Link>
		</article>
	);
};

Card.propTypes = {
	pokemon: PropTypes.any.isRequired,
};

export default Card;
