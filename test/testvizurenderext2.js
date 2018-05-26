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

class Bbb extends Component {
  getInitialState() {
    this.props.options.title = 'Hi!';
  }

  render() {
    return `
      <header>
        <h1>${this.props.options.title}</h1>
      </header>
    `;
  }
}

class Ccc extends Component {
  getInitialState() {
    this.props.options.title = 'Hi!';
  }

  render() {
    return `
      <footer>
        <h1>${this.props.options.title}</h1>
      </footer>
    `;
  }
}

class Ddd extends Component {
  getInitialState() {
    this.props.options.title = 'Hi!';
  }

  render() {
    return `
      <article>
        <h1>${this.props.options.title}</h1>
      </article>
    `;
  }
}

// -- Main
export default function(dom) {
  describe('Test Vizu methods (next):', () => {
    //
    describe('Test the method Vizu.render() with a Web Component surrounded by the div tag:', () => {
      const view = Vizu.render(
        '<Aaa />',
        { '<Aaa />': Aaa },
        dom.window.document.getElementById('app20'),
      );

      it('Expects the rendered Web component to get an id.', () => {
        expect(view.Aaa.$().id).to.be.a('string');
      });
    });

    describe('Test the method Vizu.render() with a Web Component surrounded by the header tag:', () => {
      const view = Vizu.render(
        '<Bbb />',
        { '<Bbb />': Bbb },
        dom.window.document.getElementById('app21'),
      );

      it('Expects the rendered Web component to get an id.', () => {
        expect(view.Bbb.$().id).to.be.a('string');
      });
    });

    describe('Test the method Vizu.render() with a Web Component surrounded by the footer tag:', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app22'),
      );

      it('Expects the rendered Web component to get an id.', () => {
        expect(view.Ccc.$().id).to.be.a('string');
      });
    });

    describe('Test the method Vizu.render() with a Web Component surrounded by the article tag:', () => {
      const view = Vizu.render(
        '<Ddd />',
        { '<Ddd />': Ddd },
        dom.window.document.getElementById('app23'),
      );

      it('Expects the rendered Web component not to get an id.', () => {
        expect(view.Ddd.$().id).to.be.null;
      });
    });
  });
}
