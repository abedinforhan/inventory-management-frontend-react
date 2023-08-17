import React, { useState, useEffect } from 'react'
import {
  CForm,
  CFormLabel,
  CButton,
  CCol,
  CFormInput,
  CRow,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import axiosInstance from 'src/API/axiosInstance'
import { API_ENDPOINTS } from 'src/API/URL'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 0,
      price: 0,
    },
  })
  const navigate = useNavigate()

  const [categoryOptions, setCategoryOptions] = useState([])
  const [brandOptions, setBrandOptions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  // fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(`/categories`)
      const categories = response.data.data.data

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
      if (response.data.success) {
        navigate('/products/product-list')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow md={{ gutterY: 4 }}>
        <CCol md={4}>
          <CFormLabel htmlFor="name">Product Name :</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            autoComplete="off"
            {...register('name', { required: true, maxLength: 20 })}
          />
          {errors.name?.type === 'required' && <p role="alert">Name is required</p>}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="category">Select Category :</CFormLabel>
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
                <option value="">Select Category:</option>
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
        <CCol md={4}>
          <CFormLabel htmlFor="brandName">Select Brand </CFormLabel>
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
        <CCol md={4}>
          <CFormLabel htmlFor="sku">SKU</CFormLabel>
          <CFormInput
            type="text"
            id="sku"
            autoComplete="off"
            {...register('sku', { required: true, maxLength: 20 })}
          />
          {errors.sku === 'required' && <p role="alert">SKU is required</p>}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="quantity">Quantity</CFormLabel>
          <CFormInput
            type="number"
            id="quantity"
            name="quantity"
            min={0}
            {...register('quantity', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="description">Description:</CFormLabel>
          <CFormTextarea
            id="description"
            {...register('description', { required: false })}
            rows={4}
          ></CFormTextarea>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="MRPPrice">MRP Price</CFormLabel>
          <CFormInput
            type="number"
            id="MRPPrice"
            name="MRPPrice"
            min={0}
            {...register('MRPPrice', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="">Selling Price</CFormLabel>
          <CFormInput
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            min={0}
            {...register('sellingPrice', {
              required: true,
              valueAsNumber: true,
            })}
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

export default CreateProduct
