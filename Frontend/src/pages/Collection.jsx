import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import Title from "../components/Title"
import ProductItem from '../components/ProductItem';
import AllProductsShow from '../components/AllProductsShow';


const Collection = () => {

  const { products } = useContext(ShopContext);
  

  const [showFilter, setShowFilter] = useState(true)

  const [allProducts, setAllProducts] = useState([])

  // Logic for category section is starts here
// Two array state for category
  const [category, setCategory] = useState([])

  const [subCategory, setSubCategory] = useState([])

  // useState for sort using high low etc
  const [sortType, setSortType] = useState('none')

// Function for category section toggle selecting and putting it in array and removing on again clicking

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

 // Function for sub category section toggle selecting and putting it in array and removing on again clicking 

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  
 
  // When we change the category or subcategory selected values, we filter the products based on those selected values.

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
      

    setAllProducts(productsCopy)
  }


  // Category logic ends here
  // Now by here i have category selected values in two arrays

  // Sorting by price and relevance

  const sortProducts = () => {
    let newProductCopy = products.slice();

    switch(sortType){
      case 'low-high':
        setAllProducts(newProductCopy.sort((a,b) => (a.price - b.price)))
        break;

      case 'high-low':
        setAllProducts(newProductCopy.sort((a,b) => (b.price - a.price)))
        break;

      case'relevance':
        setAllProducts(newProductCopy.sort((a,b) => (b.rating - a.rating)))
        break;
      
      default:
        applyFilter()
        break;
    }

  }


  useEffect(() => {
    setAllProducts(products)
  }, [products])


  // this useEffect is for changing the values in array and on the basis of that fetching products again and again
  useEffect(() => {
    applyFilter()
  }, [category, subCategory])

  useEffect(()=>{
    sortProducts()
  }, [sortType])

 


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter options */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER
        <IoIosArrowForward onClick={()=>setShowFilter(!showFilter)} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ""}`} />
        </p>
        
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : "hidden"}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Pen'} onChange={toggleCategory}/>Pen
            </p>             
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Note Books'} onChange={toggleCategory}/>Note Books
            </p>             
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Novels'} onChange={toggleCategory}/>Novels
            </p>             
          </div>
        </div>


      {/* SubCategory Filter */}

      <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : "hidden"}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Sherlock Homes'} onChange={toggleSubCategory}/>Sherlock Homes
            </p>             
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Aston Gustin'} onChange={toggleSubCategory}/>Aston Guston
            </p>             
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Henric Dalle'} onChange={toggleSubCategory}/>Henric Dalle
            </p>             
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Fountain Pen'} onChange={toggleSubCategory}/>Fountain Pen
            </p>             
          </div>
        </div>


      </div>


      {/* Right side */}

      <div className='flex-1'>
        
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>
          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' >
            <option value="none">Sort by: None</option>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>


        {/* Map products */}
        {/* flex gap-x-5 gap-y-10 justify-center flex-wrap mt-24  */}
        {/* grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 */}
        <div className="flex gap-x-4 gap-y-10 justify-center flex-wrap mt-24">
        {
            allProducts.map((item, index) => (
                <AllProductsShow key={index} item={item} />
            ))
        }
    </div>

      </div>


    </div>
  )
}

export default Collection
