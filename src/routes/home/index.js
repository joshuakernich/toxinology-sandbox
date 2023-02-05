import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style.css';
import SearchPillar from '../../components/SearchPillar';
import ResultsPillar from '../../components/ResultsPillar';
import API from '../../services/api';

import { API_URL } from '../../libs/consts';

const Home = () => {

	const [results,setResults] = useState([]);

	const research = async (keywords=['snake'])=>{

		const response = await fetch(`${API_URL}/search`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Headers': "true",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({matchingTerms:keywords,unmatchedWords:keywords,text:''})
    });

    if(response){
    	const body = await response.json();
    	console.log(body);
    	console.log(body.exclusive[0]);

    	setResults(body.exclusive);
    }
	}

	useEffect(() => {
		 research();
		}, []);


	return <div class={style.home}>
		<SearchPillar research={research}></SearchPillar>
		<ResultsPillar results={results}></ResultsPillar>
	</div>
};

export default Home;
