jest.mock('../../src/functions/flights.source1', () => () => Promise.reject('timeout'));

jest.mock('../../src/functions/flights.source2', () => () => Promise.resolve([{
  slices: [
    {
      flight_number: 144
    },
    {
      flight_number: 145
    }
  ],
  price: 129
},
{
  slices: [
    {
      flight_number: 146
    },
    {
      flight_number: 147
    }
  ],
  price: 130
}]));

const jsonResMock = jest.fn()

const res = {
  json: jsonResMock
}

let getFlights = require('../../src/functions/flights.facade')

describe('flights.facade: flights from source1 and source2 being loaded', () => {

  test('should resolve results from 2 sources respecting timeout from one source', async () => {

    const result = await getFlights({}, res)

    expect(jsonResMock).toHaveBeenCalledWith([
      expect.objectContaining({
        price: 129,
        origin: expect.objectContaining({ flight_number: 144 }),
        target: expect.objectContaining({ flight_number: 145 })
      }),
      expect.objectContaining({
        price: 130,
        origin: expect.objectContaining({ flight_number: 146 }),
        target: expect.objectContaining({ flight_number: 147 })
      })
    ])

    expect(jsonResMock).toHaveBeenCalledTimes(1)
  })

  test('should resolve results from 2 sources and remove dublicates', async () => {

    jest.mock('../../src/functions/flights.source1', () => () => Promise.resolve([{
      slices: [
        {
          flight_number: 144
        },
        {
          flight_number: 145
        }
      ],
      price: 129
    }]));

    getFlights = require('../../src/functions/flights.facade')
    
    const result = await getFlights({}, res)

    expect(jsonResMock).toHaveBeenCalledWith([
      expect.objectContaining({
        price: 129,
        origin: expect.objectContaining({ flight_number: 144 }),
        target: expect.objectContaining({ flight_number: 145 })
      }),
      expect.objectContaining({
        price: 130,
        origin: expect.objectContaining({ flight_number: 146 }),
        target: expect.objectContaining({ flight_number: 147 })
      })
    ])

    expect(jsonResMock).toHaveBeenCalledTimes(2)
  })

});