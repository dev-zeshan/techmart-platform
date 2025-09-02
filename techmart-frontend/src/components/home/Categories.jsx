

const categoriesList = [
    {title: "Mobile"},
    {title: "Laptops"},
    {title: "Home Appliances"},
    {title: "HeadPhones"},
    {title: "Accessories"}
]
const Categories = () => {
  return (
    <div className="flex-1  bg-white px-6 py-8">
      <div className="">
        <h1 className="font-semibold text-2xl mb-6">Categories</h1>
      </div>
      <div className="mt-6 flex justify-center space-x-8">
        {categoriesList.map((category, index)=>(
          <div 
          className="flex-1 justify-between bg-gray-100 p-10 max-w-44 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          key={index} >
              <img
              src="placeholder.jpg"
              height={56}
              width={56}
              />
              <p>{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories