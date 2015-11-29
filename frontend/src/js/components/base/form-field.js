import ReactDOM from 'react-dom';
import React from 'react';
import cx from 'classnames';
import assign from 'object-assign';

import humanize from 'utils/humanize';

class FormField extends React.Component {
    focus() {
        if(this.refs && this.refs.field){
            ReactDOM.findDOMNode(this.refs.field).focus();
        }
    }

    render() {
        var props = assign({}, this.props);

        switch(props.type){
        case 'hidden':
            return <input type="hidden" name={props.name} value={props.value} />;
        case 'number':
        case 'text':
        case 'tel':
        case 'email':
        case 'date':
            var type = props.type === 'number'? 'text' : props.type;
            return (
                    <div className="form-group">
                        <label className="control-label">
                            {humanize(props.label)}
                        </label>
                        <div className="controls">
                            <input ref="field" className="form-control" {...props} type={type} />
                        </div>
                    </div>);
        case 'checkbox':
            return (
                    <div className="checkbox form-group">
                        <label className="control-label">
                            <input ref="field" {...props} /> {props.label || humanize(props.name)}
                        </label>
                    </div>);
        case 'select':
            var options = props.field.options.map(function(option){
                return (
                        <option key={props.name+'-option-'+option[1]} value={option[1].toString()}>
                            {option[0]}
                        </option>);
            }.bind(this));

            var sizes;
            if(props.size){
                sizes = props.size;
            }else{
                var sizeSet = {};
                sizeSet[0] = options.size > 5;
                sizeSet[options.size] = options.size <= 5;
                sizes = cx(sizeSet);
                if(sizes == 1) sizes = null;
            }

            return (
                    <div className="form-group">
                        <label className="control-label">
                            {humanize(props.label)}
                        </label>
                        { options.size == 0 ? <div>No option</div>
                        : <select ref="field" {...props}
                            className="form-control" size={sizes}>
                                {options}
                        </select>}
                    </div>
                    );
        default:
            throw new Error(props.label+'/'+props.type+' not found');
        }

    }
}

module.exports = FormField;
