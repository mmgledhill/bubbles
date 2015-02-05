document.write("<style>g.node {transition: transform 1s;}</style>");

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Perf = React.addons.Perf;

HTMLWidgets.widget({

  name: 'bubbles',

  type: 'output',
  
  renderOnNullValue: true,

  initialize: function(el, width, height) {
    return {};
  },

  renderValue: function(el, x, instance) {

    // Store the current value so we can easily call renderValue
    // from the resize method below, which doesn't give us an x
    // value
    instance.lastValue = x;

    var bubble = d3.layout.pack()
        .sort(null)
        .padding(1.5);
    
    // Resize our svg element and bubble layout according to the
    // size of the actual DOM element
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    bubble.size([width, height]);
    
    var df = HTMLWidgets.dataframeToD3(x);

    var svg = React.createElement("svg", {className: "bubble", width: width, height: height}, 
      
        bubble.nodes({children: df, color: "transparent"}).map(function(d, i) {
          return React.createElement("g", {key: i, 
                    className: "node", 
                    style: {opacity: 1, transition: "transform 1s linear"}, 
                    transform: "translate(" + d.x + "," + d.y + ")"}, 
            React.createElement("title", null, d.tooltip), 
            React.createElement("circle", {r: d.r, fill: d.color}), 
            React.createElement("text", {dy: ".3em", style: {textAnchor: "middle"}, 
                  fill: d.textColor}, 
              d.label
            )
          );
        })
      
    );

    React.render(svg, el);
  },

  resize: function(el, width, height, instance) {
    // Re-render the previous value, if any
    if (instance.lastValue) {
      this.renderValue(el, instance.lastValue, instance);
    }
  }

});
