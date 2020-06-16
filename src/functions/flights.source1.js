const endpoint = 'https://discovery-stub.comtravo.com/source1'
const axios = require('axios')
const axiosRetry = require('axios-retry')
axiosRetry(axios, { retries: 5 })

module.exports = () => new Promise((resolve, reject) => {
  axios.get(endpoint)
    .then(response => {
      resolve(response.data.flights)
    })
    .catch(e => reject('error'))

  setTimeout(() => reject('timeout'), 1000);
});