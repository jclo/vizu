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

  animate() {
    const self = this;
    this.$('.rect').animate({ top: '400px', left: '800px' }, 'slow', () => {
      self.$('h1').text('Hello!');
    });
  }

  render() {
    return `
    <div style='position relative'>
      <h1>${this.props.title}</h1>
      <div style='position: relative'>
        <div class='rect' style='position: absolute; top: 0; left: 0; width: 100px; height:100px; border: 1px solid red'></div>
      <div>
    </div>
    `;
  }
}


// -- Main
export default function(dom) {
  describe('Test the class Component (next):', () => {
    // Test animate() without any arguments:
    describe('Test $().animate():', () => {
      it('Expects $().animate() without any argument to return this.', () => {
        const view = Vizu.render(
          '<Aaa />',
          { '<Aaa />': Aaa },
          dom.window.document.getElementById('app60'),
        );
        expect(view.Aaa.$().animate()).to.be.an('object');
      });
    });

    // Test properties:
    describe('Test $().animate(properties):', () => {
      const view = Vizu.render(
        '<Aaa />',
        { '<Aaa />': Aaa },
        dom.window.document.getElementById('app61'),
      );

      // Duration default:
      const o1a = view.Aaa.$('.rect').animate({ top: '100px' });
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}) to return this.', () => {
        expect(o1a).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 400, easing: "swing", callback: null }.', () => {
        expect(o1a.probe.duration).to.be.a('number').that.is.equal(400);
        expect(o1a.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o1a.probe.callback).to.be.null;
      });

      // Duration number:
      const o1b = view.Aaa.$('.rect').animate({ top: '100px' }, 500);
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, 500) to return this.', () => {
        expect(o1b).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 500, easing: "swing", callback: null }.', () => {
        expect(o1b.probe.duration).to.be.a('number').that.is.equal(500);
        expect(o1b.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o1b.probe.callback).to.be.null;
      });

      // Duration slow:
      const o1c = view.Aaa.$('.rect').animate({ top: '100px' }, 'slow');
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, "slow") to return this.', () => {
        expect(o1c).to.be.an('object');
      });
      it('Expects PicoQ.probe to be {duration: 600, easing: "swing", callback: null }.', () => {
        expect(o1c.probe.duration).to.be.a('number').that.is.equal(600);
        expect(o1c.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o1c.probe.callback).to.be.null;
      });

      // Duration fast:
      const o1d = view.Aaa.$('.rect').animate({ top: '100px' }, 'fast');
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, "fast") to return this.', () => {
        expect(o1d).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 200, easing: "swing", callback: null }.', () => {
        expect(o1d.probe.duration).to.be.a('number').that.is.equal(200);
        expect(o1d.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o1d.probe.callback).to.be.null;
      });

      // Duration wrong:
      const o1e = view.Aaa.$('.rect').animate({ top: '100px' }, ['fast']);
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, ["fast"]) to return this.', () => {
        expect(o1e).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 200, easing: "swing", callback: null }.', () => {
        expect(o1e.probe.duration).to.be.a('number').that.is.equal(400);
        expect(o1e.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o1e.probe.callback).to.be.null;
      });

      // Easing
      const o1f = view.Aaa.$('.rect').animate({ top: '100px' }, 'swing');
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, "swing") to return this.', () => {
        expect(o1f).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 400, easing: "swing", callback: null }.', () => {
        expect(o1f.probe.duration).to.be.a('number').that.is.equal(400);
        expect(o1f.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o1f.probe.callback).to.be.null;
      });

      // Callback
      const o1g = view.Aaa.$('.rect').animate({ top: '100px' }, () => {});
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, function() {}) to return this.', () => {
        expect(o1g).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 400, easing: "swing", callback: "Function" }.', () => {
        expect(o1g.probe.duration).to.be.a('number').that.is.equal(400);
        expect(o1g.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o1g.probe.callback).to.be.a('function');
      });


      // duration, easing
      const o2a = view.Aaa.$('.rect').animate({ top: '100px' }, 500, 'swing');
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, 500, "swing") to return this.', () => {
        expect(o2a).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 500, easing: "swing", callback: null }.', () => {
        expect(o2a.probe.duration).to.be.a('number').that.is.equal(500);
        expect(o2a.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o2a.probe.callback).to.be.null;
      });

      // duration, callback
      const o2b = view.Aaa.$('.rect').animate({ top: '100px' }, 500, () => {});
      it('Expects view.Aaa.$(";rect").animate({top: "100px"}, 500, function() {}) to return this.', () => {
        expect(o2b).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 500, easing: "swing", callback: "function" }.', () => {
        expect(o2b.probe.duration).to.be.a('number').that.is.equal(500);
        expect(o2b.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o2b.probe.callback).to.be.a('function');
      });

      // duration, wrong
      const o2c = view.Aaa.$('.rect').animate({ top: '100px' }, 500, []);
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, 500, []) to return this.', () => {
        expect(o2c).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 500, easing: "swing", callback: null }.', () => {
        expect(o2c.probe.duration).to.be.a('number').that.is.equal(500);
        expect(o2c.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o2c.probe.callback).to.be.null;
      });

      // easing, callback
      const o2d = view.Aaa.$('.rect').animate({ top: '100px' }, 'swing', () => {});
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, "swing", function() {}) to return this.', () => {
        expect(o2c).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 400, easing: "swing", callback: "function" }.', () => {
        expect(o2d.probe.duration).to.be.a('number').that.is.equal(400);
        expect(o2d.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o2d.probe.callback).to.be.a('function');
      });

      // easing, wrong
      const o2e = view.Aaa.$('.rect').animate({ top: '100px' }, 'swing', []);
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, "swing", []) to return this.', () => {
        expect(o2e).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 400, easing: "swing", callback: null }.', () => {
        expect(o2e.probe.duration).to.be.a('number').that.is.equal(400);
        expect(o2e.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o2e.probe.callback).to.be.null;
      });

      // wrong, wrong
      const o2f = view.Aaa.$('.rect').animate({ top: '100px' }, [], []);
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, [], []) to return this.', () => {
        expect(o2f).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 400, easing: "swing", callback: null }.', () => {
        expect(o2f.probe.duration).to.be.a('number').that.is.equal(400);
        expect(o2f.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o2f.probe.callback).to.be.null;
      });

      // duration, easing, callback
      const o3a = view.Aaa.$('.rect').animate({ top: '100px' }, 500, 'swing', () => {});
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, 500, "swing", function() {}) to return this.', () => {
        expect(o3a).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 500, easing: "swing", callback: "function" }.', () => {
        expect(o3a.probe.duration).to.be.a('number').that.is.equal(500);
        expect(o3a.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o3a.probe.callback).to.be.a('function');
      });

      // duration, easing, callback
      const o3b = view.Aaa.$('.rect').animate({ top: '100px' }, 'fast', 'swing', () => {});
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, "fast", "swing", function() {}) to return this.', () => {
        expect(o3b).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 200, easing: "swing", callback: "function" }.', () => {
        expect(o3b.probe.duration).to.be.a('number').that.is.equal(200);
        expect(o3b.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o3b.probe.callback).to.be.a('function');
      });

      // duration, easing, callback
      const o3c = view.Aaa.$('.rect').animate({ top: '100px' }, 'slow', 'swing', () => {});
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, "slow", "swing", function() {}) to return this.', () => {
        expect(o3c).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 500, easing: "swing", callback: "function" }.', () => {
        expect(o3c.probe.duration).to.be.a('number').that.is.equal(600);
        expect(o3c.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o3c.probe.callback).to.be.a('function');
      });

      // wrong, wrong, wrong
      const o3d = view.Aaa.$('.rect').animate({ top: '100px' }, [], [], []);
      it('Expects view.Aaa.$(".rect").animate({top: "100px"}, [], [], []) to return this.', () => {
        expect(o3d).to.be.an('object');
      });
      it('Expects Vizu.probe to be {duration: 400, easing: "swing", callback: null }.', () => {
        expect(o3d.probe.duration).to.be.a('number').that.is.equal(400);
        expect(o3d.probe.easing).to.be.a('string').that.is.equal('swing');
        expect(o3d.probe.callback).to.be.null;
      });

      // Test animate:
      const view2 = Vizu.render(
        '<Aaa />',
        { '<Aaa />': Aaa },
        dom.window.document.getElementById('app62'),
      );

      it('Expects view2.Aaa.$(".rect").animate({ top: "100px" }) to set top to 100px.', (done) => {
        const o20 = view2.Aaa.$('.rect').animate({ top: '100px', 'font-size': '12px' }, () => {
          expect(o20[0].style.top).to.be.a('string').that.is.equal('100px');
          done();
        });
      });
    });
  });
}
