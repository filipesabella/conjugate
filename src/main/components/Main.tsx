import * as React from 'react';
import { useState } from 'react';
import '../../style/Main.less';

const data = require('../../data/es-verbs.json');

export const Main = () => {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([] as string[]);
  const [verb, setVerb] = useState(null as any | null);

  const search = (query:string) => {
    setQuery(query);

    setVerb(null);

    if (query === '') {
      setMatches([]);
    } else {
      const matches = Object.keys(data)
        .filter((verb: any) => fuzzy(query, verb));
      setMatches(matches.slice(0, 5));
    }
  };

  const chooseVerb = (verb: string) => {
    setMatches([]);
    setQuery(verb);
    setVerb(data[verb]);
  };

  return <div className="main">
    <input type="text"
      autoFocus={true}
      value={query}
      onChange={e => search(e.target.value)}></input>

    {matches.length > 0 && <ul className="matches">
      {matches.map(m =>
        <li key={m} onClick={() => chooseVerb(m)}>{m}</li>)}
    </ul>}

    {verb &&
      <div className="verb">
        <header>
          <p><label>Gerund</label><span>{verb.gerund}</span></p>
          {verb.pastParticiple && <p>
            <label>Past Part.</label>
            <span>{verb.pastParticiple}</span></p>}
        </header>
        <ul className="conjugations">
          {verb.conjugations.map((conjugation: any) => {
            return <li key={conjugation.category}>
              <h2 className="category">{conjugation.category}</h2>
              <ul>
                {conjugation.conjugations.map((conjugation: any) => {
                  return <li
                    key={`${conjugation.performer}-${conjugation.conjugation}`}>
                    <span className="performer">{conjugation.performer}</span>
                    <span className="conjugation">{conjugation.text}</span>
                  </li>;
                })}
              </ul>
            </li>;
          })}
        </ul>
      </div>
    }
  </div>;
};

// https://stackoverflow.com/questions/9206013/javascript-fuzzy-search
function fuzzy(query: string, text: string): boolean {
  for (let i = 0, n = -1, l; l = query[i]; i++)
    if (!~(n = text.indexOf(l, n + 1))) return false;

  return true;
}
