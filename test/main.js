/* global describe */
/* eslint  import/no-extraneous-dependencies: 1 */

// -- Node modules
import { JSDOM } from 'jsdom';

// -- Local modules
import { Vizu } from '../index';
import testVizuRender from './testvizurender';
import testVizuRenderext from './testvizurenderext';
import testVizuRenderext2 from './testvizurenderext2';
import testVizuReplace from './testvizureplace';
import testVizuCreateClass from './testvizucreateclass';
import testVizuComponent from './testvizucomponent';
import testVizuComponent2 from './testvizucomponent2';

// -- Local constants
// Create a Virtual DOM:
const HTML = `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div id="app1"></div>
      <div id="app2"></div>

      <div id="app10"></div>
      <div id="app11"></div>
      <div id="app12"></div>

      <div id="app20"></div>
      <div id="app21"></div>
      <div id="app22"></div>
      <div id="app23"></div>

      <div id="app30"></div>
      <div id="app31"></div>
      <div id="app32"></div>
      <div id="app33"></div>
      <div id="app34"></div>
      <div id="app35"></div>

      <div id="app40"></div>

      <div id="app50"></div>
      <div id="app51"></div>
      <div id="app52"></div>
      <div id="app53"></div>
      <div id="app54"></div>
      <div id="app55"></div>
      <div id="app56"></div>
      <div id="app57"></div>
      <div id="app58"></div>
      <div id="app59"></div>
      <div id="app5A"></div>
      <div id="app5B"></div>
      <div id="app5C"></div>
      <div id="app5D"></div>

      <div> id="app60"></div>
      <div> id="app61"></div>
      <div> id="app62"></div>
    </body>
  </html>
`;
const dom = new JSDOM(HTML);
// Attach virtual dom to Vizu:
Vizu.vdom = dom;


// -- Local variables


// -- Main
describe('Vizu', () => {
  testVizuRender(dom);
  testVizuRenderext(dom);
  testVizuRenderext2(dom);
  testVizuReplace(dom);
  testVizuCreateClass(dom);
  testVizuComponent(dom);
  testVizuComponent2(dom);
});
