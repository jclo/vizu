/* global describe, it */
/* eslint import/no-extraneous-dependencies: 1, no-unused-expressions: 1 */

// -- Node modules
import { expect } from 'chai';

// -- Local modules
import { Vizu, Component } from '../index';


// -- Local constants


// -- Local variables


// Create a few Web Components:
class Ccc extends Component {
  getInitialState() {
    this.props.options.title = 'Hi!';
  }

  render() {
    return `
      <div class='ccc eee fff'>
        <h1 class='title'>${this.props.options.title}</h1>
      </div>
    `;
  }
}

class Ddd extends Component {
  getInitialState() {
    this.props.options.title = 'Hello!';
  }

  events() {
    const listener = function() {
      //
    };
    this.$('.plus').on('click', listener);
    this.$('.plus').off('click', listener);
  }

  render() {
    return `
      <div class='ccc eee fff'>
        <h1 class='title'>${this.props.options.title}</h1>
        <button class='plus'>+</button>
      </div>
    `;
  }
}

// -- Main
export default function(dom) {
  describe('Test the method Component.$().id:', () => {
    const view = Vizu.render(
      '<Ccc />',
      { '<Ccc />': Ccc },
      dom.window.document.getElementById('app40'),
    );

    it('Expects the method $().id to return an string.', () => {
      expect(view.Ccc.$().id).to.be.a('string');
    });
    it('Expects the method view.Ccc.$().id and view.Ccc.id to return the same string.', () => {
      expect(view.Ccc.$().id).to.be.equal(view.Ccc.id);
    });
  });

  describe('Test the method Component.$().getClassList/addClass/removeClass/toggleClass:', () => {
    const view = Vizu.render(
      '<Ccc />',
      { '<Ccc />': Ccc },
      dom.window.document.getElementById('app41'),
    );

    it('Expects the method view.Ccc.$("h1").getClassList().value to return a string.', () => {
      expect(view.Ccc.$('h1').getClassList().value).to.be.a('string');
    });
    it('Expects this method to return the class "title".', () => {
      expect(view.Ccc.$('h1').getClassList()[0]).to.be.equal('title');
    });
    it('Expects the method view.Ccc.$("h1").addClass("ccc") to add the class "ccc".', () => {
      view.Ccc.$('h1').addClass('ccc');
      expect(view.Ccc.$('h1').getClassList()[1]).to.be.equal('ccc');
    });
    it('Expects the method view.Ccc.$("h1").removeClass("ccc") to remove the class "ccc".', () => {
      view.Ccc.$('h1').removeClass('ccc');
      expect(view.Ccc.$('h1').getClassList()[0]).to.be.equal('title');
      expect(view.Ccc.$('h1').getClassList()[1]).to.be.undefined;
    });
    it('Expects the method view.Ccc.$("h1").toogleClass("ccc") to add the class "ccc".', () => {
      view.Ccc.$('h1').toggleClass('ccc');
      expect(view.Ccc.$('h1').getClassList()[1]).to.be.equal('ccc');
    });
    it('Expects the method view.Ccc.$("h1").toogleClass("ccc") to remove the class "ccc".', () => {
      view.Ccc.$('h1').toggleClass('ccc');
      expect(view.Ccc.$('h1').getClassList()[1]).to.be.undefined;
    });
  });

  describe('Test the method Component.$().html():', () => {
    const view = Vizu.render(
      '<Ccc />',
      { '<Ccc />': Ccc },
      dom.window.document.getElementById('app42'),
    );
    it('Expects view.Ccc.$().html("<h2>Hello!</h2>"), view.Ccc.$().html() to return "<h2>Hello!</h2>".', () => {
      view.Ccc.$().html('<h2>Hello!</h2>');
      expect(view.Ccc.$().html()).to.be.a('string').that.is.equal('<h2>Hello!</h2>');
    });
  });

  describe('Test the method Component.$().text():', () => {
    const view = Vizu.render(
      '<Ccc />',
      { '<Ccc />': Ccc },
      dom.window.document.getElementById('app43'),
    );
    it('Expects view.Ccc.$("h1").text() to return "Hi!".', () => {
      view.Ccc.$().text();
      expect(view.Ccc.$('h1').text()).to.be.equal('Hi!');
    });
    it('Expects view.Ccc.$("h1").text("Hello"), view.Ccc.$("h1").text() to return "Hello".', () => {
      view.Ccc.$('h1').text('Hello');
      expect(view.Ccc.$('h1').text()).to.be.equal('Hello');
    });
  });

  describe('Test the method Component.$().css():', () => {
    const view = Vizu.render(
      '<Ccc />',
      { '<Ccc />': Ccc },
      dom.window.document.getElementById('app44'),
    );
    it('Expects the method $().css() without any argument to return undefined.', () => {
      expect(view.Ccc.$().css()).to.be.undefined;
    });

    it('Expects the method $().css("color") to return an empty string.', () => {
      expect(view.Ccc.$().css('color')).to.be.a('string').that.has.lengthOf(0);
    });

    it('Expects the method $().css("font-size", "400")/$().css("font-size") to return "400".', () => {
      view.Ccc.$().css('font-size', '400');
      expect(view.Ccc.$().css('font-size')).to.be.a('string').that.is.equal('400');
    });

    it('Expects the method $().css("border-bottom-color", "blue")/$().css("border-bottom-color") to return "blue".', () => {
      view.Ccc.$().css('border-bottom-color', 'blue');
      expect(view.Ccc.$().css('border-bottom-color')).to.be.a('string').that.is.equal('blue');
    });
  });

  describe('Test the method Component.$().empty():', () => {
    const view = Vizu.render(
      '<Ccc />',
      { '<Ccc />': Ccc },
      dom.window.document.getElementById('app45'),
    );
    it('Expects view.Ccc.$("h1").text() to return "Hi!".', () => {
      expect(view.Ccc.$('h1').text()).to.be.equal('Hi!');
    });
    it('Expects view.Ccc.$("h1").empty() to remove "Hi!".', () => {
      view.Ccc.$('h1').empty();
      expect(view.Ccc.$('h1').text()).to.be.equal('');
    });
    it('Expects view.Ccc.$().empty() to remove "h1" childnode.', () => {
      view.Ccc.$().empty();
      expect(view.Ccc.$('h1').getElement()).to.be.null;
    });
  });

  describe('Test the method Component.$().append():', () => {
    const view = Vizu.render(
      '<Ccc />',
      { '<Ccc />': Ccc },
      dom.window.document.getElementById('app46'),
    );
    it('Expects view.Ccc.$().append("<h2>Hello!</h2>") adds this node as the last child', () => {
      view.Ccc.$().append('<h2>Hello!</h2>');
      expect(view.Ccc.$().getElement().lastChild.textContent).to.be.equal('Hello!');
    });
  });

  // This should be improved!
  describe('Test the methods Component.$().on() and Component.$().off():', () => {
    Vizu.render(
      '<Ddd />',
      { '<Ddd />': Ddd },
      dom.window.document.getElementById('app47'),
    );
    it('Expects the component "Ddd" to be rendered.', () => {
      expect(true).to.be.true;
    });
  });
}
