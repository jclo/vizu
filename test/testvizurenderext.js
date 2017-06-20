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
    return `<div>${this.name}</div>`;
  }
}

class Bbb extends Component {
  render() {
    this.cList = { '<Aaa />': Aaa };
    return `<div>${this.name}<Aaa /></div>`;
  }
}

class Ccc extends Component {
  getInitialState() {
    this.props.options.title = 'Hi!';
  }

  render() {
    return `
      <div>
        <h1>${this.props.options.title}</h1>
      </div>
    `;
  }
}

// -- Main
export default function(dom) {
  describe('Test the method render() with the Web Component Bbb passed in:', () => {
    const view = Vizu.render(
      '<Bbb />',
      { '<Bbb />': Bbb },
      dom.window.document.getElementById('app10'),
    );

    it('Expects the method to return an object.', () => {
      expect(view).to.be.an('object');
    });
    it('Expects this object to have own property Bbb.', () => {
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
    it('Expects cList property not to be null.', () => {
      expect(view.Bbb.cList).not.to.be.null;
    });
    it('Expects cList property to have own property <Aaa />.', () => {
      expect(view.Bbb.cList).to.have.own.property('<Aaa />');
    });
    it('Expects the object Bbb to have own property components.', () => {
      expect(view.Bbb).to.have.own.property('components');
    });
    it('Expects components property not to be null.', () => {
      expect(view.Bbb.components).not.to.be.null;
    });
    it('Expects components property to have own property Aaa.', () => {
      expect(view.Bbb.components).to.have.own.property('Aaa');
    });
    it('Expects Aaa property to be an object.', () => {
      expect(view.Bbb.components.Aaa).to.be.an('object');
    });
    it('Expects Aaa property to to have own property id.', () => {
      expect(view.Bbb.components.Aaa).to.have.own.property('id');
    });
    it('Expects this property to be a string.', () => {
      expect(view.Bbb.components.Aaa.id).to.be.a('string');
    });
    it('Expects Aaa property to to have own property cList.', () => {
      expect(view.Bbb.components.Aaa).to.have.own.property('cList');
    });
    it('Expects cList property to be null.', () => {
      expect(view.Bbb.components.Aaa.cList).to.be.null;
    });
    it('Expects Aaa property to to have own property components.', () => {
      expect(view.Bbb.components.Aaa).to.have.own.property('components');
    });
    it('Expects components property to be null.', () => {
      expect(view.Bbb.components.Aaa.components).to.be.null;
    });
  });


  describe('Test the method render() with the Web Component Ccc passed in:', () => {
    const view = Vizu.render(
      '<Ccc />',
      { '<Ccc />': Ccc },
      dom.window.document.getElementById('app11'),
    );
    it('Expects the method to return an object.', () => {
      expect(view).to.be.an('object');
    });
    it('Expects this object to have own property Ccc.', () => {
      expect(view).to.have.own.property('Ccc');
    });
    it('Expects Ccc to include DOM element <h1>Hi!</h1>.', () => {
      expect(view.Ccc.$('h1').html()).to.be.a('string').equal('Hi!');
    });
  });

  // describe('Test the method render() with a Web Component passed in but no element to attach it:', () => {
  //   it('Expects the method to return an object.', () => {
  //     const view = Vizu.render(
  //       '<Aaa />',
  //       { '<Aaa />': Aaa },
  //     );
  //     expect(view).to.be.an('object');
  //   });
  // });
}
