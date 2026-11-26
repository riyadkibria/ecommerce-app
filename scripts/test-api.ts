async function testApi() {

  const response = await fetch(
    "https://dummyjson.com/products?limit=5"
  );

  const data = await response.json();

  console.log(data);

}

testApi();