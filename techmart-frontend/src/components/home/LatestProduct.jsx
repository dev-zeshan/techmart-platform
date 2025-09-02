
const products = [
  {productName:"IPhone", price:70000 },
  {productName:"IPhone", price:70000 },
]

const LatestProduct = () => {
  return (
    <div className="bg-gray-100 px-6 py-8 flex-1">
      <div className="flex justify-between">
        <h1 className="font-semibold">Latest Products</h1>
        <p className="text-sm">View all products</p>
      </div>
      <div className="mt-6 flex justify-center space-x-8">
          {products.map((product, index)=>(
            <div 
            key={index}
            className="flex-1 justify-between max-w-48 max-h-44 bg-white p-10 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <p>{product.productName}</p>
              <p className="text-sm">{product.price}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default LatestProduct