const getInitials = (name: string | undefined) => {
  if (!name) return ''
  const nameArr = name.split(" ").filter((str) => str !== "")

  if (nameArr.length === 0) return name.charAt(0).toUpperCase()
  else if (nameArr.length === 1) return name.split(" ")

  // if more than 3 words
  return (nameArr[0].charAt(0).toUpperCase() + nameArr[nameArr.length - 1].charAt(0).toUpperCase())
}

export default getInitials
