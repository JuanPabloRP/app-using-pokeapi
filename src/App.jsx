import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import NoMatch from './components/NoMatch';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="" element={<Home />}></Route>
					<Route path="pokemon/:name" element={<Pokemon />}></Route>
				</Route>
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</Router>
	);
}

export default App;
