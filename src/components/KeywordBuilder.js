import { h, Component } from 'preact';
import style from './shared.css';
import Pill from './Pill';
import { useState } from 'preact/hooks';
import {Br1, Br2} from './Br';

const KeywordBuilder = (props) => {
  // PF TODO: this pill builder needs help
  const [list, setList] = useState(props.current);
  const ideas = ['snake','spider','scorpion']

  const addKeyword = (key)=> {
    const newList = list.concat(key);

    props.onChange(newList);

    setList(newList);
  }

  return <div class={style.keywordBuilder}>
    <input/>
    <Br2/>
    {list.map((keyword)=> <Pill>{keyword}</Pill>)}
    {ideas.map((keyword)=> <Pill>{keyword}</Pill>)}
    
  </div>
};

export default KeywordBuilder;

