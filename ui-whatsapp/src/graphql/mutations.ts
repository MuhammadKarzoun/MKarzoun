const tempalteParams = `
    $name: String,
    $description: String,
    $content: String,
    $contentType: String,
    $categoryIds: [String]
`;

const templateVariables = `
    name: $name,
    description: $description,
    content: $content,
    contentType: $contentType,
    categoryIds: $categoryIds
`;


const SendTemplateMessageParams = `
    $integrationId: String!,
    $conversationId: String,
    $customerId: String,
    $recepient: String,
    $recepientName: String,
    $templateId: String,
    $templateName: String,
    $language: String,
    $params: JSON
    `;

const SendTemplateMessageVariables = `
    integrationId: $integrationId,
    conversationId: $conversationId,
    customerId: $customerId,
    recepient: $recepient,
    recepientName: $recepientName,
    templateId: $templateId,
    templateName: $templateName,
    language: $language,
    params: $params
    `;

const whatsappTemplateAdd = `
    mutation templateAdd(${tempalteParams}) {
        templateAdd(${templateVariables}) {
            _id
        }
    }
`;

const whatsappSendTemplateMessage = `
    mutation whatsappSendTemplateMessage(${SendTemplateMessageParams}) {
        whatsappSendTemplateMessage(${SendTemplateMessageVariables}) {
            _id
        }
    }
`;

export default {
    whatsappTemplateAdd,
    whatsappSendTemplateMessage
}