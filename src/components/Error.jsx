const Error = ({ message }) => {
	return (
		<p className="text-red-600 text-center text-xl font-semibold">
			{message ? message : 'Error al mostrar los datos'}
		</p>
	);
};

export default Error;
