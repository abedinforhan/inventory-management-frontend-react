import axios from 'axios'

export const uploadSingleImage = async (img) => {
  const url = 'https://api.imgbb.com/1/upload?key=e7929fc7aa713162fc5bf0743b6b6ab4'
  const form = new FormData()
  form.append('image', img)
  const { data } = await axios.post(url, form)

  return data?.data.display_url
}

export const uploadMultipleImages = async (files) => {
  try {
    let newImages = []
    for (let i = 0; i < files.length; i++) {
      const imageURL = await uploadSingleImage(files[i])
      newImages.push(imageURL)
    }
    return newImages
  } catch (error) {
    console.log(error)
  }
}
