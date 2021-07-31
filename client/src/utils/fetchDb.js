const fetchDb = async (path, options) => {
  const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'https://amazon-product-price-tracker.herokuapp.com/';
  const url = origin + path;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export default fetchDb;
