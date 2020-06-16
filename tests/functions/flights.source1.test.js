const axios = require("axios");
const flightsFromSource1 = require('../../src/functions/flights.source1')

jest.mock('axios');
const response = { data: { flights: [{}, {}] } }

describe('flights.source1: flights from source1 being loaded', () => {
  
  test('should resolve results', async () => {
    axios.get.mockImplementationOnce(() => 
      new Promise(
        (resolve, reject) => setTimeout(() => resolve(response), 100)
    ));
    const result = await flightsFromSource1()
    expect(result).toStrictEqual([{}, {}])
    expect(axios.get).toHaveBeenCalledTimes(1)
  })

  test('should reject on timemout', async () => {
    axios.get.mockImplementationOnce(() => 
      new Promise(
        (resolve, reject) => setTimeout(() => resolve(response), 1100)
    ));
    const result = await flightsFromSource1().catch(e => {
      expect(e).toBe("timeout")
    })
    
    expect(axios.get).toHaveBeenCalledTimes(2)
  })

});