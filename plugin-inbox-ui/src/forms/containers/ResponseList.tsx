import * as compose from "lodash.flowright";

import {
  FormSubmissionsQueryResponse,
  FormSubmissionsTotalCountQueryResponse,
} from "@octobots/ui-forms/src/forms/types";

import { FieldsQueryResponse } from "@octobots/ui-forms/src/settings/properties/types";
import { IntegrationDetailQueryResponse } from "@octobots/ui-inbox/src/settings/integrations/types";
import { LeadIntegrationDetailQueryResponse } from "@octobots/ui-inbox/src/settings/integrations/types";
import React from "react";
import ResponseList from "../components/ResponseList";
import { generatePaginationParams } from "@octobots/ui/src/utils/router";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { queries as integrationQueries } from "@octobots/ui-inbox/src/settings/integrations/graphql";
import { queries } from "@octobots/ui-forms/src/forms/graphql";
import { withProps } from "@octobots/ui/src/utils";

type Props = {
  queryParams: any;
};

type FinalProps = {
  integrationDetailQuery: LeadIntegrationDetailQueryResponse;
  formSubmissionsQuery: FormSubmissionsQueryResponse;
  fieldsQuery: FieldsQueryResponse;
  formSubmissionTotalCountQuery: FormSubmissionsTotalCountQueryResponse;
} & Props;

class ListContainer extends React.Component<FinalProps> {
  render() {
    const {
      integrationDetailQuery,
      formSubmissionsQuery,
      fieldsQuery,
      formSubmissionTotalCountQuery,
    } = this.props;

    const integrationDetail: any =
      integrationDetailQuery.integrationDetail || {};

    const formSubmissions = formSubmissionsQuery.formSubmissions || [];

    const fields = fieldsQuery.fields || [];

    const totalCount =
      formSubmissionTotalCountQuery.formSubmissionsTotalCount || 0;

    const updatedProps = {
      ...this.props,
      integrationDetail,
      formSubmissions,
      loading: integrationDetailQuery.loading,
      totalCount,
      fields,
    };

    return <ResponseList {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, IntegrationDetailQueryResponse>(
      gql(integrationQueries.integrationDetail),
      {
        name: "integrationDetailQuery",
        options: ({ queryParams }) => ({
          variables: {
            _id: queryParams.integrationId || "",
          },
          fetchPolicy: "network-only",
        }),
      }
    ),
    graphql<Props, FieldsQueryResponse>(gql(queries.fields), {
      name: "fieldsQuery",
      options: ({ queryParams }) => ({
        variables: {
          contentType: "form",
          contentTypeId: queryParams.formId,
        },
      }),
    }),
    graphql<Props, FormSubmissionsQueryResponse>(gql(queries.formSubmissions), {
      name: "formSubmissionsQuery",
      options: ({ queryParams }) => ({
        variables: {
          ...generatePaginationParams(queryParams),
          formId: queryParams.formId,
        },
        fetchPolicy: "network-only",
      }),
    }),
    graphql<Props, FormSubmissionsTotalCountQueryResponse>(
      gql(queries.formSubmissionTotalCount),
      {
        name: "formSubmissionTotalCountQuery",
        options: ({ queryParams }) => ({
          variables: {
            formId: queryParams.formId,
          },
        }),
      }
    )
  )(ListContainer)
);
