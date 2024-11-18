import React, { useState } from 'react';
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("None");
  const [subCategory, setSubCategory] = useState("None");
  const [stock, setStock] = useState("");
  const [stockStatus, setStockStatus] = useState(""); // Initially true (In Stock)
  const [bestseller, setBestseller] = useState(""); // Initially false

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleStockStatusChange = (e) => {
    const value = e.target.value;
    setStockStatus(value === "In Stock"); // Sets true if "In Stock", otherwise false
  };

  const handleBestsellerChange = (e) => {
    const value = e.target.checked; // Boolean value from the checkbox
    setBestseller(value);
    console.log("Bestseller state updated:", value); // Debugging log
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    toast.info('Adding product...');

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("pId", Number(productId));
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("quantity", Number(stock));
      formData.append("stockStatus", stockStatus); // Save as boolean
      formData.append("bestseller", bestseller); // Send boolean directly
      formData.append("image", image);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        // Resetting all fields
        setName("");
        setProductId("");
        setDescription("");
        setImage(null);
        setPrice("");
        setCategory("None");
        setSubCategory("None");
        setStock("");
        setStockStatus(true); // Reset to "In Stock"
        setBestseller(false); // Reset to unchecked
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p>Upload Image</p>
        <div>
          <label htmlFor="image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Preview"
                className="w-20 h-20 object-cover"
              />
            ) : (
              <FiUpload size={"5em"} className="border-2 border-dotted border-gray-700 p-4" />
            )}
          </label>
          <input type="file" id="image" hidden onChange={handleFileChange} />
        </div>
      </div>

      <div className="w-full mt-4">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>

      <div className="w-full mt-4">
        <p className="mb-2">Product Id</p>
        <input
          onChange={(e) => setProductId(e.target.value)}
          value={productId}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="1001"
          required
        />
      </div>

      <div className="w-full mt-4">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Description.."
        />
      </div>

      <div className="max-w-[500px] flex flex-col flex-wrap sm:flex-row gap-2 sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="None">None</option>
            <option value="Pen">Pen</option>
            <option value="NoteBook">NoteBook</option>
            <option value="Novel">Novel</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="None">None</option>
            <option value="Orchid">Orchid</option>
            <option value="Hauser">Hauser</option>
            <option value="No Love Here">No Love Here</option>
            <option value="Spiral">Spiral</option>
            <option value="Fountain Pen">Fountain Pen</option>
          </select>
        </div>

        <div>
          <p className="mb-3">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>

        <div>
          <p className="mb-2">Stock</p>
          <input
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="100"
          />
        </div>

        <div>
          <p className="mb-2">Stock Status</p>
          <select onChange={handleStockStatusChange} className="px-3 py-2">
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={handleBestsellerChange}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
        ADD
      </button>
    </form>
  );
};

export default Add;
