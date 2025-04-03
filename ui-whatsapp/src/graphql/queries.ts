// 1. Define the parameters for the query
const whatsappTemplateParams = `
  $integrationId: String!,
  $template_id: String,
  $name: String,
  $skip: Int,
  $limit: Int
`;

// 2. Map those parameters into a variables object to pass into the query
const whatsappTemplateVariables = `
  integrationId: $integrationId,
  template_id: $template_id,
  name: $name,
  skip: $skip,
  limit: $limit
`;

// 3. Create the actual GraphQL query string
//    We assume the server returns a structure like:
//    {
//      "list": [
//        {
//          "_id": "...",
//          "name": "...",
//          "mappings": [
//            { "name": "HEADER_TEXT", "type": "text" },
//            { "name": "BODY_{{1}}",  "type": "text" },
//            ...
//          ]
//          // plus any other fields you need
//        }
//      ],
//      "totalCount": 10
//    }
const whatsappGetMessageTemplates = `
  query whatsappGetMessageTemplates(${whatsappTemplateParams}) {
    whatsappGetMessageTemplates(${whatsappTemplateVariables}) {
        name
        template_id
        language
        status
        category
        components
        mapping {
          name
          type
        }
        createdAt
        updatedAt
    }
  }
`;

const userFields = `
  _id
  username
  email
  details {
    avatar
    fullName
  }
`;

// Updated automation fields to use nodes instead of actions
export const automationFields = `
  _id
  ns
  name
  status
  nodes {
    _id
    ns
    type
    automationNs
    nextNodeNs
    style
    icon
    label
    description
  }
  startNodeNs
  integrationId
  createdAt
  updatedAt
  createdBy
  updatedBy
  createdUser {
    ${userFields}
  }
  updatedUser {
    ${userFields}
  }
`;

const AutomationslistParamsDef = `
  $page: Int
  $perPage: Int
  $searchValue: String
  $sortField: String
  $sortDirection: Int
  $status: String
  $tagIds: [String]
  $integrationId: String!
`;

const AutomationslistParamsValue = `
  page: $page
  perPage: $perPage
  searchValue: $searchValue
  sortField: $sortField
  sortDirection: $sortDirection
  status: $status
  tagIds: $tagIds
  integrationId: $integrationId
`;

const automations = `
  query automations(${AutomationslistParamsDef}) {
    automations(${AutomationslistParamsValue}) {
      ${automationFields}
    }
  }
`;

// 4. (Optional) If you have other WhatsApp template-related queries or
//    mutations, you can define them in a similar manner here.

// 5. Export all relevant queries in a single object
export default {
  whatsappGetMessageTemplates,
  automations
};
