const {useState, useEffect, useRef} = React;

const Stock = (props) => {
    const {stock, index, handleChange, removeStock} = props;
    const {
      name,
      shares_owned,
      cost_per_share,
      market_price,
    } = stock;
    const market_value = shares_owned * market_price;
    const unrealized_gain_loss = market_value - shares_owned * cost_per_share;
    // Adopting the underscore_style for consistency

    return (
      <tr>
        <td>{name}</td>
        <td><input onChange={e => handleChange(e, index)} type="number" name="shares_owned" value={shares_owned} /></td>
        <td><input onChange={e => handleChange(e, index)} type="number" name="cost_per_share" value={cost_per_share} /></td>
        <td><input onChange={e => handleChange(e, index)} type="number" name="market_price" value={market_price} /></td>
        <td>{market_value}</td>
        <td>{unrealized_gain_loss}</td>
        <td><button className="btn btn-light btn-sm" onClick={() => removeStock(index)}>remove</button></td>
      </tr>
    )
  }
  const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([
      {
        name: 'Feetbook',
        shares_owned: 20,
        cost_per_share: 50,
        market_price: 130
      },{
        name: 'Yamazon',
        shares_owned: 5,
        cost_per_share: 200,
        market_price: 500
      },{
        name: 'Snoozechat',
        shares_owned: 100,
        cost_per_share: 20,
        market_price: 3
      }
    ]);
    const [form, setForm] = useState({
      name: '',
      shares_owned: 0,
      cost_per_share: 0,
      market_price: 0
    });
    
    const handleChange = (event, index) => {
        const portfolioCopy = portfolio.slice();
        const {name, value} = event.target;

        portfolioCopy[index][name] = value;
        setPortfolio(portfolioCopy);
    }

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        form[name] = value;
        setForm({...form});
    }

    const addStock = (event) => {
        event.preventDefault();
        const portfolioCopy = portfolio.slice();

        portfolioCopy.push({...form});
        setPortfolio(portfolioCopy);
        setForm({
            name: '',
            shares_owned: 0,
            cost_per_share: 0,
            market_price: 0
        })
    }

    const removeStock = (index) => {
        const portfolioCopy = portfolio.slice();
        portfolioCopy.splice(index, 1);

        setPortfolio(portfolioCopy); 
    }

    const portfolio_market_value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
    const portfolio_cost = portfolio.reduce((sum, stock) => stock.shares_owned * stock.cost_per_share + sum, 0);
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;
    
    return (
      <div className="container">
        <h1 className="text-center my-4">Stock Portfolio</h1>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Shares Owned</th>
                  <th scope="col">Cost per share ($)</th>
                  <th scope="col">Market Price ($)</th>
                  <th scope="col">Market Value ($)</th>
                  <th scope="col">Unrealized Gain/Loss ($)</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, index) => 
                  <Stock key={stock.name} stock={stock} index={index} handleChange={handleChange} removeStock={removeStock} />
                )}
              </tbody>
            </table>
          </div>
          <form className="col-12 mt-2 mb-4" onSubmit={addStock}>
            <input
              className="mx-2"
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleFormChange}
              value={form.name}
              required
            />
            <input
              className="mx-2"
              name="shares_owned"
              type="number"
              placeholder="Shares"
              value={form.shares_owned}
              onChange={handleFormChange}
            />
            <input
              className="mx-2"
              name="cost_per_share"
              type="number"
              placeholder="Cost"
              value={form.cost_per_share}
              onChange={handleFormChange}
            />
            <input
              className="mx-2"
              name="market_price"
              type="number"
              placeholder="Price"
              value={form.market_price}
              onChange={handleFormChange}
            />
            <button className="btn btn-primary btn-sm">add</button>
          </form>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio value: $ {portfolio_market_value}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio gain/loss: $ {portfolio_gain_loss}</h4>
          </div>
        </div>
      </div>
    )
  }

  ReactDOM.render(
    <Portfolio />,
    document.getElementById('root')
  );