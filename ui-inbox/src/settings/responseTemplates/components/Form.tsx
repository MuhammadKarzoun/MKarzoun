import { IButtonMutateProps, IFormProps } from "@octobots/ui/src/types";

import CommonForm from "@octobots/ui-settings/src/common/components/Form";
import ControlLabel from "@octobots/ui/src/components/form/Label";
import FormControl from "@octobots/ui/src/components/form/Control";
import FormGroup from "@octobots/ui/src/components/form/Group";
import { ICommonFormProps } from "@octobots/ui-settings/src/common/types";
import { IResponseTemplate } from "../types";
import React from "react";
import { RichTextEditor } from "@octobots/ui/src/components/richTextEditor/TEditor";
import SelectBrand from "@octobots/ui-inbox/src/settings/integrations/containers/SelectBrand";

type Props = {
  object?: IResponseTemplate;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
};

type State = {
  content: string;
};

class Form extends React.Component<Props & ICommonFormProps, State> {
  constructor(props) {
    super(props);

    const object = props.object || {};

    this.state = {
      content: object.content || "",
    };
  }

  onChange = (value: string) => {
    this.setState({ content: value });
  };

  generateDoc = (values: { _id?: string; name: string; brandId: string }) => {
    const { object } = this.props;
    const finalValues = values;

    if (object) {
      finalValues._id = object._id;
    }

    return {
      _id: finalValues._id,
      brandId: finalValues.brandId,
      name: finalValues.name,
      content: this.state.content,
    };
  };

  renderContent = (formProps: IFormProps) => {
    const object = this.props.object || ({} as IResponseTemplate);

    return (
      <>
        <FormGroup>
          <SelectBrand
            formProps={formProps}
            isRequired={true}
            defaultValue={object.brandId}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Name</ControlLabel>
          <FormControl
            {...formProps}
            name="name"
            defaultValue={object.name}
            required={true}
            autoFocus={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Content</ControlLabel>
          <RichTextEditor
            content={this.state.content}
            onChange={this.onChange}
            height={300}
            isSubmitted={formProps.isSaved}
            name={`responseTemplates_${object._id || "create"}`}
          />
        </FormGroup>
      </>
    );
  };

  render() {
    return (
      <CommonForm
        {...this.props}
        name="response template"
        renderContent={this.renderContent}
        generateDoc={this.generateDoc}
        object={this.props.object}
      />
    );
  }
}

export default Form;
