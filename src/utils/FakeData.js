const format = require('date-fns/format')
const faker = require('faker')

for (i = 0; i < 100; i++) {
  let name = faker.name.firstName()
  let last = faker.name.lastName()
  let email = faker.internet.email()
  let region = faker.fake(
    '{"country": "{{address.country}}", "state": "{{address.state}}", "city": "{{address.city}}"}'
  )
  let sex = faker.random.arrayElement([0, 1, 2, 9])
  let date = format(faker.date.past(40, '2000-01-01'), 'YYYY-MM-DD')

  console.log(`('${name}','${last}','${email}','${region}',${sex},'${date}'),`)
}
