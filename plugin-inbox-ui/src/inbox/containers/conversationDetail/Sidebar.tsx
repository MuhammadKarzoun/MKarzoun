import * as compose from "lodash.flowright";

import {
  PropertyConsumer,
  PropertyProvider
} from "@octobots/ui-contacts/src/customers/propertyContext";

import { CustomerDetailQueryResponse } from "@octobots/ui-contacts/src/customers/types";
import DumbSidebar from "../../components/conversationDetail/sidebar/Sidebar";
import { IConversation } from "@octobots/ui-inbox/src/inbox/types";
import { ICustomer } from "@octobots/ui-contacts/src/customers/types";
import { IField } from "@octobots/ui/src/types";
import { IUser } from "@octobots/ui/src/auth/types";
import React from "react";
import client from "@octobots/ui/src/apolloClient";
import { getConfig } from "@octobots/ui-inbox/src/inbox/utils";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { queries } from "@octobots/ui-inbox/src/inbox/graphql";
import withCurrentUser from "@octobots/ui/src/auth/containers/withCurrentUser";
import { withProps } from "@octobots/ui/src/utils";

type Props = {
  conversation: IConversation;
  conversationFields?: IField[];
};

type FinalProps = {
  customerDetailQuery: CustomerDetailQueryResponse;
  currentUser: IUser;
} & Props;

type State = {
  customer: ICustomer;
  loading: boolean;
};

const STORAGE_KEY = `octobots_sidebar_section_config`;

class Sidebar extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      customer: {} as ICustomer,
      loading: true
    };
  }

  componentDidMount() {
    this.getCustomerDetail(this.props.conversation.customerId);
  }

  componentWillReceiveProps(nextProps) {
    const currentDetail = this.props.customerDetailQuery;
    const nextDetail = nextProps.customerDetailQuery;

    const current = currentDetail.customerDetail || {};
    const next = nextDetail.customerDetail || {};

    if (JSON.stringify(current) !== JSON.stringify(next)) {
      this.getCustomerDetail(next._id);
    }
  }

  mergeProperties = () => {
    const config = getConfig(STORAGE_KEY) || {};

    return Object.entries(config)?.reduce((result, [key, value]) => {
      const keys = key.replace(/[0-9]+$/, "");
      result[keys] = keys in result ? result[keys] || value : value;

      return result;
    }, {});
  };

  getCustomerDetail(customerId?: string) {
    if (!customerId) {
      return null;
    }

    this.setState({ loading: true });

    client
      .query({
        query: gql(queries.generateCustomerDetailQuery(this.mergeProperties())),
        fetchPolicy: "network-only",
        variables: { _id: customerId }
      })
      .then(({ data }: { data: any }) => {
        if (data && data.customerDetail) {
          this.setState({ customer: data.customerDetail, loading: false });
        }
      })
      .catch(error => {
        console.log(error.message); // tslint:disable-line
      });

    return;
  }

  toggleSection = (): void => {
    const customerId = this.props.conversation.customerId;

    this.getCustomerDetail(customerId);
  };

  render() {
    const { customer, loading } = this.state;

    const mergedProperties = this.mergeProperties();

    const taggerRefetchQueries = [
      {
        query: gql(queries.generateCustomerDetailQuery(mergedProperties)),
        variables: { _id: customer._id }
      }
    ];

    return (
      <PropertyProvider>
        <PropertyConsumer>
          {({
            deviceFields,
            customerFields,
            conversationFields,
            customerVisibility,
            deviceVisibility
          }) => {
            const updatedProps = {
              ...this.props,
              customer,
              loading,
              toggleSection: this.toggleSection,
              taggerRefetchQueries,
              conversationFields,
              deviceFields,
              customerFields,
              customerVisibility,
              deviceVisibility
            };

            return <DumbSidebar {...updatedProps} />;
          }}
        </PropertyConsumer>
      </PropertyProvider>
    );
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, CustomerDetailQueryResponse, { _id?: string }>(
      gql(queries.generateCustomerDetailQuery(getConfig(STORAGE_KEY))),
      {
        name: "customerDetailQuery",
        options: ({ conversation }) => ({
          variables: {
            _id: conversation.customerId
          }
        })
      }
    )
  )(withCurrentUser(Sidebar))
);
