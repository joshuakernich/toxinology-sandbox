import { h, Component } from 'preact';
import style from './shared.css';
import Pill from './Pill';
import { useLayoutEffect, useState, useRef } from 'preact/hooks';
import {Br1, Br2} from './Br';
import { getMatchingTerms } from '../libs/sitemap';

const KeywordBuilder = (props) => {
  const inputRef = useRef(null);
  // PF TODO: this pill builder needs help
  const [list, setList] = useState([]);
  
  useLayoutEffect(() => {
    // on first render set the list to the current, after that, we can keep the list here
    if (inputRef.current) {
      inputRef.current.value = props.current.text
    };
  }, []);

  const onInputChange = async (e) => {
    // check if we can fill a pill with the value
    const inputValue = inputRef.current.value;

    // check if the value has something
    const matchingTerms = await getMatchingTerms(inputValue);

    if ((matchingTerms?.length ?? 0) > 0) {
      setList([...matchingTerms.map(term => term.value)]);
    } else {
      setList([]);
    }

    props.onChange({
      text: inputRef.current.value,
      matchingTerms
    })
  }

  return <div class={style.keywordBuilder}>
    <input ref={inputRef} onInput={onInputChange}/>
    <Br2/>
    {list.map((keyword)=> <Pill>{keyword}</Pill>)}
  </div>
};

export default KeywordBuilder;

