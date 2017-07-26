/* global describe, it */
/* eslint import/no-extraneous-dependencies: 1, no-unused-expressions: 1 */

// -- Node modules
import { expect } from 'chai';

// -- Local modules
import { Vizu, Component } from '../index';


// -- Local constants


// -- Local variables


// Create a few Web Components:
class Aaa extends Component {
  render() {
    return `<div>${this.props.options.name}</div>`;
  }
}


// -- Main
export default function(dom) {
  describe('Test Vizu methods:', () => {
    //
    describe('Test the method Vizu.version():', () => {
      it('Expects the method to return a string.', () => {
        expect(Vizu.version()).to.be.a('string');
      });
    });

    describe('Test the method Vizu.render():', () => {
      //
      describe('Test the method Vizu.render() with a wrong template passed in:', () => {
        it('Expects the method to return null.', () => {
          const view = Vizu.render(1);
          expect(view).to.be.null;
        });
      });

      describe('Test the method Vizu.render() with only a template argument passed in:', () => {
        it('Expects the method to return null.', () => {
          const view = Vizu.render(
            '<div></div>',
          );
          expect(view).to.be.null;
        });
      });

      describe('Test the method Vizu.render() without any Web Component passed in:', () => {
        it('Expects the method to return null.', () => {
          const view = Vizu.render(
            '<div></div>',
            null,
            dom.window.document.getElementById('app1'),
          );
          expect(view).to.be.null;
        });
      });

      describe('Test the method Vizu.render() with the Web Component Aaa passed in:', () => {
        const view = Vizu.render(
          '<Aaa />',
          { '<Aaa />': Aaa },
          dom.window.document.getElementById('app2'),
        );

        it('Expects the method to return an object.', () => {
          expect(view).to.be.an('object');
        });
        it('Expects this object to have own property Aaa.', () => {
          expect(view).to.have.own.property('Aaa');
        });
        it('Expects the property Aaa to be an object.', () => {
          expect(view.Aaa).to.be.an('object');
        });
        it('Expects the object Aaa to have own property id.', () => {
          expect(view.Aaa).to.have.own.property('id');
        });
        it('Expects this property to be a string.', () => {
          expect(view.Aaa.id).to.be.a('string');
        });
        it('Expects the object Aaa to have own property cList.', () => {
          expect(view.Aaa).to.have.own.property('cList');
        });
        it('Expects this property to be null.', () => {
          expect(view.Aaa.cList).to.be.null;
        });
        it('Expects the object Aaa to have own property components.', () => {
          expect(view.Aaa).to.have.own.property('components');
        });
        it('Expects this property to be null.', () => {
          expect(view.Aaa.components).to.be.null;
        });
      });
    });
  });
}
