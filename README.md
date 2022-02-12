Little app I built for myself to show you a spanish verb's conjugations.
I didn't like the current free apps in the app store.

I didn't bother making it look good on desktop.

All verb data from:
https://github.com/ghidinelli/fred-jehle-spanish-verbs


To re-parse the raw-data, use:

```
import { parseData } from '../lib/data';
console.log(parseData(require('../../data/es-verbs-raw.json')))
```

and paste the contents into the es-verbs.json file.
