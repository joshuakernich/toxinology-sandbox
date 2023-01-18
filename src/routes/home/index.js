import { h } from 'preact';
import style from './style.css';
import SearchPillar from '../../components/SearchPillar';
import ResultsPillar from '../../components/ResultsPillar';

const Home = () => (
	<div class={style.home}>
		<SearchPillar></SearchPillar>
		<ResultsPillar></ResultsPillar>
	</div>
);

export default Home;
