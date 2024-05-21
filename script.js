var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef;


var Stock = function Stock(props) {
  var stock = props.stock,
      index = props.index,
      handleChange = props.handleChange,
      removeStock = props.removeStock;
  var name = stock.name,
      shares_owned = stock.shares_owned,
      cost_per_share = stock.cost_per_share,
      market_price = stock.market_price;

  var market_value = shares_owned * market_price;
  var unrealized_gain_loss = market_value - shares_owned * cost_per_share;
  // Adopting the underscore_style for consistency

  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      name
    ),
    React.createElement(
      "td",
      null,
      React.createElement("input", { onChange: function onChange(e) {
          return handleChange(e, index);
        }, type: "number", name: "shares_owned", value: shares_owned })
    ),
    React.createElement(
      "td",
      null,
      React.createElement("input", { onChange: function onChange(e) {
          return handleChange(e, index);
        }, type: "number", name: "cost_per_share", value: cost_per_share })
    ),
    React.createElement(
      "td",
      null,
      React.createElement("input", { onChange: function onChange(e) {
          return handleChange(e, index);
        }, type: "number", name: "market_price", value: market_price })
    ),
    React.createElement(
      "td",
      null,
      market_value
    ),
    React.createElement(
      "td",
      null,
      unrealized_gain_loss
    ),
    React.createElement(
      "td",
      null,
      React.createElement(
        "button",
        { className: "btn btn-light btn-sm", onClick: function onClick() {
            return removeStock(index);
          } },
        "remove"
      )
    )
  );
};
var Portfolio = function Portfolio() {
  var _useState = useState([{
    name: 'Feetbook',
    shares_owned: 20,
    cost_per_share: 50,
    market_price: 130
  }, {
    name: 'Yamazon',
    shares_owned: 5,
    cost_per_share: 200,
    market_price: 500
  }, {
    name: 'Snoozechat',
    shares_owned: 100,
    cost_per_share: 20,
    market_price: 3
  }]),
      _useState2 = _slicedToArray(_useState, 2),
      portfolio = _useState2[0],
      setPortfolio = _useState2[1];

  var _useState3 = useState({
    name: '',
    shares_owned: 0,
    cost_per_share: 0,
    market_price: 0
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      form = _useState4[0],
      setForm = _useState4[1];

  var handleChange = function handleChange(event, index) {
    var portfolioCopy = portfolio.slice();
    var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;


    portfolioCopy[index][name] = value;
    setPortfolio(portfolioCopy);
  };

  var handleFormChange = function handleFormChange(event) {
    var _event$target2 = event.target,
        name = _event$target2.name,
        value = _event$target2.value;


    form[name] = value;
    setForm(Object.assign({}, form));
  };

  var addStock = function addStock(event) {
    event.preventDefault();
    var portfolioCopy = portfolio.slice();

    portfolioCopy.push(Object.assign({}, form));
    setPortfolio(portfolioCopy);
    setForm({
      name: '',
      shares_owned: 0,
      cost_per_share: 0,
      market_price: 0
    });
  };

  var removeStock = function removeStock(index) {
    var portfolioCopy = portfolio.slice();
    portfolioCopy.splice(index, 1);

    setPortfolio(portfolioCopy);
  };

  var portfolio_market_value = portfolio.reduce(function (sum, stock) {
    return stock.shares_owned * stock.market_price + sum;
  }, 0);
  var portfolio_cost = portfolio.reduce(function (sum, stock) {
    return stock.shares_owned * stock.cost_per_share + sum;
  }, 0);
  var portfolio_gain_loss = portfolio_market_value - portfolio_cost;

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "h1",
      { className: "text-center my-4" },
      "Stock Portfolio"
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-12" },
        React.createElement(
          "table",
          { className: "table table-responsive" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                { scope: "col" },
                "Name"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Shares Owned"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Cost per share ($)"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Market Price ($)"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Market Value ($)"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Unrealized Gain/Loss ($)"
              ),
              React.createElement("th", { scope: "col" })
            )
          ),
          React.createElement(
            "tbody",
            null,
            portfolio.map(function (stock, index) {
              return React.createElement(Stock, { key: stock.name, stock: stock, index: index, handleChange: handleChange, removeStock: removeStock });
            })
          )
        )
      ),
      React.createElement(
        "form",
        { className: "col-12 mt-2 mb-4", onSubmit: addStock },
        React.createElement("input", {
          className: "mx-2",
          name: "name",
          type: "text",
          placeholder: "Name",
          onChange: handleFormChange,
          value: form.name,
          required: true
        }),
        React.createElement("input", {
          className: "mx-2",
          name: "shares_owned",
          type: "number",
          placeholder: "Shares",
          value: form.shares_owned,
          onChange: handleFormChange
        }),
        React.createElement("input", {
          className: "mx-2",
          name: "cost_per_share",
          type: "number",
          placeholder: "Cost",
          value: form.cost_per_share,
          onChange: handleFormChange
        }),
        React.createElement("input", {
          className: "mx-2",
          name: "market_price",
          type: "number",
          placeholder: "Price",
          value: form.market_price,
          onChange: handleFormChange
        }),
        React.createElement(
          "button",
          { className: "btn btn-primary btn-sm" },
          "add"
        )
      ),
      React.createElement(
        "div",
        { className: "col-12 col-md-6" },
        React.createElement(
          "h4",
          { className: "mb-3" },
          "Portfolio value: $ ",
          portfolio_market_value
        )
      ),
      React.createElement(
        "div",
        { className: "col-12 col-md-6" },
        React.createElement(
          "h4",
          { className: "mb-3" },
          "Portfolio gain/loss: $ ",
          portfolio_gain_loss
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(Portfolio, null), document.getElementById('root'));