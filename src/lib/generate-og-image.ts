export const generateOgImage = ({
  title,
  description,
}: {
  title: string
  description?: string
}) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="100%" height="100%" fill="#f4f4f4" />
  <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="48" font-weight="bold" fill="#000">${title}</text>
  <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="#333">${description || ""}</text>
</svg>`
  const svgBase64 = Buffer.from(svg).toString("base64")
  const url = `data:image/svg+xml;base64,${svgBase64}`

  return url
}
