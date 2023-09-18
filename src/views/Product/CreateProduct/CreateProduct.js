import { cilCloudUpload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from '@coreui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import Select from 'react-select'
import Loading from 'src/components/Loading/Loading'
import { useGetBrandsData } from 'src/hooks/useBrand'
import { useCategoryData } from 'src/hooks/useCategory'
import { useAddNewProduct } from 'src/hooks/useProducts'
import { useUnitData } from 'src/hooks/useUnit'
import { uploadSingleImage } from 'src/utils/uploadImage'

const CreateProduct = () => {
  const { isLoading: isBrandLoading, data: brandOptions } = useGetBrandsData()
  const { isLoading: isCategoryLoading, data: categoryOptions } = useCategoryData()
  const { isLoading: isUnitLoading, data: unitOptions } = useUnitData()

  const [productImage, setProductImage] = useState('')

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    const productImage = await uploadSingleImage(file)
    setProductImage(productImage)
  }

  const onSuccess = () => {
    toast.success('Product is added succesfully', {
      duration: 4000,
    })
  }
  const onError = () => {
    toast.error('Failed to add product', {
      duration: 4000,
    })
  }

  const { mutate } = useAddNewProduct(onError, onSuccess)

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      perUnitBuyingPrice: 0,
      perUnitSellingPrice: 0,
      perUnitMaxPrice: 0,
      buyingQuantity: 0,
    },
  })

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      brand: data.brand.value,
      category: data.category.value,
      unit: data.unit.value,
      productImage: productImage,
    }
    mutate(newData)

    reset()
  }

  if (isBrandLoading && isCategoryLoading && isUnitLoading) {
    return <Loading />
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <CRow md={{ gutterY: 4 }}>
        <CCol md={4}>
          <CFormLabel htmlFor="name" className="fw-semibold">
            Name
          </CFormLabel>
          <CFormInput
            type="text"
            id="name"
            autoComplete="off"
            {...register('name', { required: true, maxLength: 40 })}
          />
          {errors.name && <span>Name is required</span>}
        </CCol>

        {/* SKU */}
        <CCol md={4}>
          <CFormLabel htmlFor="sku" className="fw-semibold">
            SKU
          </CFormLabel>
          <CFormInput
            type="text"
            id="sku"
            autoComplete="off"
            {...register('sku', { required: true, maxLength: 40 })}
          />
          {errors.sku && <span>SKU is required</span>}
        </CCol>

        {/* Category */}
        <CCol md={4}>
          <CFormLabel htmlFor="category" className="fw-semibold">
            Category
          </CFormLabel>
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                name="category"
                placeholder="Select category"
                options={categoryOptions}
              />
            )}
          />
          {errors.category && <span>category is required</span>}
        </CCol>

        {/* Brand */}
        <CCol md={4} sm={12}>
          <CFormLabel htmlFor="brand" className="fw-semibold">
            Select Brand
          </CFormLabel>
          <Controller
            name="brand"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select {...field} name="brand" placeholder="Select brand" options={brandOptions} />
            )}
          />
          {errors.brand && <span>brand is required.</span>}
        </CCol>

        {/* Unit */}
        <CCol md={4} sm={12}>
          <CFormLabel htmlFor="unit" className="fw-semibold">
            Select Unit
          </CFormLabel>
          <Controller
            name="unit"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select {...field} name="unit" placeholder="Select unit" options={unitOptions} />
            )}
          />
          {errors.unit && <span>unit is required.</span>}
        </CCol>

        {/* description */}
        <CCol md={12}>
          <CFormLabel htmlFor="description" className="fw-semibold">
            Description
          </CFormLabel>
          <CFormTextarea
            id="description"
            {...register('description', { required: false })}
            rows={4}
          ></CFormTextarea>
        </CCol>

        {/* perUnitSellingPrice */}
        <CCol md={4}>
          <CFormLabel htmlFor="perUnitSellingPrice" className="fw-semibold">
            Selling Price (Per Unit)
          </CFormLabel>
          <CFormInput
            type="number"
            id="perUnitSellingPrice"
            name="perUnitSellingPrice"
            min={0}
            {...register('perUnitSellingPrice', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>

        {/* perUnitMaxPrice */}
        <CCol md={4}>
          <CFormLabel htmlFor="perUnitMaxPrice" className="fw-semibold">
            Maximum Price (Per Unit)
          </CFormLabel>
          <CFormInput
            type="number"
            id="perUnitMaxPrice"
            name="perUnitMaxPrice"
            min={0}
            {...register('perUnitMaxPrice', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>

        {/* quantity */}
        <CCol md={4}>
          <CFormLabel htmlFor="buyingQuantity" className="fw-semibold">
            Select Quantity
          </CFormLabel>
          <CFormInput
            type="number"
            id="buyingQuantity"
            name="buyingQuantity"
            min={0}
            {...register('buyingQuantity', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>

        <CCol md={12}>
          <label
            htmlFor="imageUpload"
            style={{
              padding: '50px',
              border: '2px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer', // Make the label look clickable
              display: 'block', // Ensure the label takes up the full width
              textAlign: 'center', // Center text horizontally
            }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="mx-2">Upload Images</h5>
              <CIcon icon={cilCloudUpload} size="xxl" />
            </div>

            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              onChange={handleFileChange}
              style={{
                display: 'none', // Hide the actual file input
              }}
            />
          </label>
        </CCol>
      </CRow>

      <CRow className="my-4">
        <CCol>
          <CButton type="submit" color="primary">
            Submit
          </CButton>
        </CCol>
      </CRow>
      <Toaster position="bottom-center" />
    </CForm>
  )
}

export default CreateProduct
