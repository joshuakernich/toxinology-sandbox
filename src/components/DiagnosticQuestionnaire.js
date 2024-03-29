import { h, Component } from 'preact';
import { Link } from "preact-router/match";
import { useLayoutEffect, useState, useRef, useContext } from 'preact/hooks';
import { sitemap } from "../libs/sitemap.js";
import style from './shared.css';
import SearchResults from '../components/SearchResultsContext.js';
import LocationBuilder from './LocationBuilder';
import { Br1, Br2 } from './Br';

const DIAGNOSIS_ANSWERS_VALUES = {
  UNANSWERED: "U",
  UNKNOWN: ".",
  NO: "N",
  YES: "Y",
};

const DEFAULT_OPTIONS = [
  {
    text: "Yes",
    value: DIAGNOSIS_ANSWERS_VALUES.YES
  },
  {
    text: "No",
    value: DIAGNOSIS_ANSWERS_VALUES.NO
  },
  {
    text: "Unknown",
    value: DIAGNOSIS_ANSWERS_VALUES.UNKNOWN
  }
]

const DiagnosisQuestion = (props) => {
  const onChange = (nextValue) => {
    props.onChange({key: props._key, response: nextValue});
  }


  const options = props.options || DEFAULT_OPTIONS;

  return <diagnosticQuestionContainer answered={props.response != 'U'}>
    <diagnosticQuestionText>
      {props.text}
    </diagnosticQuestionText>

    <switchContainer className={options.length > 4 ? "vertical" : ""}>
      {options.map(op => [
        <switchOption checked={props.response == op.value}><input 
          type="radio" 
          name={`${props._key}-input`} 
          value={op.value}
          onChange={() => onChange(op.value)}
          checked={props.response == op.value} />
        <label for={`${props._key}-input`} onClick={() => onChange(op.value)}>{op.text}</label>
        </switchOption>
      ])}
    </switchContainer>
  </diagnosticQuestionContainer>;
}

const DiagnosticQuestionnaire = ({current, onChange, locationsRef, onLocationChange}) => {

  const searchResults = useContext(SearchResults);
  const [okayDisclaimer, setOkayDisclaimer] = useState(false);
  const [okayLocation, setOkayLocation] = useState(false);
  const [exposureRoute, setExposureRoute] = useState();
  const [questionQuery, setQuestionQuery] = useState(current);

  const clearResponses = (invokeChange = true) => {
    if(!sitemap.diagnosis) return;

    setExposureRoute()
    setOkayLocation(false);
    startQuestions(invokeChange);

    if (!invokeChange) return;

    onChange([]);
  }



  const startQuestions =(invokeChange = true)=>{

     const nextQuestionQuery = sitemap.diagnosis.questions.map((question, index) => {
      // key is a protected keyword
      const currentResponse = (!invokeChange && current && current[index]?.response) || DIAGNOSIS_ANSWERS_VALUES.UNANSWERED;

      return {
        _key: question.key,
        index,
        text: question.text,
        options: question.options,
        response: currentResponse
      };
    });

    setQuestionQuery(nextQuestionQuery);
  }

  useLayoutEffect(() => {
    // write out the question query
    clearResponses(false);
    // todo make the query respond to url

    // only run once
  }, []);
  
  const updateQuestionQueries = (values) => {
    current = [];

    onChange(values);
    setQuestionQuery(values);
  };

  const allResults = searchResults?[...searchResults.exclusive, ...searchResults.unexclusive]:[];

  // TODO: CLEAN CODE REUSE!
  const answeredDiagnosisTrack = questionQuery.map(diagnosticQuestion => diagnosticQuestion.response).join('').replace(/u/gi, ".").replace(/\.*$/g, "");
  const answeredDiagnosisTrackRegex = new RegExp(answeredDiagnosisTrack, "ig");

  const possibleOrganismTracks = allResults
    .map(organism => sitemap.diagnosis.tracks[organism.oid].q)
    .filter(track => track.match(answeredDiagnosisTrackRegex));

  // we want to see only questions where a Y or N answer exists
  const filteredQuestions = questionQuery
    .filter(question => {
      return possibleOrganismTracks.find(track => ['Y', 'N'].includes(track[question.index]))
    });
  const getOrganismCountWithResults = (question) => {
    return possibleOrganismTracks.filter(track => ['Y', 'N'].includes(track[question.index])).length;
  };
  const answeredQuestions = questionQuery.filter((q) => q.response);
  const unansweredQuestions = filteredQuestions
    .filter((q) => !q.response)
    .sort((qa, qb) => {
      return getOrganismCountWithResults(qa) - getOrganismCountWithResults(qb);
    });

  const renderQuestion = (question) => {
    return <DiagnosisQuestion {...question} index={question.index}  response={question.response} onChange={({key, response}) => {
      const question = questionQuery.find(question => question._key == key);

      question.response = response;

      updateQuestionQueries([...questionQuery]);
    }} />
  };

  // TODO: on question change, clear the next questions

  if(!okayDisclaimer) return <diagnosticWrapper>
      <h1>Diagnostic Questionnaire</h1>
      <Br2/>
      <strong>NOTE: </strong>Results are indicative only and should not be relied on to include or exclude any organisms.
      <Br2/>
      <button onClick={()=>setOkayDisclaimer(true)} class={style.confirm}>Acknowledge</button>
    </diagnosticWrapper>

  if(!okayLocation) return <diagnosticWrapper>
      <h1>Diagnostic Questionnaire</h1>
      <Br2/>
      Where did the exposure occur?
      <Br2/>
      <LocationBuilder current={locationsRef.current} onChange={onLocationChange}/>
      <Br2/>
      <button onClick={()=>{
        setOkayLocation(true);
        startQuestions();
      }} class={style.confirm}>Confirm Location</button>
    </diagnosticWrapper>

  return [
    <diagnosticWrapper>
      <h1>Diagnostic Questionnaire</h1>
      <Br2/>
      Where did the exposure occur?
      <Br2/>
      <LocationBuilder current={locationsRef.current} onChange={onLocationChange}/>
      <Br1/>
      <diagnosticQuestionWrapper viable={possibleOrganismTracks.length>0}>
        {
          answeredQuestions.map(renderQuestion)
        }
        {
          unansweredQuestions.map(renderQuestion)
        }
      </diagnosticQuestionWrapper>
      {possibleOrganismTracks.length?'':
        <>
        <calloutCountainer type='disclaimer'>
          Oops! There are no organisms that seem to match this diagnostic criteria. Please review your selections, or widen the search criteria.
        </calloutCountainer>
        <Br2/>
        </>
      }
      <button class={style.restart} onClick={clearResponses}>Clear Responses</button>
      {/*matches && <diagnosticMatchesWrapper>
        <diagnosticMatchesHeader>Found {matches.count} related results.</diagnosticMatchesHeader>
        <diagnosticMatchesContainer>{matches.sequences.map(v => [<a href={`/details/${v.key}`}>{v.key}</a>, ', '])}</diagnosticMatchesContainer>
      </diagnosticMatchesWrapper>*/}
    </diagnosticWrapper>
  ]
};

export default DiagnosticQuestionnaire;

