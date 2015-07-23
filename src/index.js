import path from 'path';
import Map from 'es6-map';
import isGlob from 'is-glob';
import sort from 'sort-object';
import mapFiles from 'map-files';


/**
 * Look for wildcard imports
 * @return {Function}         Function to be used by node-sass importer
 */
export default function() {

  const aliases = new Map();

  return function(url, parent, done) {

    const base = path.join(path.dirname(parent), url);

    if (aliases.has(base)) {

      return done(aliases.get(base));

    }

    if (isGlob(base)) {

      const files = sort(mapFiles(base));
      const contents = Object.keys(files).map((key) => files[key].content);
      const content = contents.join('\n');

      aliases.set(base, { contents: content });
      return done({ contents: content });

    }

    aliases.set(base, { file: url });
    done({ file: url });

  };

}
