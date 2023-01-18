import { h, Component } from 'preact';
import style from './shared.css';
import Pill from './Pill';
import { useState } from 'preact/hooks';
import {Br1, Br2} from './Br';

const KeywordBuilder = (props) => {

  const [list, setList] = useState([]);
  const ideas = ['snake','spider','scorpion']

  const addKeyword = (key)=> {
    
    setList(list.concat(key));
  }

  return <div class={style.keywordBuilder}>
    <input/>
    <Br2/>
    {list.map((keyword)=> <Pill>{keyword}</Pill>)}
    {ideas.map((keyword)=> <Pill>{keyword}</Pill>)}
    
  </div>
};

export default KeywordBuilder;

