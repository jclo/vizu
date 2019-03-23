/* global describe, it */
/* eslint import/no-extraneous-dependencies: 1, no-unused-expressions: 1, import/named: 0 */

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

    describe('Test the method Component.$().select():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app50A'),
      );
      it('Expects the method view.Ccc.$().select()[0].id to return Ccc.$().id', () => {
        expect(view.Ccc.$().select()[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
      });
      it('Expects the method view.Ccc.$().select("123")[0].id to return Ccc.$().id', () => {
        expect(view.Ccc.$().select('aaa')[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
      });
      it('Expects the method view.Ccc.$().select(".title")[0].innerHTML to return "Hi!"', () => {
        expect(view.Ccc.$().select('.title')[0].innerHTML).to.be.a('string').that.is.equal('Hi!');
      });
    });

    describe('Test the method Component.$().selectChild():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app50A1'),
      );
      it('Expects the method view.Ccc.$().selectChild() not to select any child.', () => {
        expect(view.Ccc.$().selectChild()[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
      });
      it('Expects the method view.Ccc.$().selectChild(0) to select the first child.', () => {
        expect(view.Ccc.$().selectChild(0)[0].innerHTML).to.be.a('string').that.is.equal('Hi!');
      });
      it('Expects the method view.Ccc.$().selectChild(2) not to select any child.', () => {
        expect(view.Ccc.$().selectChild(2)[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
      });
    });

    describe('Test the method Component.$().parent():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app50B'),
      );
      it('Expects the method view.Ccc.$(".title").parent().id to return the component id.', () => {
        expect(view.Ccc.$('.title').parent()[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
      });
      it('Expects the method view.Ccc.$(".title").parent().id to return the component id.', () => {
        const o = view.Ccc.$();
        o.root = view.Ccc.$()[0];
        expect(o.select('.title').parent().parent()[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
      });
    });

    describe('Test the method Component.$().firstParent():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app50B1'),
      );

      it('Expects the method view.Ccc.$().firstParent() not to to do anything.', () => {
        expect(view.Ccc.$().firstParent()[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
      });
      it('Expects the method view.Ccc.$().selectChild(0).firstParent() to select root parent.', () => {
        const o = view.Ccc.$();
        o.root = view.Ccc.$()[0];
        expect(o.selectChild(0).firstParent()[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
      });
      it('Expects method view.Ccc.$().firstParent().firstParent() not to to do anything.', () => {
        const o = view.Ccc.$();
        o.root = view.Ccc.$()[0];
        expect(o.firstParent().firstParent()[0].id).to.be.a('string').that.is.equal(view.Ccc.$().id);
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
        expect(view.Ccc.$('h1')[0]).to.be.null;
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
        expect(view.Ccc.$()[0].lastChild.textContent).to.be.equal('Hello!');
      });

      it('Expects view.Ccc.$().append(["<h2>Hello!</h2>"]}) not to add a new child.', () => {
        view.Ccc.$().append(['<h2>Hello!</h2>']);
        expect(view.Ccc.$()[0].children.length).to.be.equal(2);
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
        expect(view.Ccc.$()[0].firstChild.textContent).to.be.equal('Hello!');
      });

      it('Expects view.Ccc.$().prepend(["<h2>Hello!</h2>"]}) not to add a new child.', () => {
        view.Ccc.$().prepend(['<h2>Hello!</h2>']);
        expect(view.Ccc.$()[0].children.length).to.be.equal(2);
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
        expect(view.Ddd.$('.aaa')[0].nextElementSibling.textContent).to.be.equal('Hello!');
      });
      it('Expects view.Ddd.$(".aaa").after(["<h2>Hello!</h2>"]}) not to add a new child.', () => {
        view.Ddd.$('.aaa').after(['<h2>Hello!</h2>']);
        expect(view.Ddd.$()[0].children.length).to.be.equal(2);
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
        expect(view.Ddd.$('.aaa')[0].previousElementSibling.textContent).to.be.equal('Hello!');
      });
      it('Expects view.Ddd.$(".aaa").before(["<h2>Hello!</h2>"]}) not to add a new child.', () => {
        view.Ddd.$('.aaa').before(['<h2>Hello!</h2>']);
        expect(view.Ddd.$()[0].children.length).to.be.equal(2);
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
        expect(view.Ddd.$('h1')[0]).to.be.null;
      });
      it('Expects this node child to be replaced by "<h2>Hello!</h2>".', () => {
        expect(view.Ddd.$('h2')[0].outerHTML).to.be.equal('<h2>Hello!</h2>');
      });

      it('Expects view.Ddd.$("h2").replaceWith(["zzz"]) not to alter this child.', () => {
        view.Ddd.$('h2').replaceWith(['zzz']);
        expect(view.Ddd.$('h2')[0].outerHTML).to.be.equal('<h2>Hello!</h2>');
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

    describe('Test the method Component.$().text():', () => {
      const view = Vizu.render(
        '<Ddd />',
        { '<Ddd />': Ddd },
        dom.window.document.getElementById('app58A'),
      );

      it('Expects view.Ddd.$().clone() to return a clone with one child.', () => {
        expect(view.Ddd.$().clone().children.length).to.be.a('number').that.is.equal(1);
      });
      it('Expects view.Ddd.$().clone() to return a clone with one grandchild.', () => {
        expect(view.Ddd.$().clone().children[0].children.length).to.be.a('number').that.is.equal(1);
      });
      it('Expects view.Ddd.$().clone(true) to return a clone with one child.', () => {
        expect(view.Ddd.$().clone(true).children.length).to.be.a('number').that.is.equal(1);
      });
      it('Expects view.Ddd.$().clone(true) to return a clone with one grandchild.', () => {
        expect(view.Ddd.$().clone(true).children[0].children.length).to.be.a('number').that.is.equal(1);
      });
      it('Expects view.Ddd.$().clone(false) to return a clone with no child.', () => {
        expect(view.Ddd.$().clone(false).children.length).to.be.a('number').that.is.equal(0);
      });
    });

    describe('Test the method Component.$().insertChildBefore():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app58B'),
      );
      it('Expects view.Ccc.$().insertChildBefore() not to change the first child.', () => {
        expect(view.Ccc.$().insertChildBefore()[0].firstElementChild.innerHTML).to.be.a('string').that.is.equal('Hi!');
      });
      it('Expects view.Ccc.$().insertChildBefore(newChild, child) to insert newChild as the first child.', () => {
        const wrapper = dom.window.document.createElement('div');
        wrapper.innerHTML = '<h1>Hello!</h1>';
        const newChild = wrapper.firstChild;
        const child = view.Ccc.$('h1')[0];
        view.Ccc.$().insertChildBefore(newChild, child);
        expect(view.Ccc.$()[0].firstElementChild.innerHTML).to.be.a('string').that.is.equal('Hello!');
      });
    });

    describe('Test the method Component.$().removeChild():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app58C'),
      );
      it('Expects view.Ccc.$().removeChild() to return an object with one child.', () => {
        expect(view.Ccc.$().removeChild()[0].childElementCount).to.be.a('number').that.is.equal(1);
      });
      it('Expects view.Ccc.$().removeChild("firstChild") to return an object without child.', () => {
        const firstChild = view.Ccc.$()[0].firstElementChild;
        expect(view.Ccc.$().removeChild(firstChild)[0].childElementCount).to.be.a('number').that.is.equal(0);
      });
    });

    describe('Test the method Component.$().replaceChild():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app58D'),
      );
      const newChild = dom.window.document.createElement('div');
      newChild.className = 'newchild';
      const o = view.Ccc.$();
      const el = o[0];
      const child = el.children[0];
      it('Expects view.Ccc.$().replaceChild() not to replace any child.', () => {
        expect(o.replaceChild()[0].children[0].classList.value).to.be.a('string').that.is.equal('title');
      });

      it('Expects view.Ccc.$().replaceChild(newChild, child) to replace child by newChild.', () => {
        expect(o.replaceChild(newChild, child)[0].children[0].classList.value).to.be.a('string').that.is.equal('newchild');
      });
    });

    describe('Test the method Component.$().children():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app58E'),
      );
      it('Expects view.Ccc.$().children() to return a DOM object that has a length of 1.', () => {
        expect(view.Ccc.$().children().length).to.be.a('number').that.is.equal(1);
      });
    });

    describe('Test the method Component.$().childIndex():', () => {
      const view = Vizu.render(
        '<Eee />',
        { '<Eee />': Eee },
        dom.window.document.getElementById('app58F'),
      );
      it('Expects view.Eee.$(".title").childIndex() to return a number equal to 0.', () => {
        expect(view.Eee.$('.title').childIndex()).to.be.a('number').that.is.equal(0);
      });
      it('Expects view.Eee.$(".plus").childIndex() to return a number equal to 1.', () => {
        expect(view.Eee.$('.plus').childIndex()).to.be.a('number').that.is.equal(1);
      });
    });

    describe('Test the method Component.$().getRect():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app58G'),
      );
      it('Expects view.Ccc.$().getRect() to return an object.', () => {
        expect(view.Ccc.$().getRect()).to.be.an('object');
      });
      it('Expects this object to own the property "bottom".', () => {
        expect(view.Ccc.$().getRect()).to.have.property('bottom').that.is.a('number');
      });
      it('Expects this object to own the property "height".', () => {
        expect(view.Ccc.$().getRect()).to.have.property('height').that.is.a('number');
      });
      it('Expects this object to own the property "left".', () => {
        expect(view.Ccc.$().getRect()).to.have.property('left').that.is.a('number');
      });
      it('Expects this object to own the property "right".', () => {
        expect(view.Ccc.$().getRect()).to.have.property('right').that.is.a('number');
      });
      it('Expects this object to own the property "top".', () => {
        expect(view.Ccc.$().getRect()).to.have.property('top').that.is.a('number');
      });
      it('Expects this object to own the property "width".', () => {
        expect(view.Ccc.$().getRect()).to.have.property('width').that.is.a('number');
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

    describe('Test the method Component.$().getClassList/addClass(es)/removeClass(es)/toggleClass:', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app59A'),
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

      it('Expects the method view.Ccc.$("h1").addClasses("aaa") no to add new classes.', () => {
        view.Ccc.$('h1').addClasses('aaa');
        expect(view.Ccc.$('h1')[0].classList.value).to.be.equal('title');
      });
      it('Expects the method view.Ccc.$("h1").addClasses(["aaa", "bbb", "ccc"]) to add the classes "title aaa bbb ccc".', () => {
        view.Ccc.$('h1').addClasses(['aaa', 'bbb', 'ccc']);
        expect(view.Ccc.$('h1')[0].classList.value).to.be.equal('title aaa bbb ccc');
      });
      it('Expects the method view.Ccc.$("h1").removeClasses("aaa") no to remove any classes.', () => {
        view.Ccc.$('h1').removeClasses('aaa');
        expect(view.Ccc.$('h1')[0].classList.value).to.be.equal('title aaa bbb ccc');
      });
      it('Expects the method view.Ccc.$("h1").removeClasses(["aaa", "bbb", "ccc"]) to remove the classes "aaa bbb ccc".', () => {
        view.Ccc.$('h1').removeClasses(['aaa', 'bbb', 'ccc']);
        expect(view.Ccc.$('h1')[0].classList.value).to.be.equal('title');
      });

      it('Expects the method view.Ccc.$("h1").hasClass("title") to return true', () => {
        expect(view.Ccc.$('h1').hasClass('title')).to.be.true;
      });
      it('Expects the method view.Ccc.$("h1").hasClass("titleXXX") to return false', () => {
        expect(view.Ccc.$('h1').hasClass('titleXXX')).to.be.false;
      });
      it('Expects the method view.Ccc.$("h1").hasClass(["title"]) to return false', () => {
        expect(view.Ccc.$('h1').hasClass(['title'])).to.be.false;
      });
    });

    describe('Test the method Component.$().attr():', () => {
      const view = Vizu.render(
        '<Ccc />',
        { '<Ccc />': Ccc },
        dom.window.document.getElementById('app59B'),
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
        dom.window.document.getElementById('app59C'),
      );
      it('Expects the method $().attr("style", "color: blue") to set el.style.color to blue.', () => {
        view.Ccc.$().attr('style', 'color: blue');
        expect(view.Ccc.$()[0].style.color).to.be.a('string').that.is.equal('blue');
      });
      it('Expects the method $().removeAttr("style", "color: blue") to set el.style.color to an empty string.', () => {
        view.Ccc.$().removeAttr('style', 'color: blue');
        expect(view.Ccc.$()[0].style.color).to.be.a('string').that.is.empty;
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
        dom.window.document.getElementById('app59D'),
      );
      it('Expects the component "Ddd" to be rendered.', () => {
        expect(true).to.be.true;
      });
    });
  });
}
