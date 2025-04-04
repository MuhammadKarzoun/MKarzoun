import { gql } from '@apollo/client';
import * as compose from 'lodash.flowright';
import { withProps } from '@octobots/ui/src/utils';
import PopoverContent from '../../../components/conversationDetail/workarea/responseTemplate/PopoverContent';
import { IBrand } from '@octobots/ui/src/brands/types';
import { queries as responseTemplateQuery } from '../../../../settings/responseTemplates/graphql';
import {
  IResponseTemplate,
  ResponseTemplatesQueryResponse,
} from '../../../../settings/responseTemplates/types';
import { ResponseTemplatesTotalCountQueryResponse } from '@octobots/ui-inbox/src/inbox/types';
import React from 'react';
import { graphql } from '@apollo/client/react/hoc';

import { AppConsumer } from 'coreui/appContext';

type Props = {
  onSelect: (responseTemplate?: IResponseTemplate) => void;
  brands: IBrand[];
  brandId?: string;
  searchValue?: string;
  onSelectTemplate: () => void;
};

type FinalProps = {
  search: (name: string, value: string) => void;
  responseTemplatesQuery: ResponseTemplatesQueryResponse;
  responseTemplatesTotalCountQuery: ResponseTemplatesTotalCountQueryResponse;
} & Props;

const PopoverContentContainer = (props: FinalProps) => {
  const {
    brands,
    search,
    responseTemplatesQuery,
    responseTemplatesTotalCountQuery,
  } = props;
  if (
    responseTemplatesQuery.loading ||
    responseTemplatesTotalCountQuery.loading
  ) {
    return null;
  }

  const onSearchChange = (name: string, value: string) => {
    search(name, value);
  };

  const responseTemplates = responseTemplatesQuery.responseTemplates;
  const count = responseTemplatesTotalCountQuery.responseTemplatesTotalCount;
  const hasMore = count > responseTemplates.length;
  const refetchResponseTemplates = (content, brandId, page, perPage) => {
    responseTemplatesQuery.refetch({
      searchValue: content,
      brandId: brandId,
      page: page,
      perPage: perPage,
    });
  };
  const updatedProps = {
    ...props,
    onSearchChange,
    brands,
    hasMore,
    responseTemplates: responseTemplatesQuery.responseTemplates,
    refetchResponseTemplates,
  };

  return <PopoverContent {...updatedProps} />;
};

const withQuery = () =>
  withProps<Props & { searchValue: string; brandId: string }>(
    compose(
      graphql<Props & { searchValue: string }, ResponseTemplatesQueryResponse>(
        gql(responseTemplateQuery.responseTemplates),
        {
          name: 'responseTemplatesQueryAll',
        },
      ),
      graphql(gql(responseTemplateQuery.responseTemplatesTotalCount), {
        name: 'responseTemplatesTotalCountQuery',
      }),
    )(PopoverContentContainer),
  );

type WrapperState = {
  searchValue: string;
  brandId: string;
};

class Wrapper extends React.Component<Props, WrapperState> {
  private withQuery;

  constructor(props) {
    super(props);

    this.withQuery = withQuery();

    this.state = { searchValue: '', brandId: props.brandId };
  }

  search = <T extends keyof WrapperState>(name: T, value: WrapperState[T]) => {
    this.setState({ [name]: value } as unknown as Pick<
      WrapperState,
      keyof WrapperState
    >);
  };

  render() {
    const { searchValue, brandId } = this.state;

    const Component = this.withQuery;

    return (
      <AppConsumer>
        {() => (
          <Component
            {...this.props}
            search={this.search}
            searchValue={searchValue}
            brandId={brandId}
          />
        )}
      </AppConsumer>
    );
  }
}

export default Wrapper;
