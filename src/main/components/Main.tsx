import * as React from 'react';
import { useState } from 'react';
import '../../style/Main.less';

const data = require('../../data/es-verbs.json');

export const Main = () => {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([] as string[]);
  const [verb, setVerb] = useState(null as any | null);

  const search = (query: string) => {
    setQuery(query);

    setVerb(null);

    if (query === '' || query.length < 2) {
      setMatches([]);
    } else {
      const matches = Object.keys(data)
        .filter((verb: any) => verb.indexOf(query) >= 0)
        .sort((a, b) => a.indexOf(query) - b.indexOf(query));
      setMatches(matches.slice(0, 5));
    }

    document
      .querySelector<HTMLInputElement>('.search input')
      ?.focus();
  };

  const chooseVerb = (verb: string) => {
    setMatches([]);
    setQuery(verb);
    setVerb(data[verb]);
  };

  return <div className="main">
    <div className="search">
      <input
        type="search"
        placeholder="Search for a verb"
        autoFocus={true}
        value={query}
        onChange={e => search(e.target.value)}></input>
      {query.length >= 1 && <span
        className="clear"
        onClick={() => search('')}>clear</span>}
    </div>

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
          <p><label>Translation</label><span>{verb.translation}</span></p>
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
