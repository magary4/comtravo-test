const endpoint = 'https://discovery-stub.comtravo.com/source2'
const axios = require('axios')
const axiosRetry = require('axios-retry')
axiosRetry(axios, { retries: 5 })

const token = Buffer.from(`${process.env.API_USER}:${process.env.API_PASS}`, 'utf8').toString('base64')

module.exports = () => new Promise((resolve, reject) => {
  axios.get(endpoint, {
    headers: {
      'Authorization': `Basic ${token}`
    }
  })
    .then(response => {
      resolve(response.data.flights)
    })
    .catch(e => reject('error'))

  setTimeout(() => reject('timeout'), 1000);
});