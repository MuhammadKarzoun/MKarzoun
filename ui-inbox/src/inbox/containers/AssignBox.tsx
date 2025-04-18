import * as compose from "lodash.flowright";

import { Alert, withProps } from "@octobots/ui/src/utils";
import {
  AssignMutationResponse,
  AssignMutationVariables,
  IConversation,
  UnAssignMutationResponse,
  UnAssignMutationVariables,
} from "@octobots/ui-inbox/src/inbox/types";

import AssignBox from "../components/AssignBox";
import React from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { mutations } from "@octobots/ui-inbox/src/inbox/graphql";
import { refetchSidebarConversationsOptions } from "@octobots/ui-inbox/src/inbox/utils";

type Props = {
  targets: IConversation[];
  event: string;
  afterSave: () => void;
};

type FinalProps = Props & AssignMutationResponse & UnAssignMutationResponse;

const AssignBoxContainer = (props: FinalProps) => {
  const { assignMutation, conversationsUnassign } = props;

  const assign = (
    {
      conversationIds,
      assignedUserId,
    }: { conversationIds?: string[]; assignedUserId: string },
    callback: (e) => void
  ) => {
    assignMutation({
      variables: {
        conversationIds,
        assignedUserId,
      },
    })
      .then(() => {
        Alert.success("The conversation Assignee has been renewed.");
      })
      .catch((e) => {
        callback(e);
        Alert.error(e.message);
      });
  };

  const clear = (conversationIds: string[]) => {
    conversationsUnassign({
      variables: {
        _ids: conversationIds,
      },
    })
      .then(() => {
        Alert.success("The conversation Assignee removed");
      })
      .catch((e) => {
        Alert.error(e.message);
      });
  };

  const updatedProps = {
    ...props,
    assign,
    clear,
  };

  return <AssignBox {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, AssignMutationResponse, AssignMutationVariables>(
      gql(mutations.conversationsAssign),
      {
        name: "assignMutation",
        options: () => refetchSidebarConversationsOptions(),
      }
    ),
    graphql<Props, UnAssignMutationResponse, UnAssignMutationVariables>(
      gql(mutations.conversationsUnassign),
      {
        name: "conversationsUnassign",
        options: () => refetchSidebarConversationsOptions(),
      }
    )
  )(AssignBoxContainer)
);
