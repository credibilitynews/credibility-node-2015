import ReactDOM from "react-dom";
import React from "react";

import humanize from "utils/humanize";
import assign from "object-assign";
import cx from "classnames";

import Autocomplete from "react-autocomplete";

class Typeahead extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOptionSelected = this.handleOptionSelected.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.searchRequest = null;

    this.state = {
      options: props.options,
      selectedOption: null,
      searching: false,
    };
  }

  componentDidMount() {
    this._selected = null;
    this._searchCallback = null;
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.searching &&
      nextProps.options &&
      nextProps.options.length > 0
    ) {
      this.setState({ options: nextProps.options });
    }
  }

  render() {
    const inputProps = {
      className: "autocomplete",
      placeholder: this.props.placeholder || "Search...",
      name: this.props.name,
      disabled: this.props.disabled,
    };

    return (
      <div className="typeahead">
        <Autocomplete
          ref="autocomplete"
          inputProps={inputProps}
          initialValue={this.props.defaultValue}
          onSelect={this.handleOptionSelected}
          onChange={this.handleInputChange}
          items={this.state.options || []}
          getItemValue={(item) => item.value}
          renderItem={this.renderOption}
        />
        {this.state.searching ? <span className="spinning" /> : <span />}
      </div>
    );
  }

  renderOption(item, isHighlighted) {
    return (
      <div
        className={
          isHighlighted ? "typeahead-option highlighted" : "typeahead-option"
        }
        key={item.id}
        id={item.id}
      >
        {item.label}
      </div>
    );
  }

  focus() {
    if (this.refs.autocomplete) {
      ReactDOM.findDOMNode(this.refs.autocomplete.refs.input).focus();
    }
  }

  getSelectedOption = () => {
    return this.state.selectedOption;
  };

  getValue = () => {
    return ReactDOM.findDOMNode(this.refs.autocomplete.refs.input).value;
  };

  handleInputChange(e, input) {
    if (this.searchRequest && this.searchRequest.abort)
      this.searchRequest.abort();

    if (input != null && input.length > 2) {
      this.searchRequest = this.props.fetchOptionsAction(
        input,
        (err, result) => {
          const options = result || [];
          this.setState({ options, searching: false });
        },
        this.props.name
      );
      this.setState({ searching: input });
    }

    if (this.props.onInputChange) {
      this.props.onInputChange({
        target: {
          name: this.props.name,
          value: input,
        },
      });
    }
  }

  handleOptionSelected(value, item) {
    // console.log(value, item);
    this.setState({ selectedOption: item });
    if (this.props.onChange) this.props.onChange(item);
  }
}

Typeahead.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  selected: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  options: React.PropTypes.array,
  onChange: React.PropTypes.func,
  onInputChange: React.PropTypes.func,

  fetchOptionsAction: React.PropTypes.func.isRequired,
};

Typeahead.TextField = class extends React.Component {
  getValue = () => {
    return this.refs.field.getValue();
  };

  render() {
    return (
      <div className="form-group">
        <label className="control-label">{humanize(this.props.label)}</label>
        <div className="controls">
          <Typeahead ref="field" {...this.props} />
        </div>
      </div>
    );
  }
};

Typeahead.SelectField = class extends React.Component {
  static propTypes = () => {
    return {
      getLabelById: React.PropTypes.func.isRequired,
    };
  };

  constructor(props, context) {
    super(props, context);
    this.getValue = this.getValue.bind(this);
    this.state = {
      value: this.props.defaultValue,
    };
  }

  getValue = () => {
    return this.state.value;
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.defaultValue &&
      this.props.defaultValue !== nextProps.defaultValue
    ) {
      this.setState({ value: this.props.defaultValue });
    }
  }

  render() {
    const { onChange } = this.props;
    const newOnChange = (e) => {
      this.setState({ value: e.target.value });
      onChange(e);
    };
    const onInputChange = (e) => {
      this.setState({ value: null });
    };
    const props = assign({}, this.props, {
      onChange: newOnChange,
      onInputChange,
      name: `_${this.props.name}`,
      defaultValue: this.props.getLabelById(this.state.value),
    });

    const classNames = cx({
      "input-group": this.props.button,
      controls: !this.props.button,
    });

    return (
      <div className="form-group" key={`form-group_${this.props.name}`}>
        <label className="control-label">{humanize(this.props.label)}</label>
        <div className={classNames}>
          <Typeahead ref="field" {...props} />
          {this.props.button ? (
            <span className="input-group-btn">{this.props.button}</span>
          ) : (
            ""
          )}
          <input
            type="hidden"
            name={this.props.name}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
};

export default Typeahead;
