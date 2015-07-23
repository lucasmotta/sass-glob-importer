/*eslint no-unused-expressions: 0, no-var: 0 */
/*eslint-env node, mocha */


import { expect } from 'chai';
import sass from 'node-sass';
import globImporter from './src';


function getCSS(file) {

  return new Promise((resolve, reject) => {

    sass.render({
      file: `./fixtures/${file}`,
      outputStyle: 'compressed',
      importer: globImporter()
    }, (err, res) => err ? reject(err) : resolve(res.css.toString()));

  });

}


describe('sass-glob-importer', () => {

  it('should import all dummy files (*.scss)', (done) => {

    getCSS('all.scss').then((css) => {

      expect(css).to.equal('.one{content:"1 file"}.two{content:"2 file"}.a{content:"a file"}.b{content:"b file"}.c{content:"c file"}.d{content:"d file"}\n');

      done();

    });

  });

  it('should import only a few dummy files ([0-9].scss)', (done) => {

    getCSS('numbers.scss').then((css) => {

      expect(css).to.equal('.one{content:"1 file"}.two{content:"2 file"}\n');

      done();

    });

  });

  it('should import all dummy files from a nested folder (*.scss)', (done) => {

    getCSS('deep/inside/nested.scss').then((css) => {

      expect(css).to.equal('.one{content:"1 file"}.two{content:"2 file"}.a{content:"a file"}.b{content:"b file"}.c{content:"c file"}.d{content:"d file"}\n');

      done();

    });

  });


  it('should import a local file', (done) => {

    getCSS('local-file.scss').then((css) => {

      expect(css).to.exist.and.equal('.d{content:"d file"}\n');

      done();

    });

  });

});
