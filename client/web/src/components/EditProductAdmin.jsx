import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading'
import ViewImage from '../components/ViewImage'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SunmaryApi';
import toast from 'react-hot-toast';
import successAlert from '../utils/SuccessAlert';
import axios from 'axios';

const EditProductAdmin = ({ data: propsData, close, fetchProductData }) => {
  const [data, setData] = useState({
    _id : propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {}
  })
  const [imageLoading, setImageLoading] = useState(false)
  const [viewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")
  const [isloading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = useCallback(async (e) => {
    const file = e.target.files[0]

    if (!file || file.length === 0) {
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    const imageUrl = ImageResponse.data.url
    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)

    // const files = e.target.files;
    // if (!files || files.length === 0) return;

    // const uploadPromises = Array.from(files).map((file) => {
    //   const formData = new FormData();
    //   formData.append("image", file);

    //   return axios.post("/api/image-upload", formData);
    // });

    // try {
    //   const responses = await Promise.all(uploadPromises);
    //   const imageUrls = responses.map((res) => res.data.url);

    //   setData((prev) => ({
    //     ...prev,
    //     image: [...prev.image, ...imageUrls],
    //   }));
    // } catch (error) {
    //   console.error("Image upload failed", error);
    //   toast.error("Image upload failed");
    // }
  }, [])

  const handleDeleteImage = useCallback((index) => {
    // data.image.splice(index, 1)
    // setData((preve) => {
    //   return {
    //     ...preve
    //   }
    // })
    setData((prev) => {
      const newImages = [...prev.image];
      newImages.splice(index, 1);
      return {
        ...prev,
        image: newImages
      };
    });
  }, [])

  const handleRemoveCategorySelected = useCallback((categoryId) => {
    // const index = data.category.findIndex(el => el._id === categoryId)
    // data.category.splice(index, 1)
    // setData((preve) => {
    //   return {
    //     ...preve
    //   }
    // })
    // setData((prev) => {
    //   const newCategory = [...data.category]
    //   newCategory.splice(index, 1)
    //   return {
    //     ...prev,
    //     category: newCategory
    //   }
    // })
    setData((prev) => {
      const newCategory = prev.category.filter(el => el._id !== categoryId);
      return {
        ...prev,
        category: newCategory
      };
    });
  }, [data.category])

  const handleRemoveSubCategorySelected = useCallback((subCategoryId) => {
    // const index = data.subCategory.findIndex(el => el._id === subCategoryId)
    // data.subCategory.splice(index, 1)
    // setData((preve) => {
    //   return {
    //     ...preve
    //   }
    // })
    // setData((prev) => {
    //   const newSubCategory = [...data.subCategory]
    //   newSubCategory.splice(index, 1)
    //   return {
    //     ...prev,
    //     subCategory: newSubCategory
    //   }
    // })
    setData((prev) => {
      const newSubCategory = prev.subCategory.filter(el => el._id !== subCategoryId);
      return {
        ...prev,
        subCategory: newSubCategory
      };
    });
  }, [data.subCategory])

  const filteredSubCategories = useMemo(() => {
    return allSubCategory.filter(subCat =>
      subCat.category?.length > 0 &&
      data.category.some(cat => cat._id === subCat.category[0]._id)
    );
  }, [allSubCategory, data.category]);

  const handleAddField = useCallback(() => {
    if (!fieldName.trim()) return;

    if (data.more_details[fieldName]) {
      toast.error("Field already exists");
      return;
    }
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }, [fieldName, data.more_details])

  const handleRemoveField = useCallback((k) => {
    setData(preve => {
      const newDetails = { ...preve.more_details }
      delete newDetails[k]
      return {
        ...preve,
        more_details: newDetails
      }
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (Number(data.discount) > Number(data.price)) {
        toast.error("Discount cannot exceed price");
        return;
      }
      if (data.price < 0 || data.discount < 0 || data.stock < 0) {
        toast.error("Negative values are not allowed");
        return;
      }

      setIsLoading(true)
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data
      })

      const { data: responseData } = response

      if (responseData.success) {
        // toast.success(responseData.message)
        successAlert(responseData.message)
        if (close) {
          close()
        }
        fetchProductData()
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {}
        })

        setSelectCategory("");
        setSelectSubCategory("");
        setOpenAddField(false)
        setFieldName("")
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 z-50'>
      <div className='bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]:'>
        <section>
          <div className='p-2 bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Upload Product</h2>
            <button onClick={close}>
              <IoClose size={20}/>
            </button>
          </div>
          <div className='grid p-3'>
            <form className='grid gap-4' onSubmit={handleSubmit}>
              <div className='grid gap-1'>
                <label htmlFor="name" className='font-medium'>Name</label>
                <input
                  id='name'
                  type="text"
                  placeholder='Enter product name'
                  name='name'
                  value={data.name}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border border-gray-300 rounded focus-within:border-[#ffbf00]'
                />
              </div>
              <div className='grid gap-1'>
                <label htmlFor="description" className='font-medium'>Description</label>
                <textarea
                  id='description'
                  type="text"
                  placeholder='Enter product description'
                  name='description'
                  value={data.description}
                  onChange={handleChange}
                  required
                  multiple
                  rows={3}
                  className='bg-blue-50 p-2 outline-none border border-gray-300 rounded focus-within:border-[#ffbf00] resize-none'
                />
              </div>
              <div>
                <p className='font-medium'>Image</p>
                <div>
                  <label htmlFor='productImage' className='bg-blue-50 h-24 border border-gray-300 rounded flex justify-center items-center cursor-pointer'>
                    <div className='text-center flex justify-center items-center flex-col'>
                      {
                        imageLoading ? (
                          <Loading />
                        ) : (
                          <>
                            <FaCloudUploadAlt size={35} />
                            <p>Upload Image</p>
                          </>
                        )
                      }
                    </div>
                    <input
                      type="file"
                      id='productImage'
                      className='hidden'
                      accept='image/*'
                      onChange={handleUploadImage}
                    />
                  </label>
                  {/* display upload image */}
                  <div className='flex flex-wrap gap-4'>
                    {
                      data.image.map((img, index) => {
                        return (
                          <div key={img} className='h-20 w-20 mt-1 min-w-20 bg-blue-50 border border-blue-100 rounded relative group'>
                            <img
                              src={img}
                              alt={img}
                              className='w-full h-full object-scale-down cursor-pointer'
                              onClick={() => setViewImageUrl(img)}
                            />
                            <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 text-white rounded hidden group-hover:block cursor-pointer'>
                              <MdDelete />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='grid gap-1'>
                <label className='font-medium'>Category</label>
                <div>
                  {/* select category */}
                  <select
                    className='bg-blue-50 border w-full p-2 rounded border-gray-300'
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value
                      const category = allCategory.find(el => el._id === value)
                      if (!category || data.category.some(cat => cat._id === category._id)) return
                      setData((preve) => {
                        return {
                          ...preve,
                          category: [...preve.category, category]
                        }
                      })
                      setSelectCategory("")
                    }}
                  >
                    <option value="" className='text-neutral-600'>Select Category</option>
                    {
                      allCategory.map((category, index) => {
                        return (
                          <option value={category?._id} key={category._id + "category"}>
                            {category?.name}
                          </option>
                        )
                      })
                    }
                  </select>
                  {/* display value */}
                  <div className='flex flex-wrap gap-3'>
                    {
                      data.category.map((cat, index) => {
                        return (
                          // <p key={cat._id + "selectedCategory"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                          //   {cat.name}
                          //   <div className='text-neutral-800 cursor-pointer hover:text-red-600' onClick={() => handleRemoveCategorySelected(cat._id)}>
                          //     <IoClose size={20} />
                          //   </div>
                          // </p>
                          <div key={cat._id + "selectedCategory"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                            {cat.name}
                            <div className='text-neutral-800 cursor-pointer hover:text-red-600' onClick={() => handleRemoveCategorySelected(cat._id)}>
                              <IoClose size={20} />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='grid gap-1'>
                <label className='font-medium'>Sub Category</label>
                <div>
                  {/* select category */}
                  <select
                    className='bg-blue-50 border w-full p-2 rounded border-gray-300'
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value
                      const subCategory = allSubCategory.find(el => el._id === value)
                      if (!subCategory || data.subCategory.some(sub => sub._id === subCategory._id)) return
                      setData((preve) => {
                        return {
                          ...preve,
                          subCategory: [...preve.subCategory, subCategory]
                        }
                      })
                      setSelectSubCategory("")
                    }}
                  >
                    <option value="" className='text-neutral-600'>Select Sub Category</option>
                    {/* {
                  allSubCategory
                    .filter(subCat =>
                      subCat.category?.length > 0 &&
                      data.category.some(cat => cat._id === subCat.category[0]._id)
                    )
                    .map((subCategory, index) => {
                      return (
                        <option value={subCategory?._id} key={subCategory._id + "subCategory"}>
                          {subCategory?.name}
                        </option>
                      )
                    })
                } */}
                    {filteredSubCategories.length > 0 ? (
                      filteredSubCategories.map(subCategory => (
                        <option value={subCategory._id} key={subCategory._id + "subCategory"}>
                          {subCategory.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No subcategories available</option>
                    )}
                  </select>
                  {/* display value */}
                  <div className='flex flex-wrap gap-3'>
                    {
                      data.subCategory.map((subCat, index) => {
                        return (
                          // <p key={subCat._id + "selectedSubCategory"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                          //   {subCat.name}
                          //   <div className='text-neutral-800 cursor-pointer hover:text-red-600' onClick={() => handleRemoveSubCategorySelected(subCat._id)}>
                          //     <IoClose size={20} />
                          //   </div>
                          // </p>
                          <div key={subCat._id + "selectedSubCategory"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                            {subCat.name}
                            <div className='text-neutral-800 cursor-pointer hover:text-red-600' onClick={() => handleRemoveSubCategorySelected(subCat._id)}>
                              <IoClose size={20} />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='grid gap-1'>
                <label htmlFor="unit" className='font-medium'>Unit</label>
                <input
                  id='unit'
                  type="text"
                  placeholder='Enter product unit'
                  name='unit'
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border border-gray-300 rounded focus-within:border-[#ffbf00]'
                />
              </div>
              <div className='grid gap-1'>
                <label htmlFor="stock" className='font-medium'>Number of Stock</label>
                <input
                  id='stock'
                  type="number"
                  min={0}
                  placeholder='Enter product stock'
                  name='stock'
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border border-gray-300 rounded focus-within:border-[#ffbf00]'
                />
              </div>
              <div className='grid gap-1'>
                <label htmlFor="price" className='font-medium'>Price</label>
                <input
                  id='price'
                  type="number"
                  min={0}
                  placeholder='Enter product price'
                  name='price'
                  value={data.price}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border border-gray-300 rounded focus-within:border-[#ffbf00]'
                />
              </div>
              <div className='grid gap-1'>
                <label htmlFor="discount" className='font-medium'>Discount</label>
                <input
                  id='discount'
                  type="number"
                  min={0}
                  placeholder='Enter product discount'
                  name='discount'
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border border-gray-300 rounded focus-within:border-[#ffbf00]'
                />
              </div>
              {/* add more field */}
              {
                Object?.keys(data?.more_details)?.map((k, index) => {
                  return (
                    <div key={k + index} className='grid gap-1'>
                      <div className='flex justify-between'>
                        <label htmlFor={k} className='font-medium'>{k}</label>
                        {/* <div className='text-neutral-800 cursor-pointer hover:text-red-600' onClick={() => {
                      const newDetails = { ...data.more_details }
                      delete newDetails[k]
                      setData(prev => ({
                        ...prev,
                        more_details: newDetails
                      }));
                    }}>
                      <IoClose size={20} />
                    </div> */}
                        <div className='text-neutral-800 cursor-pointer hover:text-red-600' onClick={() => handleRemoveField(k)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                      <input
                        id={k}
                        type="text"
                        value={data?.more_details[k]}
                        onChange={(e) => {
                          const value = e.target.value
                          setData((preve) => {
                            return {
                              ...preve,
                              more_details: {
                                ...preve.more_details,
                                [k]: value
                              }
                            }
                          })
                        }}
                        required
                        className='bg-blue-50 p-2 outline-none border border-gray-300 rounded focus-within:border-[#ffbf00]'
                      />
                    </div>
                  )
                })
              }

              <div onClick={() => setOpenAddField(true)} className='inline-block hover:bg-[#ffbf00] bg-white py-1 px-3 w-32 text-center font-semibold border border-[#ffbf00] hover:text-neutral-900 rounded cursor-pointer'>
                Add Fields
              </div>

              <button disabled={isloading} className={`bg-[#ffc929] ${isloading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#ffbf00]'} py-2 rounded font-semibold`}>
                {isloading ? <Loading /> : "Update Product"}
              </button>

            </form>
          </div>

          {
            viewImageUrl && (
              <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
            )
          }

          {
            openAddField && (
              <AddFieldComponent
                close={() => setOpenAddField(false)}
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                submit={handleAddField}
              />
            )
          }
        </section>
      </div>
    </section>
  )
}

export default EditProductAdmin
