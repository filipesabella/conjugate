// doing some things imperatively as doing it functionally was lagging the
// browser because of the data volume
export function parseData(rawData: any): any {
  // {
  //   "performer": "ellos/ellas/ustedes",
  //   "mood": "Subjunctive",
  //   "infinitive": "ubicar",
  //   "performer_en": "them / you all (formal)",
  //   "tense": "Future",
  //   "has_long": false,
  //   "translation": "to place; locate; to be located; be situated"
  // }

  const byInfinitive = Object.keys(rawData)
    .reduce((acc, conjugation) => {
      const conjugations = rawData[conjugation] as any[];
      conjugations.forEach(conjugationMetadata => {
        // the data has the `verb` field for gerund and past-participle
        const infinitive = conjugationMetadata.infinitive || conjugationMetadata.verb;

        // in the data, there's a whole conjugation-type called "infinitive",
        // that doesn't have the `infinitive` nor the `verb` fields, and that
        // data is not useful for us, so we ignore it.
        if (infinitive) {
          if (!acc[infinitive]) acc[infinitive] = [];
          acc[infinitive].push({
            conjugation,
            ...conjugationMetadata,
          });
        }
      });

      return acc;
    }, {} as any);

  return Object.keys(byInfinitive)
    //.slice(0, 2)
    .reduce((acc, infinitive) => {
      const rawConjugations = byInfinitive[infinitive] as any;

      const gerund = rawConjugations
        .find((c: any) => c.tense === 'Gerund')
        ?.conjugation;

      if (!gerund) console.log(byInfinitive[undefined as any]);

      // reflexive verbs don't have past-participles
      const pastParticiple = rawConjugations
        .find((c: any) => c.tense === 'Pastparticiple')
        ?.conjugation;

      const conjugationsByCategory = rawConjugations
        .filter((c: any) => c.tense !== 'Gerund' && c.tense !== 'Pastparticiple')
        .reduce((acc: any, c: any) => {
          const category = `${c.tense} - ${c.mood}`;
          if (!acc[category]) acc[category] = [];
          acc[category].push(c);
          return acc;
        }, {} as any);

      const conjugations = Object.keys(conjugationsByCategory)
        .sort(sortCategories)
        .reduce((acc, category) => {
          const conjugations = conjugationsByCategory[category];
          acc.push({
            category,
            conjugations: conjugations
              .sort(sortByPerformer)
              .map(mapConjugation),
          });
          return acc;
        }, [] as any[])
        .sort(sortCategories)
        .map(mapCategories);

      acc[infinitive] = {
        gerund,
        pastParticiple,
        conjugations,
      };

      return acc;
    }, {} as any);
}

function sortByPerformer(a: any, b: any): number {
  const order = [
    'yo',
    'tú',
    'él/ella/usted',
    'nosotros/nosotras',
    'vosotros/vosotras',
    'ellos/ellas/ustedes',
  ];

  return order.indexOf(a.performer) - order.indexOf(b.performer);
}

function mapConjugation(c: any): any {
  const m: { [key: string]: string } = {
    'yo': 'yo',
    'tú': 'tú',
    'él/ella/usted': 'usted',
    'nosotros/nosotras': 'nosotros',
    'vosotros/vosotras': 'vosotros',
    'ellos/ellas/ustedes': 'ustedes',
  };

  return {
    text: c.long || c.conjugation,
    performer: m[c.performer],
  };
}

function sortCategories(a: any, b: any): number {
  const order = [
    'Present - Indicative',
    'Preterite - Indicative',
    'Future - Indicative',
    'Imperfect - Indicative',

    'Present - Imperative Affirmative',
    'Present - Imperative Negative',

    'Present Perfect - Indicative',
    'Past Perfect - Indicative',
    'Future Perfect - Indicative',
    'Conditional Perfect - Indicative',

    'Preterite (Archaic) - Indicative',

    'Conditional - Indicative',

    'Present - Subjunctive',
    'Future - Subjunctive',
    'Present Perfect - Subjunctive',
    'Past Perfect - Subjunctive',
    'Imperfect - Subjunctive',
    'Future Perfect - Subjunctive',
  ];

  return order.indexOf(a.category) - order.indexOf(b.category);
}

function mapCategories(c: any): any {
  const m: { [key: string]: string } = {
    'Present - Indicative': 'Present',
    'Preterite - Indicative': 'Preterite',
    'Future - Indicative': 'Future',
    'Imperfect - Indicative': 'Imperfect',

    'Present - Imperative Affirmative': 'Imperative Affirmative',
    'Present - Imperative Negative': 'Imperative Negative',

    'Present Perfect - Indicative': 'Present Perfect',
    'Past Perfect - Indicative': 'Past Perfect',
    'Future Perfect - Indicative': 'Future Perfect',
    'Conditional Perfect - Indicative': 'Conditional Perfect',

    'Preterite (Archaic) - Indicative': 'Preterite (Archaic)',

    'Conditional - Indicative': 'Conditional',

    'Present - Subjunctive': 'Subjunctive Present',
    'Future - Subjunctive': 'Subjunctive Future',
    'Present Perfect - Subjunctive': 'Subjunctive Present Perfect',
    'Past Perfect - Subjunctive': 'Subjunctive Past Perfect',
    'Imperfect - Subjunctive': 'Subjunctive Imperfect',
    'Future Perfect - Subjunctive': 'Subjunctive Future Perfect',
  };

  return {
    ...c,
    category: m[c.category],
  };
}
