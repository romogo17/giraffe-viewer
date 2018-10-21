const format = require('date-fns/format')
const faker = require('faker')

/**
 * Patient Fake Data
 */
// for (i = 0; i < 100; i++) {
//   let name = faker.name.firstName()
//   let last = faker.name.lastName()
//   let email = faker.internet.email()
//   let region = faker.fake(
//     '{"country": "{{address.country}}", "state": "{{address.state}}", "city": "{{address.city}}"}'
//   )
//   let sex = faker.random.arrayElement([0, 1, 2, 9])
//   let date = format(faker.date.past(40, '2000-01-01'), 'YYYY-MM-DD')

//   console.log(`('${name}','${last}','${email}','${region}',${sex},'${date}'),`)
// }

/**
 * Study Fake Data
 *
 * First we need the Patient uuids to generate the mock data
 *
 *      \copy (select uuid from med_img.patient) To '~/Desktop/test.csv' With CSV;
 *      awk '{print "\047"$1"\047"}' < ~/Desktop/test.csv | paste -s -d, -
 */
// const patientUuids = [
//   'd5c717ee-6202-4889-a042-059ecf649c5a',
//   '13909736-3b71-443a-9dc5-64ce885653e3',
//   '2bd753c4-c3b5-4240-88ca-75b9f8f54400',
//   '5bec589c-24a8-4b24-ace4-a19b89ab35b0',
//   '46574dcb-5a11-4645-afe4-71021a9f8f91',
//   '17cd3a1d-9e0e-448f-8237-7057abfe1296',
//   '9f6e650e-b632-4827-977f-b15c4603653a',
//   '99c3ee4a-0337-4bdc-8ffc-88fb64ec5d51',
//   '9c4d3460-95c0-4bb2-a1b2-303e9e67c4b3',
//   'c495edc7-80de-41f8-b131-4ad85687e01f',
//   '4a98c9f5-a66d-4a44-a723-9fe058a9403a',
//   'f9a5c635-8eee-4a09-93b4-944294cbe94f',
//   '003a40b6-d2d4-406a-b634-1001403647c2',
//   'e457a656-d04d-470f-b817-cb9c7c18f4f0',
//   '365959d9-af81-4c3a-a3d6-d8d49915bd46',
//   'd536a846-b48c-4999-991c-0e95b4f0897c',
//   'a51c1640-00af-4457-ac49-5b0c40da5afe',
//   'dbaf3b6b-9bcc-4359-ac73-fc6118100449',
//   '4fe033b0-5e1f-4b0d-b17e-0ebf6760e94b',
//   'b4ced52d-1a9f-4bae-96ad-5dd3f3f7cc1e',
//   '338ebed1-fd58-4ff0-80e3-7ffb9ede3897',
//   '89f47dd7-aa36-4757-bacb-6109efa1f408',
//   '21199d18-368c-4982-84ec-29d1de674fda',
//   '6d40beeb-1df9-4ee9-8908-a0b50248c916',
//   'a655c579-e798-45dd-b428-8ecabab31a27',
//   '7696faea-fbdf-4c64-9d04-56ceadf9c58b',
//   'f0ab8c0f-e021-4419-ac26-b9c588b6d0fe',
//   'dcb4ee98-7edb-49cd-bdec-30d0fbf772f6',
//   '1f8a8b1a-2431-49ba-bfdd-bfd49b2ebeb4',
//   '4fd1f6be-f1ff-4f69-b666-14da1c38d6d0',
//   '23b2f129-984c-4c7c-a1d0-f001512af16e',
//   '67e1bd25-47a7-4f94-8413-78ace61c381b',
//   'edc6e456-88d9-4813-a490-fe6b06f6eb41',
//   '9c467422-de6e-4c5a-82e8-f15505d88f3b',
//   '84e7b88b-acbb-4214-9256-838d46021e27',
//   '9b6d9ef8-c559-44a2-a17f-0b835833fccb',
//   '6c373bd6-1a74-46ed-89d2-bcddb53021d8',
//   'ce4189b0-5e13-4167-bd6b-60c1a8e6b7c8',
//   'ec1fe286-ef8f-4229-a9d6-589d7e9be356',
//   '6a84cc5a-d9d6-4d3d-a431-65e183685b81',
//   'f6c3b70e-589e-4fd6-902e-3aeb90dab36e',
//   'b2e41ee1-b587-43cd-94fe-7a6a2d510e62',
//   '1e16debf-af73-419e-8ec5-4f82bb3a1b7b',
//   '0df7e3f6-f598-40fa-b99f-5d16e2a5e0a1',
//   '6b75b588-e561-4f70-a2f6-1ff4fe97b3b7',
//   '32a4a052-303d-44a2-ab28-15a72e50932f',
//   '33d75a33-99dd-4f1f-8295-5c4dac9faa8a',
//   '82a20638-8bdd-4c0d-b931-4917861ceda0',
//   'b8f0d05c-ddbc-458a-8f28-0df48febcc68',
//   '7b1d80f3-8752-42b7-93d0-d0689fe0e9b9',
//   '7e7bebb1-1a3b-40d1-bf0c-9edfe245f01c',
//   'ddc5fcad-ed5e-4758-a120-2a2a4b8bc0ad',
//   '6271a59a-a1c8-4ca7-a9c7-d79e830b5a53',
//   'c0c899cc-9980-4c29-aae8-4cc8d04cb675',
//   'bdcb5e6b-e860-4f2c-be0d-725fae215726',
//   '471538a5-e97f-444e-a5b7-d8d52a88a706',
//   '5b57c551-ba00-40d9-8209-7249eeea4668',
//   '24a9a69f-20d7-4b1a-89a4-c944648f1a5c',
//   '6671cfa9-e9bd-4126-aaec-2a52bec46547',
//   'c9cdb367-5109-44a3-a1dc-bef43f2038e2',
//   'efd692b5-b65c-40d4-aea5-d8f9c711eed7',
//   '30be5480-b991-4606-afcb-a1ed578f07c0',
//   'f4b33592-371f-4f88-bdac-02da9ce88844',
//   'c83159e5-c844-4339-b738-8329ed48908a',
//   '521db97f-2141-4583-9866-1c7164d464bc',
//   '7041388a-07ea-484b-a639-48842b116d35',
//   '6e73e858-b339-46ff-b2dd-630a5b54f960',
//   '2722bc56-61d8-4cf0-8f31-bd92ab380b1b',
//   '2bc97eeb-1a65-4aab-a62b-ed615b79fb39',
//   'db7c1287-82f3-4846-8662-81ec8c1ada46',
//   'ef823f91-86ed-4c7c-9611-6b8298378bf8',
//   '4336bf04-064d-4973-92d8-73737818f276',
//   'c0c77d46-1374-4a42-98f7-10e154036911',
//   '5b107b23-161e-4ec0-aa97-b336343a374a',
//   '495d9ae3-1ec7-4f96-a82a-988e7bf49b7a',
//   'ce9d02c6-99dc-4f06-99dc-9d6771370610',
//   '9b9044e5-2ddd-4e58-b760-dc1fc920e29f',
//   'a74fb713-bfd8-4f75-9609-bfc250eea25d',
//   '08a36bfa-21db-4559-8798-4a18c62f07e0',
//   '4e8666c3-bf01-4784-b23b-30f35b93b52f',
//   '9cbef067-b74c-47af-8e35-1e17f727ce4f',
//   '34808c75-29f4-4aad-8b7a-a815bc991221',
//   'ced8c183-4b17-41b4-b259-42f2b705a7d8',
//   '951141b0-1f5c-4d3f-a68c-bfe0f2c2b236',
//   'ee4b3e6d-f929-4b09-bf46-a039a06cbd58',
//   'e598bb8b-3a22-47a6-96c2-01b838ac0c4a',
//   'eaf2763f-5ece-4db5-b696-b328b000c900',
//   '7ff8d89a-ca0e-45c0-9025-aa7738956e7f',
//   'e89770ff-b965-4de4-8415-22c45654a399',
//   'c46f2881-d237-43a6-8553-b5f0a96dd582',
//   '9429ffbd-7216-4e9d-a891-47e13f47f133',
//   '0c6639d7-1726-44cb-a996-2d168fa0d920',
//   'c7ee29fa-26fd-4c77-a243-944829d6fadf',
//   '4e014c88-8663-4adf-b263-2bb3a29f2ad0',
//   '4c2f0487-fd2c-4106-b90e-d46aa1b79c12',
//   'f46bd3c3-e0c1-468c-8c02-a658e994cd69',
//   '9fec65e6-6d43-4ae1-8c5d-3990890aa8c2',
//   '658b3d77-f5c7-4fa3-a527-80d3ebfd8d5c',
//   '6307eaac-706b-49b4-97d8-9c06f895c281',
//   '1f28dc19-e6ec-47e7-b972-0b1cdd412db6',
//   '2ceeaeaa-3b53-45db-85a5-bb4e8419a6f4',
//   'edd907b9-086b-4709-827c-bcae7857b0f1',
//   '2996f73b-f663-402b-a8b3-79021f04b4db',
//   '64157b58-0f8f-4025-9ee0-fd4906861f06'
// ]
// const descriptions = ['Digital Mammogram', 'Breast Tomosynthesis']
// for (i = 0; i < 100; i++) {
//   let uuid = faker.random.uuid()
//   let patientUuid = faker.random.arrayElement(patientUuids)
//   let description = faker.random.arrayElement(descriptions)

