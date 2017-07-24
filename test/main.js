/* global describe, it */
/* eslint  import/no-extraneous-dependencies: 1 */

// -- Node modules
import { JSDOM } from 'jsdom';
import { expect } from 'chai';

// -- Local modules
import { Vizu } from '../index';
import testVizuRender from './testvizurender';
import testVizuRenderext from './testvizurenderext';
import testVizuRenderext2 from './testvizurenderext2';
import testVizuReplace from './testvizureplace';
import testVizuComponent from './testvizucomponent';
import testVizuCreateClass from './testvizucreateclass';

// -- Local constants
// Create a Virtual DOM:
const HTML = `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div id="app1"></div>
      <div id="app2"></div>
      <div id="app3"></div>
      <div id="app4"></div>
      <div id="app10"></div>
      <div id="app11"></div>
      <div id="app12"></div>
      <div id="app20"></div>
      <div id="app21"></div>
      <div id="app22"></div>
      <div id="app23"></div>
      <div id="app24"></div>
      <div id="app30"></div>
      <div id="app31"></div>
      <div id="app32"></div>
      <div id="app33"></div>
      <div id="app34"></div>
      <div id="app35"></div>
      <div id="app40"></div>
      <div id="app41"></div>
      <div id="app42"></div>
      <div id="app43"></div>
      <div id="app44"></div>
      <div id="app45"></div>
      <div id="app46"></div>
      <div id="app47"></div>
      <div id="app50"></div>
    </body>
  </html>
`;
const dom = new JSDOM(HTML);
// Attach virtual dom to Vizu:
Vizu.vdom = dom;


// -- Local variables


// -- Main
describe('Vizu', () => {
  describe('Test Vizu methods:', () => {
    //
    describe('Test the method version():', () => {
      it('Expects the method to return a string.', () => {
        expect(Vizu.version()).to.be.a('string');
      });
    });

    describe('Test the method render():', () => {
      testVizuRender(dom);
      testVizuRenderext(dom);
      testVizuRenderext2(dom);
    });

    describe('Test the method replace():', () => {
      testVizuReplace(dom);
    });

    describe('Test the method $():', () => {
      testVizuComponent(dom);
    });

    describe('Test the method createClass():', () => {
      testVizuCreateClass(dom);
    });
  });
});
