import { resize_img, load_img, square_size } from '@am2r/img'

const file_input = document.getElementById('file-input') as HTMLInputElement
const size_input = document.getElementById('size-input') as HTMLInputElement
const resize_btn = document.getElementById('resize-btn') as HTMLButtonElement
const output_img = document.getElementById('output-image') as HTMLImageElement

resize_btn.addEventListener('click', async () => {
  const size = Number(size_input.value)
  const file = file_input.files?.[0]
  if (!file)
    return alert('Please select an image file.')
  if (!(size > 0))
    return alert('Please enter valid size values.')

  const img = await load_img(file)

  const output = await resize_img(img,
    square_size(img.size, size)
  )

  output_img.src = URL.createObjectURL(output)
})
