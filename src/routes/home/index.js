import { h } from 'preact';
import style from './style.css';
import SearchPillar from '../../components/SearchPillar';
import ResultsPillar from '../../components/ResultsPillar';
import API from '../../services/api';

import { API_URL } from '../../libs/consts';

const Home = () => {

	const search = async ()=>{
		const response = await fetch(`${API_URL}/search`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Headers': "true",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({matchingTerms:'snake',unmatchedWords:'snake',text:'snake'})
    });

    console.log(response);
	}


	search();

	return <div class={style.home}>
		<SearchPillar></SearchPillar>
		<ResultsPillar></ResultsPillar>
	</div>
};

export default Home;
