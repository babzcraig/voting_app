class ProductList extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map(product => {
      if (product.id === productId) {
        const newProduct = Object.assign({}, product, {
          votes: product.votes + 1
        })
        return newProduct;
      } else {
        return product
      }
    });
    this.setState({ products: nextProducts })
  }

  render() {
    const products = this.state.products.sort((a,b) => (
      b.votes - a.votes
    ));
    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return (
      <div className="ui unstackable items">
        {productComponents}
      </div>
    );
  }
}

function Product(props) {
  return (
    <div className='item'>
    <div className='image'>
      <img src={props.productImageUrl} />
    </div>
    <div className='middle aligned content'>
      <div className='header'>
        <a onClick={()=> props.onVote(props.id)}>
          <i className='large caret up icon' />
        </a>
        {props.votes}
      </div>
      <div className='description'>
        <a href={props.url}>
          {props.title}
        </a>
        <p>
          {props.description}
        </p>
      </div>
      <div className='extra'>
        <span>Submitted by:</span>
        <img
          className='ui avatar image'
          src={props.submitterAvatarUrl}
        />
      </div>
    </div>
  </div>
  )
}

ReactDOM.render(
  <ProductList />,
  document.getElementById("content")
);