//   console.log(`('${uuid}', '${patientUuid}','${description}'),`)
// }

/**
 * Series Fake Data
 *
 * First we need the Studies uuids to generate the mock data
 *
 *      \copy (select uuid from med_img.study) To '~/Desktop/test.csv' With CSV;
 *      awk '{print "\047"$1"\047"}' < ~/Desktop/test.csv | paste -s -d, -
 */
// const studyUuids = [
//   'a8e03b9a-3dc6-4c89-af16-4e7d659c724a',
//   '9fd67171-b5e0-4165-a2a2-348d0a21b0e3',
//   'e2f0705e-baf8-4236-9780-ea00912bf714',
//   'edd8c227-bc3b-4f74-9ce9-95df33e3ab65',
//   'a6cd32c8-84b0-4488-bd3b-2fd6aba6685c',
//   'b4f3b263-5965-4dd2-8d0d-31bde489377b',
//   '43825585-e948-43da-ad3a-b4ba04131f87',
//   'b8261eac-21ca-4576-8dee-d8c2cc43a45b',
//   '8560ea11-f015-47f6-9ec5-940d96e26a82',
//   '124acb82-4d50-423d-bc04-823398bb47c1',
//   'a7829662-0b36-4bec-8749-e1d668e1a3a3',
//   '794748fc-8c3f-4219-abc8-53778c233905',
//   '798c2a1d-0806-4abd-b783-cdefd58912c3',
//   '5bd05aa1-6853-4400-ada5-f6867a258153',
//   '99d130a5-384b-46c3-b8c1-9c213e6d64b4',
//   '0d54eddb-9473-46b7-a7d2-f1e67fb0d4bb',
//   'fbecbb8c-d080-4411-b939-a83e7da93a0c',
//   '610240e0-f268-4828-a53c-11e901bf749b',
//   '3b0721af-06aa-43f6-a8df-159f74e07ddb',
//   '4eeb0040-0f79-4573-a883-056619c3cb83',
//   '63a75de4-da6b-4481-aaeb-76d387eddcc8',
//   '1ac17716-0d8c-4828-81f0-da3c2de0fad4',
//   '6b02379c-0e66-45a4-9ef2-fdbf041d1332',
//   '5a7a9cc1-7ea5-420c-98ea-70dea6613cc2',
//   'd701cc4b-a230-49b1-bd3d-4177b3a9b60a',
//   '7fd2bb20-550b-4f11-a2c3-17b9e5b63dfb',
//   '8d055868-d894-4166-bd99-fbc6645c8228',
//   '687c0b48-0659-4aa6-8b65-82d1cc234160',
//   '0dc37545-413c-494b-96ef-8b82a55264c3',
//   '68d7ef4b-29ab-4cef-95de-d07294200e96',
//   'bfc1b176-73ed-440a-ab88-e096fcdfb31a',
//   'fec3c758-2aa7-4b19-a3fd-808d5ead4626',
//   '5fdb4a33-1a23-410e-a88e-a65e8e20a9a8',
//   'e6bac350-22b6-4f0d-b2d3-f6aa3b1a4c43',
//   'dbf56d93-4cc6-4ecd-b0ff-1f77e4e517e5',
//   'ae9d9808-1a84-44b8-93d4-617d3754caf9',
//   'a0694241-cdf4-45a0-9115-3cb967fad7ac',
//   '5a2f995b-3947-4d40-8bf4-898360cb6dbc',
//   '95d4ee85-d871-48dd-a7fc-fab6a4f71d59',
//   '435aa2d4-2103-43a3-ac1c-8669be03c9aa',
//   '0dca5333-fcba-43ba-8d38-e48de0bba8f1',
//   '28b1a6fe-d867-45db-be98-d31907e95fd1',
//   'b30c2dcd-58cd-4b88-a0e7-5ee96c4a314c',
//   '3f787427-a286-4f6a-99d7-8ad35ac9038a',
//   'ee54c28b-9a8f-4a44-b43a-3dc2398aa191',
//   '436ce2a1-71e1-4d0e-ba37-88c21913de83',
//   '1127331d-345a-4429-9a35-a1bb66a105ca',
//   '6368c4b9-5a7b-43ad-b1d4-2ad62c74ea2d',
//   '64eabf00-2752-4934-9da7-419b788573b2',
//   'c1b646e1-eae7-4f84-a7cf-888465385be0',
//   'a4f46bee-a1e1-4903-897a-35311b2ca5f7',
//   '9b20660e-e6f2-4296-88a9-e22969ed08b1',
//   '2c99e100-f4f3-49d6-8b04-87cf32045a75',
//   '92689ad5-4955-407c-b321-44042f65c39a',
//   'de9d5cfc-e568-4521-bfa1-0194501c076d',
//   '663ed422-a9cd-4cec-b3c5-369a64d653b9',
//   '970038f0-4188-49bb-94d0-1b89ebfda049',
//   '53ddcc4d-48c4-4165-9a4d-df5b04ee9829',
//   '082e7666-7ec7-47bb-b9f4-205de590ad94',
//   '2f6193d7-bcaa-4213-8fbc-b71b760d0251',
//   '30a244ab-dea9-4ce5-a2a0-4194095c129e',
//   '2aa19c87-b274-4485-8fbc-cfb9b776c498',
//   '67a3e540-6699-4a16-85fc-38bef8cce87a',
//   '8f017aa1-1c3c-413f-955c-ae5d6171c4c6',
//   '8a6738b5-9ed1-4174-97e5-56706321a551',
//   'c3d2322a-5c20-41a2-953f-ae22007fa6e8',
//   '9aeecdeb-abc5-44d5-ad0f-0b02a7581612',
//   '12b3efd4-a5c8-4c17-b8c2-9f5d99c49b5c',
//   'd80fa961-3fc8-44a6-9dfb-3ef50f7b5c59',
//   'e343a504-bf37-4684-9e2a-ff4e8de362ed',
//   'b441ac38-5a74-4f22-b8c6-66a91f51cdca',
//   '37d8af51-e874-44ad-981a-cb06fe815dbe',
//   '40363e8f-5439-4639-90f0-9a7a10d8aeb6',
//   '532550f2-1c6f-4e31-a26d-b95d936062b4',
//   'c6235e27-a483-447e-83f0-858831941fd4',
//   '3f5ff26d-f4ba-4d8e-9634-d81d7bc6f999',
//   'b33a008d-49bb-4cf1-9eaa-b64d9b70535d',
//   'efcda118-a22a-4ce0-9439-a0084b562eae',
//   '1242a8a9-c139-445b-ac05-eb2f50cd4ae7',
//   'fb5fc3b6-84b8-4014-9a7b-c09516df667d',
//   'c584d017-bcf5-457b-8359-17d6c0d05462',
//   '4407027f-e6f7-42f2-8af7-64c16a139a6f',
//   'ed185143-44f4-42ff-ac36-ee937a6ac5b4',
//   'b39cbe31-c91b-4d9e-a875-2e00d6e4c5df',
//   '60ff9bbb-3128-43af-a320-edd070f6aee7',
//   '52166b30-4638-484c-a6b8-a0de4f371e96',
//   '02e24e57-a813-4a9b-90e8-550d8e7de5fc',
//   'ee83627d-55a7-48d4-8920-9b8534384932',
//   'fc02d7e8-c929-4481-bfa3-275c9bef9691',
//   '695448d9-2247-454b-bf06-0c6f2528d600',
//   '7fbb3418-1c6f-484f-be57-1b6814d8008a',
//   'd3646adf-f5ff-4084-b17e-b9f5e9d83355',
//   'd1e52dbf-8e01-42d0-8d47-1e4ad1733389',
//   '0085757a-2ad7-4ddf-b55c-050c941a3c94',
//   '190acd55-f756-4506-8a43-70a93967fbbd',
//   '755dd7ac-aeb7-472d-897b-f6944af224c9',
//   '6c28ef68-2342-4c6f-9ae9-40ce6c36d2a8',
//   'ad950141-9041-4ccb-b4a7-22472dd5ce18',
//   'e39b2cc7-5373-4441-8289-b9d2188c99c3',
//   '3a9e2a7b-53d1-4be7-97a9-1d4d1291cd2b',
//   'c49caafc-8854-4801-93a4-872ec338647e',
//   '2a29cc4f-281b-45fa-aa0a-8cfd9b6dbbce',
//   '097282e7-d7ce-4cde-95ba-f3e673fa54db'
// ]
// const descriptions = ['MLO projections', 'ML projections', 'CC projections']
// for (i = 0; i < 100; i++) {
//   let uuid = faker.random.uuid()
//   let studyUuid = faker.random.arrayElement(studyUuids)
//   let laterality = faker.random.arrayElement(['L', 'R'])
//   let description = faker.random.arrayElement(descriptions)

