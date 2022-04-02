Little app I built for myself to lookup a spanish verb's conjugations.

![screenshot](https://raw.githubusercontent.com/filipesabella/conjugate/master/screenshot.png)

Available at:  
[filipesabella.com/conjugate](http://filipesabella.com/conjugate)

You can install it as an app from there. It works fully offline.

I didn't bother making it look good on desktop.

## Why

I didn't like the current available free apps. 

## Attribution

All verb data from:
https://github.com/ghidinelli/fred-jehle-spanish-verbs


## For future me

To re-parse the raw-data, use:

```
import { parseData } from '../lib/data';
console.log(parseData(require('../../data/es-verbs-raw.json')))
```

and paste the contents into the es-verbs.json file.
