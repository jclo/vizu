# Vizu

[![NPM version][npm-image]][npm-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)
<!--- [![node version][node-image]][node-url] -->
[![NPM install][npm-install-image]][npm-install-url]


## A Javascript View library for building web and hybrid mobile applications

`Vizu` allows the user to create and aggregate `Vizu Web Components` and then render and manipulate them. It offers a similar API as `React` but `Vizu` directly writes to the DOM and it is much more lighter.

`Vizu` introduces only two concepts: `Vizu Web Components` and `view`. A `Vizu Web Component` is a Javascript object that defines an HTML block and methods to manipulate it. A `view` is the aggregation of `Vizu Web Components`.

`Vizu` gives a direct access to all the `Vizu Web Components` of the view whatever their position in the view hierarchy with a very fine granularity. But, the access could be restricted. A module can only access to the `Vizu Web Components` it owns.

`Vizu` is just old plain Javascript, HTML and CSS3. There is neither intermediate format nor pre-processing.

You want to see how to use `Vizu` in a real application, click [here](https://github.com/jclo/kiwii-vizu). `Kiwii-Vizu` is an example of an hybrid mobile application built with `Vizu` as the View library.


## Overview

### Create a Vizu Web Component

```js
import { Component } from 'vizu';

class Aaa extends Component {
  constructor() {
    super();
    this.title = 'Hi!';
  }

  render() {
    return `
      <div>
        <h1>${this.title}</h1>
      </div>
    `;
  }
}
```

A `Vizu Web Component` is defined by a class with, at least, the method `render` that returns a plain old HTML block. You can insert Javascript instructions in it. They are processed when the component is rendered.


### Create a View

```js
import { Vizu } from 'vizu';

Vizu.render(
  `<Aaa />`,
  { '<Aaa />': Aaa },
  document.getElementById('app'),
);
```

The method `Vizu.render()` renders the `Vizu Web Components` directly in the DOM tree. This method requires one mandatory argument and two optional arguments:

  * The first argument is a Javascript string that defines an HTML block. Here it is limited to an HTML tag; the `Vizu Web Component`.

  * The second argument is a Javascript object. It contains the `Vizu Web Component` tags and their reference (reference to the class). If omitted, the `Vizu Web Component` tags aren't processed.

  * And finally, the third argument is the DOM element in which the view is inserted as a child element. If omitted, the view is directly inserted into the `body` as the first node.


## Table of Contents

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Vizu](#vizu)
	- [A Javascript View library for building web and hybrid mobile applications](#a-javascript-view-library-for-building-web-and-hybrid-mobile-applications)
	- [Overview](#overview)
		- [Create a Vizu Web Component](#create-a-vizu-web-component)
		- [Create a View](#create-a-view)
	- [Table of Contents](#table-of-contents)
	- [Installation](#installation)
	- [Create a View](#create-a-view)
		- [The simplest View](#the-simplest-view)
		- [A more concrete View](#a-more-concrete-view)
		- [Résumé](#rsum)
	- [Create a Vizu Web Component](#create-a-vizu-web-component)
		- [The simplest Vizu Web Component](#the-simplest-vizu-web-component)
		- [A more concrete Vizu Web Component](#a-more-concrete-vizu-web-component)
		- [A Composite Vizu Web Component](#a-composite-vizu-web-component)
		- [Define an Initial State for the Vizu Web Component](#define-an-initial-state-for-the-vizu-web-component)
		- [Extend the Vizu Web Component with new methods](#extend-the-vizu-web-component-with-new-methods)
		- [Create Vizu Web Component without ES6 classes](#create-vizu-web-component-without-es6-classes)
		- [Résumé](#rsum)
	- [Adds events to Vizu Web Component](#adds-events-to-vizu-web-component)
	- [Interact with the Vizu Web Components](#interact-with-the-vizu-web-components)
		- [The Variables](#the-variables)
		- [The methods](#the-methods)
	- [Replace a Vizu Web Component](#replace-a-vizu-web-component)
	- [Reference](#reference)
		- [Vizu Web Component](#vizu-web-component)
			- [$()](#)
		- [Vizu Render](#vizu-render)
		- [Vizu Replace](#vizu-replace)
		- [Vizu createClass](#vizu-createclass)
	- [License](#license)

<!-- /TOC -->

## Installation

```js
npm install --save vizu
```

## Create a View

### The simplest View

```js
import { Vizu } from 'vizu';

Vizu.render(
  `<div>
    <p>Hi!</p>
  </div>`
);
```

As nothing else as an HTML block is defined here, `Vizu` renders the block in the body of the HTML page.

```HTML
<body>
  <div id="id9td66c">
    <p>Hi!</p>
  <div>
</body>
```

A `Vizu` component must always be a set of HTML tags surrounded by a `div`. `Vizu` adds an `unique ID` to this `Vizu Web Component`.


### A more concrete View

```js
import { Vizu } from 'vizu';

Vizu.render(
  `<Aaa />
   <Bbb />
  `,
  { '<Aaa />': Aaa, `<Bbb />`: Bbb },
  document.getElementById('app'),
);
```

Here we want to render the `Vizu Web Components` `<Aaa />` and `<Bbb />`.

The first argument is a Javascript string that contains the custom HTML tags `<Aaa />` and `<Bbb />`. They represent `Vizu Web Components` (we will see later on how to define them). The tag contains the name of the class that defines the component preceded by `<` and completed by ` />`.

The second argument is a Javascript object. It links the tags `<Aaa />` and `<Bbb />` to the references of their respective `Vizu Web Components` (the classes that define them).

And finally, the third argument is a Javascript object that references the DOM element surrounding the rendered view.

It gives this:
```HTML
<div id="app" class="container">
  <div id="ifwhoesn">
    <p>Hi!</p>
  </div>
  <div id="iqn96zqo">
    <p>Hello!</p>
  </div>
</div>
```

### Résumé

As seen above, an unique method `render()` is required with `Vizu` to render a View. This method requires three arguments: the components that compose the view, their reference and where they are inserted into the DOM tree.


## Create a Vizu Web Component

### The simplest Vizu Web Component

```js
import { Component } from 'vizu';

class Aaa extends Component {
  render() {
    return '<div></div>';
  }
}
```

A `Vizu Web Component` is defined by a class that extends the `class Component`. This class must provide, at least, the method `render()`. This method must return an HTML block. I.e. HTML tags surrounded by a `div`.

Rendering this `Vizu Web Component` results in:
```HTML
<div id="app" class="container">
  <div id="iynx1ktk">
  </div>
</div>
```

### A more concrete Vizu Web Component

```js
import { Component } from 'vizu';

class Aaa extends Component {
  constructor() {
    super();
    this.title = 'Title';
  }

  render() {
    return `
      <div>
        <h1>${this.title}</h1>
      </div>
    `;
  }
}
```

This `Vizu Web Component` includes a Javascript variable initialized by the `constructor`.
This variable is declared in the string in between `${}` as defined by the ES6 standard. It's pure Javascript!

Rendering this `Vizu Web Component` results in:
```HTML
<div id="app" class="container">
  <div id="i7mlzk3r">
    <h1>Title</h1>
  </div>  
</div>
```

### A Composite Vizu Web Component

A `Vizu Web Component` could include another `Vizu Web Component`:
```js
import { Component } from 'vizu';

class Aaa extends Component {
  constructor() {
    super();
    this.subtitle = 'Subtitle';
  }

  render() {
    return `
      <div>
        <h2>${this.subtitle}</h2>
      </div>
    `;
  }
}

class Bbb extends Component {
  constructor() {
    super();
    this.title = 'title';
  }

  render() {
    // Reference Aaa:
    this.cList = { '<Aaa />': Aaa };
    return `
      <div>
        <h2>${this.title}</h2>
        <Aaa />
      </div>
    `;
  }
}
```

A `Vizu Web Component` can include another `Vizu Web Component` quite easily. It just needs to be declared by a tag (here `<Aaa />`) and referenced in the variable `cList` attached to this component (here `this.cList = { '<Aaa />': Aaa };`).

Rendering the `Vizu Web Component` `<Bbb />` results in:
```HTML
<div id="app" class="container">   
  <div id="isoue0z7">
    <h2>title</h2>    
    <div id="ios7lybb">
      <h2>Subtitle</h2>
    </div>
  </div>
</div>
```

### Define an Initial State for the Vizu Web Component

In the above examples, we initialized the variables with the `constructor`. `Vizu Component` provides a method for defining the initial value of the Javascript variables:

```js
import { Component } from 'vizu';

class Aaa extends Component {

  getInitialState() {
    this.props.options.title = 'Title';
  }

  render() {
    return `
      <div>
        <h1>${this.props.options.title}</h1>
      </div>
    `;
  }
}
```

This is the preferred method to initialize variables.


### Extend the Vizu Web Component with new methods

The user can add his own methods to interact with the `Vizu Web Component`:

```js
import { Component } from 'vizu';

class Aaa extends Component {

  getInitialState() {
    this.props.options.title = 'Title';
  }

  // Method particular to this Vizu Web Component
  updateTitle(title) {
    this.props.options.title = title;
    this.$('h1').getElement().innerText = title;
  }

  render() {
    return `
      <div>
        <h1>${this.props.options.title}</h1>
      </div>
    `;
  }
}
```

This `Vizu Web Component <Aaa />` has a specific method called `updateTitle`. It updates the title of the component (we will see later on how to access this method).

This method relies on `this.$('h1').getElement().innerText` to change the title. The method `$(el)` is just a wrapper around the Javascript function `querySelector`.

If the method `$().getElement()` has no selector (argument), it returns the entire HTML block that defines this `Vizu Web Component` in the DOM tree.

***Nota***:

`Component` implements a few shortcuts (see the reference section). For instance `$('h1').getElement().innerText` can be replaced by `$('h1').text()`.


### Create Vizu Web Component without ES6 classes

`Vizu` provides the method `createClass` to create `Vizu Web Components` without ES6:

```js
Vizu.createClass({

  getInitialState: function() {
    this.props.options.title = 'Title';
  },

  render: function() {
    return `
      <div>
        <h1>` + this.props.options.title + `</h1>
      </div>
    `;
  }
});

```

### Résumé

A `Vizu Web Component` is a Javascript class that extends the `Vizu` class `Component`.

A `Vizu Web Component` could define a simple block of HTML tags surrounded by a `div` or/and it can include other `Vizu Web Component`.

A `Vizu Web Component` offers, at least, the method `render()` that returns a set of HTML tags surrounded by a `div`.

A `Vizu Web Component` can provides the method `getInitialState` that defines some javascript variables included in the HTML block.

A `Vizu Web Component` can be extended with specific methods.


## Adds events to Vizu Web Component

`Vizu Web Component` implements the method `events()` that is executed when the component is rendered in the DOM tree to attach events.

Example for a counter:
```js
import { Component } from 'vizu';

class Counter extends Component {

  getInitialState() {
    this.props.options.counter = 0;
  }

  events() {
    const self = this;
    let counter = this.props.options.counter;
    // Increment:
    this.$('.plus').on('click', () => {
      counter += 1;
      self.$('h1').text(counter);
    });
    // Decrement:
    this.$('.minus').on('click', () => {
      counter -= 1;
      self.$('h1').text(counter);
    });
  }

  render() {
    return `
      <div>
        <h1>${this.props.options.counter}</h1>
        <button class="minus">-</button>
        <button class="plus">+</button>
      </div>
    `;
  }
}
```


## Interact with the Vizu Web Components

When the view is rendered, `Vizu` returns an object on this view:

```js
import { Component } from 'vizu';

const view = Vizu.render(
  `<Aaa />`,
  { '<Aaa />': Aaa },
  document.getElementById('app'),
);

```

The `view` object can be used to interact with the `Vizu Web Components` that compose the view.

The `Vizu Web Component` `Aaa` can be accessed by:
```js
view.Aaa;
```

### The Variables

The `Vizu Web Component` returns three variables:
```js
view.Aaa.id;
view.Aaa.cList;
view.Aaa.components
```

`id` is the id of the `Vizu Web Component` (the id of the surrounding `div`).

`cList` is an object that lists the `Vizu Web Components` included in this component(`null` if none).

`components` is an object that references the `Vizu Web Components` included in this component (`null` if none). For instance if `Aaa` includes `Bbb`, `Bbb` could be accessed by:
```js
view.Aaa.components.Bbb
```


### The methods

The defined methods of a `Vizu Web Component` can be accessed by:
```js
view.Aaa.updateTitle('Hello!');
```

  The method of a `Vizu Web Component` that belongs to a `parent` `Vizu Web Component` can be accessed by:
```js
view.Aaa.components.Bbb.updateTitle('Hello Again!');
```


## Replace a Vizu Web Component

Sometimes, you need to replace a complete `Vizu Web Component` in the `view`. For instance, if your application consists of a `view` built with four `Vizu Web Components`: Header, Footer, Menu, Contents. When the user moves from one page to another, you have to change all the contents section of the application:

```js
// Render a view:
const view = Vizu.render(
  `<Aaa />`,
  { '<Aaa />': Aaa },
  document.getElementById('app'),
);

// Aaa contains a subcomponent Bbb that needs to be replaced by Ccc:
Vizu.replace(view, { '<Bbb />': Ccc });
```

You just need to call the method `Vizu.replace`. The first argument is the `view` object and the second argument is an object whose property is the tag of the web component to replace and the value is the reference to the new `Vizu Web Component`.


## Reference

### Vizu Web Component

```js
class <new component> extends Component {
  constructor() {
  }
  getInitialState() {
  }
  $() {
  }
  events() {
  }
  render() {
  }
}
```

A `Vizu Web Component` is a class object that extends the class `Component` of `Vizu`. It implements four methods:

  * `getInitialState`: this method is executed before the component is rendered. It initializes Javascript variables at their initial value.

  * `$`: this method interacts with the DOM elements of the selected `Vizu Web Component`. `$` is a wrapper around the Javascript function `querySelector` and it implements a few functions (see below).

  * `events`: this method attaches events to the component when it is rendered in the DOM tree.

  * `render`: this method returns the component defined in a string by HTML tags.


#### $()

```
Methods                         | Description
```
```
$().getElement()                | returns the child element of the Vizu Web Component,
$(el).getElement()              | returns the child element of the el child element,

$().id                          | returns the id of selected element,

$().html()                      | returns the child element(s) of the selected element.
$().html(xml)                   | replaces the child element by a new element defined by the passed-in XML string and returns this,
$().empty()                     | removes all the child nodes and returns this,
$().append(xml)                 | inserts the element (defined by the passed-in XML string) after the last child node and returns this,
$().prepend(xml)                | inserts the element before the first child node and returns this,
$(el).after(xml)¹               | inserts the element after the selected element and returns this,
$(el).before(xml)¹              | inserts the element before the selected element and returns this,
$(el)replaceWith(xml)¹          | replaces the selected element by the passed-in element and returns this,

$().text()                      | returns the contents of the selected element,
$().text('string')              | replaces the text contents and returns this,

$().css(style)                  | returns the style value,
$().css(style, value)           | sets the style value and returns this,

$().getClassList()              | returns a DOMTokenList (getClassList() is a wrapper around classList),
$().addClass('className')       | adds 'className' to the selected element and returns this,
$().removeClass('className')    | removes 'className' from the selected element and returns this,
$().toggleClass('className')    | adds or removes 'className' to/from the selected element and returns this,

$().attr(attribute)             | returns the attribute value of the selected element,
$().attr(attribute, value)      | sets the attribute of the selected element,
$().removeAttr(attribute)       | removes the attribute from the selected element,

$(el).on(event, listener)       | adds an event listener to the selected child and returns this.
$(el).off(event, listener)      | removes the attached event listener from the selected child and returns this.
```
¹ *after, before and replacewith could only apply to a child element and not to the Component itself*,

### Vizu Render

`Vizu` implements the method `render` to insert a view in the DOM tree:

```js
const view = Vizu.render(view, reference, el);
```
`Vizu.render()` requires one mandatory argument and two optional arguments:

  1. `view`: the first argument is the view to render. It is a string that contains a set of HTML tags defining the object to visualize. It can contain custom tags defining `Vizu Web Components`.

  A `Vizu Web Component` tag is defined as `<NameOfVizuWebComponent />`.

  * `reference`: the second argument is a Javascript object that links the `Vizu Web Component` tag to the class defining it.

  ```js
  // Example:
  { '<NameOfVizuWebComponent />': NameOfVizuWebComponent }
  ```
  If this argument is omitted, the `Vizu Web Component` tag is not interpreted.

  * `el`: the third argument is the element in the DOM tree where the view is inserted. If it is omitted, the view is directly inserted in the `body` as the first node.

`Vizu.render()` returns the view object. This object allows the user to interact with the `Vizu Web Components` defining the `view`. The view object looks like:
```js
{ 'NameOf1stVizuWebComponent': {...}, 'NameOf2ndVizuWebComponent': {...}, etc. }
```

The `view` object gives the list of the first level `Vizu Web Components` objects that compose the view.

The `Vizu Web Component` object gives access to three variables:

  1. `id` {string}: the id of the `div` tag that surrounds the `Vizu Web Component`,

  * `cList` {Object}: the list of the `Vizu Web Component` tags that are included in this `Vizu Web Component`,

  * `components` {Object}: the `Vizu Web Component` objects that are included in this `Vizu Web Component` object,

  ```js
  // Example for the `Aaa` Vizu Web Component child of view:
  const id = view.Aaa.id;

  // Example for the `Bbb` Vizu Web Component child of `Aaa` Vizu Web Component:
  const id = view.Aaa.components.Bbb.id;

  // Example for `Ccc` child of `Bbb`:
  const id = view.Aaa.components.Bbb.components.Ccc.id;
  ```

The `Vizu Web Component` object gives access to the user defined methods:
```js
// Example for the `Aaa` Vizu Web Component child of view:
view.Aaa.updateTitle('New Title');

// Example for the `Bbb` Vizu Web Component child of `Aaa` Vizu Web Component:
view.Aaa.components.Bbb.updateTitle('New Title');

// Example for `Ccc` child of `Bbb`:
view.Aaa.components.Bbb.components.Ccc.updateTitle('New Title');
```

### Vizu Replace

`Vizu` implements the method `replace` to replace a `Vizu Web Component` in the DOM tree:

```js
Vizu.replace(view, newwebcomponent);
```

`view` is the object returned by `Vizu.render`.

`newwebcomponent` is an object whose property is the tag of the `Vizu Web Component` to replace and the value is the reference to the new `Vizu Web Component` (the class).

Example:
```js
{ `<Aaa />`: Bbb }
```

It means: I want to replace the `Vizu Web Component` linked to the tag `<Aaa />` by the `Vizu Web Component` referenced by `Bbb` (the class Bbb).


### Vizu createClass

`Vizu` implements the method `createClass` to create a `Vizu Web Component` without ES6 classes.

```js
Vizu.createClass({

  getInitialState: function() {
  },

  render: function() {
  }
});
```


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/vizu.svg?style=flat-square
[npm-install-image]: https://nodei.co/npm/vizu.png?compact=true
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/vizu.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/vizu.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/vizu/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/vizu/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/vizu/dev-status.svg?theme=shields.io
[license-image]: https://img.shields.io/npm/l/vizu.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/vizu
[npm-install-url]: https://nodei.co/npm/vizu
[node-url]: http://nodejs.org/download
[download-url]: https://www.npmjs.com/package/vizu
[travis-url]: https://travis-ci.org/jclo/vizu
[coveralls-url]: https://coveralls.io/github/jclo/vizu?branch=master
[dependencies-url]: https://david-dm.org/jclo/vizu#info=dependencies
[devdependencies-url]: https://david-dm.org/jclo/vizu#info=devDependencies
[license-url]: http://opensource.org/licenses/MIT
