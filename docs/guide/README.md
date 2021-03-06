# Guide

`Vizu` allows the user to create and aggregate `Vizu Web Components` and then render and manipulate them. It offers a similar API as `React` but `Vizu` directly writes to the DOM and it is much more lighter. As `Vizu` provides a set of methods to manipulate the component's childs in the DOM tree (incremental DOM), it doesn't need a virtual DOM.

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
    this.$('h1')[0].innerText = title;
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

This method relies on `this.$('h1')[0].innerText` to change the title. The method `$(el)` is just a wrapper around the Javascript function `querySelector`.

If the method `$()[]` has no selector (argument), it returns the entire HTML block that defines this `Vizu Web Component` in the DOM tree.

***Nota***:

`Component` implements a few shortcuts (see the reference section). For instance `$('h1')[0].innerText` can be replaced by `$('h1').text()`.


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
$()                             | selects the Vizu Web Component and returns this,
$(sel)                          | selects the child element with the attribute 'sel' and returns this,
$().id                          | returns the id of selected element,
$()[0]                          | returns the selected DOM element,

$().selectChild(n)              | selects the nth child,
$().parent()                    | selects the parent node,
$().firstParent()               | selects the root parent node if defined,

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

$().clone(deep)                 | clones the selected node if deep is false, clones node and childs if deep is true,
$().insertChildBefore(n, c)     | inserts the child 'n' before the child 'c'  and returns this,
$().removeChild(child)          | removes the child 'child'  and returns this,
$().replaceChild(n, c)          | replaces the child 'c' by the child 'n'  and returns this,
$().children()                  | returns a DOM object with all the node children,
$().childIndex()                | returns the child index (0 for the first child),
$().getRect()                   | returns the position and size of the node,

$().css(style)                  | returns the style value,
$().css(style, value)           | sets the style value and returns this,

$().getClassList()              | returns a DOMTokenList (getClassList() is a wrapper around classList),
$().addClass('className')       | adds 'className' to the selected element and returns this,
$().addClasses([...])           | adds an array of classes and returns this,
$().removeClass('className')    | removes 'className' from the selected element and returns this,
$().removeClasses([...])        | removes an array of classes and returns this,
$().toggleClass('className')    | adds or removes 'className' to/from the selected element and returns this,
$().hasClass('class')           | returns true if the node has the class 'class' or false if not,

$().attr(attribute)             | returns the attribute value of the selected element,
$().attr(attribute, value)      | sets the attribute of the selected element,
$().removeAttr(attribute)       | removes the attribute from the selected element,

$().animate(props, d, e, cb)    | changes dynamically the CSS attributes,

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

Enjoy!
