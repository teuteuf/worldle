# WOR**L**DLE

Play this geographical wordle here: https://worldle.teuteuf.fr !

## Contributions & PR

Even if there are many more users than I could ever imagine on Worldle, it was originally a small pet project that I started in order to  practice code and have fun.

So, I prefer to continue to manage it personally and do all the design and the code by myself.  :)

Therefore, I'm not looking for contributors or PR! I could accept PR for specific things, for instance to add support for your native language or to fix something, but please, don't hesitate to contact me first!

If you'd like to make a suggestion, don't hesitate to open an issue!

Otherwise, feel free to fork the project, customize it and play with it on your side! <3

## Quick start

### Prerequisites

Install `npm` with your distro's package manager, and then install everything from
`packages.json.lock` using `npm`:

```
$ sudo apt install npm
$ npm ci
```

### Prettier

Update after any changes to follow coding style recommendations:

```
$ npx prettier --write src/components/
```

### Testing

Start a local webserver (which will take a moment initially to build the tree):

```
$ npm start
```

### Publication

Build the tree into the `build` subdirectory, which can be copied to your site:

```
$ npm run build
```

## Resources used:

- Countries with long/lat => https://developers.google.com/public-data/docs/canonical/countries_csv
- Country area => https://github.com/samayo/country-json/blob/master/src/country-by-surface-area.json
- French country names => https://fr.wikipedia.org/wiki/ISO_3166
- Country images => https://github.com/djaiss/mapsicon
- Fixed images => http://www.amcharts.com/svg-maps/ & Wikipedia
- Emojis & World icon => https://github.com/twitter/twemoji
