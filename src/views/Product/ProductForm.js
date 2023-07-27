import React, { useState, useEffect } from 'react'
import { CForm, CFormLabel, CButton, CCol, CFormInput, CRow, CFormSelect } from '@coreui/react'
import axiosInstance from 'src/api/axiosInstance'
import { API_ENDPOINTS } from 'src/api/endPoints'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const [categoryOptions, setCategoryOptions] = useState([])
  const [brandOptions, setBrandOptions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  // Fetch categories from the server using Axios
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.get_categories)
      const categories = response.data.data.data
      console.log(categories)
      // Map the categories to options array
      const options = categories.map((category) => ({
        label: category.name,
        value: category._id,
      }))
      // Set the category options
      setCategoryOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch brands  from the server using Axios
  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.get_brands)
      const brands = response.data.data.data
      console.log(brands)
      // Map the categories to options array
      const options = brands.map((brand) => ({
        label: brand.name,
        value: brand._id,
      }))
      // Set the brand options
      setBrandOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchBrands()
  }, [])

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleChange = () => {
    console.log('event')
    // setFolderName(event.target.value);
  }

  const onSubmit = async (data) => {
    console.log(data, 'dfata')
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.create_product, data)
      console.log(response.data.data, API_ENDPOINTS.create_product)
      // if (response.data.success) {
      //   navigate('/products/product-list')
      // }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow>
        <CCol md={6}>
          <CFormLabel htmlFor="name">Product Name:</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            autoComplete="off"
            {...register('name', { required: true, maxLength: 20 })}
          />
          {errors.name?.type === 'required' && <p role="alert">Name is required</p>}
        </CCol>

        {/* Category Dropdown */}
        <CCol md={6}>
          <CFormLabel htmlFor="category">Select Category</CFormLabel>
          <Controller
            control={control}
            name="category"
            defaultValue={null}
            rules={{ required: true }}
            render={({ field }) => (
              <CFormSelect
                id="categoryName"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                <option value="">Select category</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            )}
          />
          {errors.category?.type === 'required' && <p role="alert">Select is required</p>}
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <CFormLabel htmlFor="brandName">Select Brand</CFormLabel>
          <Controller
            control={control}
            name="brand"
            defaultValue={null}
            rules={{ required: true }}
            render={({ field }) => (
              <CFormSelect id="brand" value={field.value} onChange={field.onChange}>
                <option value="">Select brand</option>
                {brandOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            )}
          />
        </CCol>
      </CRow>
      <CRow className="my-4">
        <CCol>
          <CButton type="submit" color="primary">
            Submit
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default AddProduct
