const flightsFromSource1 = require('./flights.source1')
const flightsFromSource2 = require('./flights.source2')
const _ = require('lodash')
const moment = require('moment')

module.exports = async (req, res) => {
  return Promise.allSettled([flightsFromSource1(), flightsFromSource2()]).then(results => {
    let flights = []
    results.filter(result => result.status == 'fulfilled').forEach(result => flights = flights.concat(result.value));
    
    res.json(_.uniqWith(flights, _.isEqual).map(flight => ({
      number: flight.slices[0].flight_number 
        + '-' + flight.slices[1].flight_number 
        + ' ' + moment(flight.slices[0].departure_date_time_utc).format('DD/MM')
        + '-' + moment(flight.slices[1].departure_date_time_utc).format('DD/MM'),
      price: flight.price,
      origin: flight.slices[0],
      target: flight.slices[1]
    })));
  })
}