exports.getValidImageUrl = async (filename, name = 'SH') => {
  if (filename === '' || filename === undefined || filename === null) {
    filename =
      'https://ui-avatars.com/api/?name=' +
      name +
      '&rounded=true&background=c39a56&color=fff'
  } else {
    filename = process.env.URL + 'uploads/' + filename
  }
  return filename
}

exports.getValidImage = async (filename) => {
  filename = process.env.URL + filename

  return filename
}