//   console.log(
//     `('${uuid}', '${studyUuid}','${laterality}', '${description}', 'BREAST'),`
//   )
// }

/**
 * Instance Fake Data
 *
 * First we need the Series uuids to generate the mock data
 *
 *      \copy (select uuid from med_img.series) To '~/Desktop/test.csv' With CSV;
 *      awk '{print "\047"$1"\047"}' < ~/Desktop/test.csv | paste -s -d, -
 */
// const seriesUuids = [
//   '086c8575-49b8-47b4-82e5-4203a5064835',
//   '873a975d-4a78-46b6-9516-9ab2be9445c2',
//   'eff819f4-682e-465c-9e25-6051b0c7563b',
//   '6a064c83-4245-42cc-bc51-189f991ed44f',
//   '731e98bc-9143-4c70-8214-f242cf0bf30f',
//   'aaf49f28-5bcd-4aa5-becd-4562901d639f',
//   '8d8f5152-f1db-4d80-822c-1ada85f5aee7',
//   '7bd8058a-cb06-433f-8d02-59b75b731d86',
//   '514e09c1-4fad-406e-ae73-d2e824f02d9d',
//   '933ecf20-67f9-48b3-8760-11fa0356d36d',
//   'c23e7e16-41b5-4939-8bba-bebe036e916e',
//   'e7c3fdfe-1f74-4334-a771-6f7ab102f623',
//   '3b4f343f-0178-4d8d-9644-5f7646e736aa',
//   'b6cc05fa-064c-4c58-8424-ce46d0573816',
//   '9a2baf63-99f6-4d39-86b1-936e1dbea24a',
//   'd3b51d98-e910-4c41-b3ed-8d581e8d3512',
//   'bad268f0-2045-49f6-babe-bbb48f3bceac',
//   '3e1e21a3-aeba-4b57-9018-7ee722cfff40',
//   '0660c2a0-db83-4797-8765-12fcc117384d',
//   '4ca3e92f-ea08-4bda-b329-e86d19c10321',
//   'd2032c30-5c1c-4de0-b8ef-4f015b9f3ff2',
//   '46d6f81d-34cf-4cf7-9e88-c851bb080241',
//   'a92a358d-94db-4d4a-8ec8-1febe5f96d79',
//   'ed72be56-01bf-47e4-a418-62493c96b2ac',
//   'eab86f02-7b1c-4ac7-ae02-d19dd107b031',
//   '07219931-97ba-4b38-b3c0-e5ed616de79b',
//   '69b09f4a-e982-42b0-9d89-b4aea9d92358',
//   'd94b3cba-8d86-457d-8514-9f01501cce72',
//   'a313fe0b-01a0-4e92-9e35-5037bf6211ea',
//   '91da3aa7-50bf-459a-8cb1-108562f4aa79',
//   'aa1505e5-576f-4d9d-86b8-ae39c370e56b',
//   'c3f6a6e2-3ed1-4c6a-bfc0-d8e6af485c70',
//   '32c3df03-41f9-4844-b18d-1682df7e2984',
//   '95fdc0f3-7b15-4fc1-921a-2d8cb41f1eaf',
//   '02895b0c-8c37-450e-92dc-bf8ab63d0cfd',
//   '8b0916bb-a0a3-49e9-bb4b-ae63032ae510',
//   '183bff6f-e93b-44e5-a3e1-c359893b2ba6',
//   '00928ad4-f70e-423c-bdbc-433c61dc5243',
//   'cc062cce-8310-4232-af56-114a7c435f9f',
//   'c5f369fb-5639-4035-8229-f80d11a4dfcd',
//   'ffdd3379-bf70-4bf1-9a55-9cbdf3741c1f',
//   '066f9ac6-7aa0-4546-b1d4-6cbb71e7adbc',
//   '4e20ca7c-cc0e-4a20-816c-2c881eed1075',
//   '7c20978f-b193-4033-8363-2c1c71460ca4',
//   'd36125da-e921-4473-b282-c64e8eed13ff',
//   'fb246310-317a-4ee9-a8ea-1c772eabcbde',
//   'bd79fe90-d363-4fc6-842c-b8db0d342142',
//   '7ca2828e-5ffa-4bbd-b21b-f7409c240e41',
//   'c0de4864-4d92-4beb-8384-cf89ed084ee5',
//   '4eee9a45-da62-4eaa-8536-1d823f677a4b',
//   '8a3e99de-9e98-4add-bf8c-b4d259f6499b',
//   '6e499da5-38b8-414a-a789-7b123acdf8e7',
//   '156dfaa7-aabf-4092-a0cf-b39e9272cda9',
//   '3aa743e3-d4ea-4e68-aa08-6752a52ebcb7',
//   'fa54f83f-c4e9-4348-bf8f-f5bebf92d6c1',
//   'e23b9bfc-7d73-463d-95c0-12d60e4a0034',
//   '4a3528b1-c8d2-4436-a536-a62c3649f8ac',
//   'b29a05db-bf87-4c6d-aec6-dc06d3aa6828',
//   'e26d100d-a409-41e4-8eee-c1b2c21ca372',
//   'cabd5f07-a971-4d69-9b7e-1d8d2f5ea8f0',
//   '2c2e79a2-3688-480b-a6cd-a21e7b51e557',
//   '0b0417e3-b595-4a2a-8627-ebf1933a918a',
//   '6d147c5a-160a-4ca4-9f81-fd8fce58af90',
//   'df69bee3-9bad-44a4-9499-045b428a8dc7',
//   '409c458d-c068-463c-bcf9-dbe88895e06a',
//   '002a6635-1b55-4b99-921e-a410ffb94b9c',
//   'a1a5cc4c-73f3-443c-a018-5c5c2b47a61d',
//   '45d44dcd-1d98-48c2-97d2-41a1f27770bb',
//   '0b5c5ca6-29d6-43a1-a040-159f5cf37f1c',
//   'f2e00cfc-9ed9-4257-a6ce-d61fdbd7cea9',
//   'bf58ac9d-b7b3-47db-9694-0cabf48c73d8',
//   'ac0612d9-0676-4fc8-9f85-098b1b6cd2d6',
//   '4bbae5ec-674b-4361-9ff0-61b8412241bb',
//   'f2211ba8-0043-4703-8f27-dfdbe1d9a0bb',
//   '3bf2c4fd-4b15-43d9-b97d-25870d3e1adb',
//   '06bf553e-149a-4d3c-a0c9-4b444c136e2c',
//   'd2ef13ef-438b-4e6b-9083-01d3b56eaa9b',
//   '1fe311ce-b791-4515-a0ed-70e11543266f',
//   'f0402379-c91e-4f84-a920-c16f16cd152b',
//   'c057bdce-ec4a-4153-bdfe-2e6d4efa4a81',
//   'fed91e3b-67fa-4be1-a981-4da40f8d43f5',
//   'f7874a6d-e1fb-4ab5-b948-b88fe602416c',
//   'd05bf8ec-6eca-4eea-99b0-7595156b8709',
//   '6978d320-2976-46fd-8eaf-4a7becf94b63',
//   '435685b2-0e71-43c7-b2e5-7a013d8d81f1',
//   'b5a25fc4-3d27-407f-bfcc-3b484332aedd',
//   '04d50767-d52a-4bcd-9f4a-a9b5cf2c1f07',
//   '882e5139-9899-4fca-9cc8-e59b1510b5a5',
//   'bea064ac-e303-41a3-970f-289c30e73684',
//   'aafc83e0-8fa2-4172-947a-29ced64fcfc1',
//   'bdca5cd7-076f-4608-81ba-6def0a4ab94a',
//   '95825a35-934d-4fff-b8f7-1f9086b103a9',
//   'aa1c6de4-44de-4b35-b16e-96e4a6f93c13',
//   'b8e855bc-726e-432f-8722-3324d7938c36',
//   '73f00da3-8305-4aa8-8b61-212c6c24836d',
//   '6a33d90c-7024-4572-ad59-2b1fdf471c8d',
//   'bf8d12b8-3885-4281-93b4-752040fdd041',
//   '84c10740-64b5-4cdb-9246-75417a6ae2e2',
//   '3d77bd95-e708-4227-9d23-37db5c3eafd9',
//   '7574620d-4a7b-40ef-95bb-ccdb3fa10b89',
//   '5d74f3a1-6c62-492e-ac55-c9ab6309f16b',
//   'ea56b117-7f49-43a0-bf30-769236f2e6b4',
//   'e69ac839-29af-4333-b257-4c342d9a8e40'
// ]
// const filenames = [
//   'mdb024.pgm',
//   'mdb134.pgm',
//   'mdb219.pgm',
//   'mdb227.pgm',
//   'mdb267.pgm',
//   'mdb028.pgm',
//   'mdb155.pgm',
//   'mdb222.pgm',
//   'mdb231.pgm'
// ]
// const path =
//   '/Users/ro/U/[ Asistencia ] - Proyecto de Investigacion/Source_Images/'
// for (i = 0; i < 50; i++) {
//   let uuid = faker.random.uuid()
//   let seriesUuid = faker.random.arrayElement(seriesUuids)
//   let imagePath = path + faker.random.arrayElement(filenames)

//   console.log(
//     `('${uuid}', '${seriesUuid}', pgcv_io.image_read('${imagePath}')),`
//   )
// }
