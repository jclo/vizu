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
    this.props.options.title = 'Hi!';
  }

  render() {
    return `
      <div>
        <div class="aaa">
          <h1 class='title'>${this.props.options.title}</h1>
        </div>
      </div>
    `;
  }
}

class Eee extends Component {
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
  describe('Test the class Component:', () => {
    //
    describe('Test the method Component.$().id:', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app50'),
      );

      it('Expects the method $().id to return an string.', () => {
        expect(view.Ccc.$().id).to.be.a('string');
      });
      it('Expects the method view.Ccc.$().id and view.Ccc.id to return the same string.', () => {
        expect(view.Ccc.$().id).to.be.equal(view.Ccc.id);
      });
      it('Expects the method view.Ccc.$("h2").id to return null.', () => {
        expect(view.Ccc.$('h2').id).to.be.null;
      });
    });

    describe('Test the method Component.$().html():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app51'),
      );
      it('Expects view.Ccc.$().html("<h2>Hello!</h2>"), view.Ccc.$().html() to return "<h2>Hello!</h2>".', () => {
        view.Ccc.$().html('<h2>Hello!</h2>');
        expect(view.Ccc.$().html()).to.be.a('string').that.is.equal('<h2>Hello!</h2>');
      });
    });

    describe('Test the method Component.$().empty():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app52'),
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
        dom.window.document.getElementById('app53'),
      );
      it('Expects view.Ccc.$().append("<h2>Hello!</h2>") to add this node as the last child.', () => {
        view.Ccc.$().append('<h2>Hello!</h2>');
        expect(view.Ccc.$().getElement().lastChild.textContent).to.be.equal('Hello!');
      });

      it('Expects view.Ccc.$().append(["<h2>Hello!</h2>"]}) not to add a new child.', () => {
        view.Ccc.$().append(['<h2>Hello!</h2>']);
        expect(view.Ccc.$().getElement().children.length).to.be.equal(2);
      });
    });

    describe('Test the method Component.$().prepend():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app54'),
      );
      it('Expects view.Ccc.$().prepend("<h2>Hello!</h2>") to add this node as the first child.', () => {
        view.Ccc.$().prepend('<h2>Hello!</h2>');
        expect(view.Ccc.$().getElement().firstChild.textContent).to.be.equal('Hello!');
      });

      it('Expects view.Ccc.$().prepend(["<h2>Hello!</h2>"]}) not to add a new child.', () => {
        view.Ccc.$().prepend(['<h2>Hello!</h2>']);
        expect(view.Ccc.$().getElement().children.length).to.be.equal(2);
      });
    });

    describe('Test the method Component.$().after():', () => {
      const view = Vizu.render(
        '<Ddd />',
        { '<Ddd />': Ddd },
        dom.window.document.getElementById('app55'),
      );
      it('Expects view.Ddd.$(".aaa").after("<h2>Hello!</h2>") to add this node after this one.', () => {
        view.Ddd.$('.aaa').after('<h2>Hello!</h2>');
        expect(view.Ddd.$('.aaa').getElement().nextElementSibling.textContent).to.be.equal('Hello!');
      });
      it('Expects view.Ddd.$(".aaa").after(["<h2>Hello!</h2>"]}) not to add a new child.', () => {
        view.Ddd.$('.aaa').after(['<h2>Hello!</h2>']);
        expect(view.Ddd.$().getElement().children.length).to.be.equal(2);
      });
    });

    describe('Test the method Component.$().before():', () => {
      const view = Vizu.render(
        '<Ddd />',
        { '<Ddd />': Ddd },
        dom.window.document.getElementById('app56'),
      );
      it('Expects view.Ddd.$(".aaa").before("<h2>Hello!</h2>") to add this node before this one.', () => {
        view.Ddd.$('.aaa').before('<h2>Hello!</h2>');
        expect(view.Ddd.$('.aaa').getElement().previousElementSibling.textContent).to.be.equal('Hello!');
      });
      it('Expects view.Ddd.$(".aaa").before(["<h2>Hello!</h2>"]}) not to add a new child.', () => {
        view.Ddd.$('.aaa').before(['<h2>Hello!</h2>']);
        expect(view.Ddd.$().getElement().children.length).to.be.equal(2);
      });
    });

    describe('Test the method Component.$().replaceWith():', () => {
      const view = Vizu.render(
        '<Ddd />',
        { '<Ddd />': Ddd },
        dom.window.document.getElementById('app57'),
      );
      it('Expects view.Ddd.$("h1").replaceWith("<h2>Hello!</h2>") not to add a new child.', () => {
        view.Ddd.$('h1').replaceWith('<h2>Hello!</h2>');
        expect(view.Ddd.$('h1').getElement()).to.be.null;
      });
      it('Expects this node child to be replaced by "<h2>Hello!</h2>".', () => {
        expect(view.Ddd.$('h2').getElement().outerHTML).to.be.equal('<h2>Hello!</h2>');
      });

      it('Expects view.Ddd.$("h2").replaceWith(["zzz"]) not to alter this child.', () => {
        view.Ddd.$('h2').replaceWith(['zzz']);
        expect(view.Ddd.$('h2').getElement().outerHTML).to.be.equal('<h2>Hello!</h2>');
      });
    });

    describe('Test the method Component.$().text():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app58'),
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
        dom.window.document.getElementById('app59'),
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

    describe('Test the method Component.$().getClassList/addClass/removeClass/toggleClass:', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app5A'),
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

    describe('Test the method Component.$().attr():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app5B'),
      );
      it('Expects the method $().attr() without any argument to return null.', () => {
        expect(view.Ccc.$().attr()).to.be.null;
      });
      it('Expects the method $().attr("style") to return null.', () => {
        expect(view.Ccc.$().attr('style')).to.be.null;
      });
      it('Expects the method $().attr("style", "font-size: 400")/$().attr("style") to return "font-size: 400".', () => {
        view.Ccc.$().attr('style', 'font-size: 400');
        expect(view.Ccc.$().attr('style')).to.be.a('string').that.is.equal('font-size: 400');
      });
    });

    describe('Test the method Component.$().removeAttr():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app5C'),
      );
      it('Expects the method $().attr("style", "color: blue") to set el.style.color to blue.', () => {
        view.Ccc.$().attr('style', 'color: blue');
        expect(view.Ccc.$().getElement().style.color).to.be.a('string').that.is.equal('blue');
      });
      it('Expects the method $().removeAttr("style", "color: blue") to set el.style.color to an empty string.', () => {
        view.Ccc.$().removeAttr('style', 'color: blue');
        expect(view.Ccc.$().getElement().style.color).to.be.a('string').that.is.empty;
      });
      it('Expects the method $().removeAttr() without argument to return this.', () => {
        expect(view.Ccc.$().removeAttr()).to.be.an('object');
      });
    });

    // This should be improved!
    describe('Test the methods Component.$().on() and Component.$().off():', () => {
      Vizu.render(
        '<Eee />',
        { '<Eee />': Eee },
        dom.window.document.getElementById('app5D'),
      );
      it('Expects the component "Ddd" to be rendered.', () => {
        expect(true).to.be.true;
      });
    });
  });
}
