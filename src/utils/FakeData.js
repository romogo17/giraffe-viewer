const format = require('date-fns/format')
const faker = require('faker')

/**
 * Patient Fake Data
 */
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

/**
 * Study Fake Data
 *
 * First we need the Patient uuids to generate the mock data
 *
 *      \copy (select uuid from med_img.patient) To '~/Desktop/test.csv' With CSV;
 *      awk '{print "\047"$1"\047"}' < ~/Desktop/test.csv | paste -s -d, -
 */
const patientUuids = [
  'd5c717ee-6202-4889-a042-059ecf649c5a',
  '13909736-3b71-443a-9dc5-64ce885653e3',
  '2bd753c4-c3b5-4240-88ca-75b9f8f54400',
  '5bec589c-24a8-4b24-ace4-a19b89ab35b0',
  '46574dcb-5a11-4645-afe4-71021a9f8f91',
  '17cd3a1d-9e0e-448f-8237-7057abfe1296',
  '9f6e650e-b632-4827-977f-b15c4603653a',
  '99c3ee4a-0337-4bdc-8ffc-88fb64ec5d51',
  '9c4d3460-95c0-4bb2-a1b2-303e9e67c4b3',
  'c495edc7-80de-41f8-b131-4ad85687e01f',
  '4a98c9f5-a66d-4a44-a723-9fe058a9403a',
  'f9a5c635-8eee-4a09-93b4-944294cbe94f',
  '003a40b6-d2d4-406a-b634-1001403647c2',
  'e457a656-d04d-470f-b817-cb9c7c18f4f0',
  '365959d9-af81-4c3a-a3d6-d8d49915bd46',
  'd536a846-b48c-4999-991c-0e95b4f0897c',
  'a51c1640-00af-4457-ac49-5b0c40da5afe',
  'dbaf3b6b-9bcc-4359-ac73-fc6118100449',
  '4fe033b0-5e1f-4b0d-b17e-0ebf6760e94b',
  'b4ced52d-1a9f-4bae-96ad-5dd3f3f7cc1e',
  '338ebed1-fd58-4ff0-80e3-7ffb9ede3897',
  '89f47dd7-aa36-4757-bacb-6109efa1f408',
  '21199d18-368c-4982-84ec-29d1de674fda',
  '6d40beeb-1df9-4ee9-8908-a0b50248c916',
  'a655c579-e798-45dd-b428-8ecabab31a27',
  '7696faea-fbdf-4c64-9d04-56ceadf9c58b',
  'f0ab8c0f-e021-4419-ac26-b9c588b6d0fe',
  'dcb4ee98-7edb-49cd-bdec-30d0fbf772f6',
  '1f8a8b1a-2431-49ba-bfdd-bfd49b2ebeb4',
  '4fd1f6be-f1ff-4f69-b666-14da1c38d6d0',
  '23b2f129-984c-4c7c-a1d0-f001512af16e',
  '67e1bd25-47a7-4f94-8413-78ace61c381b',
  'edc6e456-88d9-4813-a490-fe6b06f6eb41',
  '9c467422-de6e-4c5a-82e8-f15505d88f3b',
  '84e7b88b-acbb-4214-9256-838d46021e27',
  '9b6d9ef8-c559-44a2-a17f-0b835833fccb',
  '6c373bd6-1a74-46ed-89d2-bcddb53021d8',
  'ce4189b0-5e13-4167-bd6b-60c1a8e6b7c8',
  'ec1fe286-ef8f-4229-a9d6-589d7e9be356',
  '6a84cc5a-d9d6-4d3d-a431-65e183685b81',
  'f6c3b70e-589e-4fd6-902e-3aeb90dab36e',
  'b2e41ee1-b587-43cd-94fe-7a6a2d510e62',
  '1e16debf-af73-419e-8ec5-4f82bb3a1b7b',
  '0df7e3f6-f598-40fa-b99f-5d16e2a5e0a1',
  '6b75b588-e561-4f70-a2f6-1ff4fe97b3b7',
  '32a4a052-303d-44a2-ab28-15a72e50932f',
  '33d75a33-99dd-4f1f-8295-5c4dac9faa8a',
  '82a20638-8bdd-4c0d-b931-4917861ceda0',
  'b8f0d05c-ddbc-458a-8f28-0df48febcc68',
  '7b1d80f3-8752-42b7-93d0-d0689fe0e9b9',
  '7e7bebb1-1a3b-40d1-bf0c-9edfe245f01c',
  'ddc5fcad-ed5e-4758-a120-2a2a4b8bc0ad',
  '6271a59a-a1c8-4ca7-a9c7-d79e830b5a53',
  'c0c899cc-9980-4c29-aae8-4cc8d04cb675',
  'bdcb5e6b-e860-4f2c-be0d-725fae215726',
  '471538a5-e97f-444e-a5b7-d8d52a88a706',
  '5b57c551-ba00-40d9-8209-7249eeea4668',
  '24a9a69f-20d7-4b1a-89a4-c944648f1a5c',
  '6671cfa9-e9bd-4126-aaec-2a52bec46547',
  'c9cdb367-5109-44a3-a1dc-bef43f2038e2',
  'efd692b5-b65c-40d4-aea5-d8f9c711eed7',
  '30be5480-b991-4606-afcb-a1ed578f07c0',
  'f4b33592-371f-4f88-bdac-02da9ce88844',
  'c83159e5-c844-4339-b738-8329ed48908a',
  '521db97f-2141-4583-9866-1c7164d464bc',
  '7041388a-07ea-484b-a639-48842b116d35',
  '6e73e858-b339-46ff-b2dd-630a5b54f960',
  '2722bc56-61d8-4cf0-8f31-bd92ab380b1b',
  '2bc97eeb-1a65-4aab-a62b-ed615b79fb39',
  'db7c1287-82f3-4846-8662-81ec8c1ada46',
  'ef823f91-86ed-4c7c-9611-6b8298378bf8',
  '4336bf04-064d-4973-92d8-73737818f276',
  'c0c77d46-1374-4a42-98f7-10e154036911',
  '5b107b23-161e-4ec0-aa97-b336343a374a',
  '495d9ae3-1ec7-4f96-a82a-988e7bf49b7a',
  'ce9d02c6-99dc-4f06-99dc-9d6771370610',
  '9b9044e5-2ddd-4e58-b760-dc1fc920e29f',
  'a74fb713-bfd8-4f75-9609-bfc250eea25d',
  '08a36bfa-21db-4559-8798-4a18c62f07e0',
  '4e8666c3-bf01-4784-b23b-30f35b93b52f',
  '9cbef067-b74c-47af-8e35-1e17f727ce4f',
  '34808c75-29f4-4aad-8b7a-a815bc991221',
  'ced8c183-4b17-41b4-b259-42f2b705a7d8',
  '951141b0-1f5c-4d3f-a68c-bfe0f2c2b236',
  'ee4b3e6d-f929-4b09-bf46-a039a06cbd58',
  'e598bb8b-3a22-47a6-96c2-01b838ac0c4a',
  'eaf2763f-5ece-4db5-b696-b328b000c900',
  '7ff8d89a-ca0e-45c0-9025-aa7738956e7f',
  'e89770ff-b965-4de4-8415-22c45654a399',
  'c46f2881-d237-43a6-8553-b5f0a96dd582',
  '9429ffbd-7216-4e9d-a891-47e13f47f133',
  '0c6639d7-1726-44cb-a996-2d168fa0d920',
  'c7ee29fa-26fd-4c77-a243-944829d6fadf',
  '4e014c88-8663-4adf-b263-2bb3a29f2ad0',
  '4c2f0487-fd2c-4106-b90e-d46aa1b79c12',
  'f46bd3c3-e0c1-468c-8c02-a658e994cd69',
  '9fec65e6-6d43-4ae1-8c5d-3990890aa8c2',
  '658b3d77-f5c7-4fa3-a527-80d3ebfd8d5c',
  '6307eaac-706b-49b4-97d8-9c06f895c281',
  '1f28dc19-e6ec-47e7-b972-0b1cdd412db6',
  '2ceeaeaa-3b53-45db-85a5-bb4e8419a6f4',
  'edd907b9-086b-4709-827c-bcae7857b0f1',
  '2996f73b-f663-402b-a8b3-79021f04b4db',
  '64157b58-0f8f-4025-9ee0-fd4906861f06'
]
const descriptions = ['Digital Mammogram', 'Breast Tomosynthesis']
for (i = 0; i < 100; i++) {
  let uuid = faker.random.uuid()
  let patientUuid = faker.random.arrayElement(patientUuids)
  let description = faker.random.arrayElement(descriptions)

  console.log(`('${uuid}', '${patientUuid}','${description}'),`)
}
