/* global describe, it */
/* eslint import/no-extraneous-dependencies: 1, no-unused-expressions: 1 */

// -- Node modules
import { expect } from 'chai';
import _ from 'lodash';

// -- Local modules
import { Vizu, Component } from '../index';


// -- Local constants


// -- Local variables


// Create a few Web Components:
class Aaa extends Component {
  getInitialState() {
    this.props.options = 'Aaa';
  }
  render() {
    return `<div clas='aaa'>${this.props.options}</div>`;
  }
}

class Bbb extends Component {
  getInitialState() {
    this.props.options = 'Bbb';
  }
  render() {
    return `<div class='bbb'>${this.props.options}</div>`;
  }
}

class Ccc extends Component {
  render() {
    this.cList = { '<Aaa />': Aaa };
    return `
      <div>
        <Aaa />
        <div class='hello'>Hello!</div>
      </div>
    `;
  }
}

// -- Main
export default function(dom) {
  describe('Test Vizu methods (next):', () => {
    //
    describe('Test Vizu.replace() without any arguments:', () => {
      Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app30'),
      );
      it('Expects the method not to fail.', () => {
        Vizu.replace();
        expect(true).to.be.true;
      });
    });

    describe('Test Vizu.replace() with a wrong view:', () => {
      Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app31'),
      );
      it('Expects the method not to fail.', () => {
        Vizu.replace({});
        expect(true).to.be.true;
      });
    });

    describe('Test Vizu.replace() with a wrong component argument:', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app32'),
      );

      const cloneView = _.cloneDeep(view);
      Vizu.replace(view, []);

      it('Expects the method not to fail.', () => {
        expect(true).to.be.true;
      });
      it('Expects the method not to alter the id of the component.', () => {
        expect(view.Ccc.id).to.be.equal(cloneView.Ccc.id);
      });
      it('Expects the method not to alter the id of the child component.', () => {
        expect(view.Ccc.components.Aaa.id).to.be.equal(cloneView.Ccc.components.Aaa.id);
      });
    });


    describe('Test Vizu.replace() with an unknown component argument:', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app33'),
      );

      const cloneView = _.cloneDeep(view);
      Vizu.replace(view, { '<Bbb />': Bbb });

      it('Expects the method not to alter the id of the component.', () => {
        expect(view.Ccc.id).to.be.equal(cloneView.Ccc.id);
      });
      it('Expects the method not to alter the id of the child component.', () => {
        expect(view.Ccc.components.Aaa.id).to.be.equal(cloneView.Ccc.components.Aaa.id);
      });
    });

    describe('Test Vizu.replace() with a known component argument:', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app34'),
      );
      const cloneView = _.cloneDeep(view);
      Vizu.replace(view, { '<Aaa />': Bbb });

      it('Expects the method not to alter the id of the component.', () => {
        expect(view.Ccc.id).to.be.equal(cloneView.Ccc.id);
      });

      it('Expects the method to alter the id of the child component.', () => {
        expect(view.Ccc.components.Aaa.id).not.to.be.equal(cloneView.Ccc.components.Aaa.id);
      });

      it('Expects the tag of the child component <Aaa /> to match the Web Component Bbb.', () => {
        expect(view.Ccc.cList['<Aaa />']).to.be.equal(Bbb);
      });
    });

    describe('Test Vizu.replace() the root component:', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app35'),
      );
      const cloneView = _.cloneDeep(view);
      Vizu.replace(view, { '<Ccc />': Aaa });

      it('Expects the method to alter the id of the component.', () => {
        expect(view.Ccc.id).not.to.be.equal(cloneView.Ccc.id);
      });

      it('Expects the tag of the root component <Ccc /> to match the Web Component Aaa.', () => {
        expect(view.cList['<Ccc />']).to.be.equal(Aaa);
      });
    });
  });
}
