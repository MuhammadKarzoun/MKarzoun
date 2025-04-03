import messageFields from './messageFields';

const conversationChanged = `
  subscription conversationChanged($_id: String!) {
    conversationChanged(_id: $_id) {
      type
    }
  }
`;

const conversationMessageStatusChanged = `
  subscription conversationMessageStatusChanged($_id: String!) {
    conversationMessageStatusChanged(_id: $_id) {
      ${messageFields}
    }
  }
`;

const conversationMessageInserted = `
  subscription conversationMessageInserted($_id: String!) {
    conversationMessageInserted(_id: $_id) {
      ${messageFields}
    }
  }
`;

const conversationClientMessageInserted = `
  subscription conversationClientMessageInserted($userId: String!) {
    conversationClientMessageInserted(userId: $userId) {
      _id
      content
    }
  }
`;

const conversationClientTypingStatusChanged = `
  subscription conversationClientTypingStatusChanged($_id: String!) {
    conversationClientTypingStatusChanged(_id: $_id) {
      text
    }
  }
`;

const conversationExternalIntegrationMessageInserted = `
  subscription conversationExternalIntegrationMessageInserted {
    conversationExternalIntegrationMessageInserted
  }
`;

const customerConnectionChanged = `
  subscription customerConnectionChanged ($_id: String!) {
    customerConnectionChanged (_id: $_id) {
      _id
      status
    }
  }
`;

export default {
  conversationChanged,
  conversationMessageStatusChanged,
  conversationMessageInserted,
  conversationClientMessageInserted,
  conversationClientTypingStatusChanged,
  conversationExternalIntegrationMessageInserted,
  customerConnectionChanged,
};
