export function get(time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('fake fetch')
    }, time)
  })
}
