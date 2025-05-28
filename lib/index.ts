export
interface I_size {
  w: number
  h: number
}
export
interface I_position {
  x: number
  y: number
}
export
type I_source = I_size & I_position
export
interface I_loaded_img {
  file: File
  dom: HTMLImageElement
  size: I_size
}
export
interface I_resize_opts {
  s: I_source
  d: I_size
  encode_opts?: ImageEncodeOptions
}

export
async function load_img(img: File): Promise<I_loaded_img> {
  const img_dom = document.createElement('img')
  await new Promise((res, rej) => {
    img_dom.onload = res
    img_dom.onerror = rej
    img_dom.src = URL.createObjectURL(img)
  })
  return {
    file: img,
    dom: img_dom,
    size: {
      w: img_dom.width,
      h: img_dom.height,
    },
  }
}

export
async function resize_img(img: I_loaded_img, opts: I_resize_opts): Promise<Blob> {
  const canvas = new OffscreenCanvas(opts.d.w, opts.d.h)
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(
    img.dom,
    opts.s.x,
    opts.s.y,
    opts.s.w,
    opts.s.h,
    0,
    0,
    opts.d.w,
    opts.d.h,
  )
  return await canvas.convertToBlob(opts.encode_opts)
}

export
function square_size(source: I_size, output: number): I_resize_opts {
  const min_dim = Math.min(source.w, source.h)
  const real_output = Math.min(output, min_dim)
  return {
    s: {
      x: 0 | ((source.w - min_dim) / 2),
      y: 0 | ((source.h - min_dim) / 2),
      w: min_dim,
      h: min_dim,
    },
    d: {
      w: real_output,
      h: real_output,
    }
  }
}
