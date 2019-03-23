/* global describe, it */
/* eslint import/no-extraneous-dependencies: 1, no-unused-expressions: 1, import/named: 0 */

// -- Node modules
import { expect } from 'chai';

// -- Local modules
import { Vizu } from '../index';


// -- Local constants


// -- Local variables


// Create a few Web Components:
const Aaa = Vizu.createClass();

const Bbb = Vizu.createClass({
  render() {
    return `
      <div class='aaa'>
        <h1>Title</h1>
      </div>
    `;
  },
});


// -- Main
export default function(dom) {
  describe('Test Vizu methods (next):', () => {
    //
    describe('Test Vizu.createClass() method:', () => {
      const view = Vizu.render(
        '<Bbb />',
        { '<Bbb />': Bbb },
        dom.window.document.getElementById('app40'),
      );

      it('Expects Vizu.createClass() without any arguments to return null.', () => {
        expect(Aaa).to.be.null;
      });

      it('Expects Vizu.createClass({ ... }) to return an object.', () => {
        expect(view).to.be.an('object');
      });

      it('Expects this object to own the property Bbb.', () => {
        expect(view).to.have.own.property('Bbb');
      });
      it('Expects the property Bbb to be an object.', () => {
        expect(view.Bbb).to.be.an('object');
      });
      it('Expects the object Bbb to have own property id.', () => {
        expect(view.Bbb).to.have.own.property('id');
      });
      it('Expects this property to be a string.', () => {
        expect(view.Bbb.id).to.be.a('string');
      });
      it('Expects the object Bbb to have own property cList.', () => {
        expect(view.Bbb).to.have.own.property('cList');
      });
      it('Expects this property to be null.', () => {
        expect(view.Bbb.cList).to.be.null;
      });
      it('Expects the object Bbb to have own property components.', () => {
        expect(view.Bbb).to.have.own.property('components');
      });
      it('Expects this property to be null.', () => {
        expect(view.Bbb.components).to.be.null;
      });
    });
  });
}
