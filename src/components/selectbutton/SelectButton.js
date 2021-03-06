import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class SelectButton extends Component {

    static defaultProps = {
        id: null,
        activeIndex: null,
        options: null,
        tabindex: null,
        multiple: null,
        disabled: null,
        style: null,
        className: null,
        onChange: null
    };

    static propTypes = {
        id: PropTypes.string,
        activeIndex: PropTypes.any,
        options: PropTypes.array,
        tabindex: PropTypes.number,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        style: PropTypes.object,
        className: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.onItemClick = this.onItemClick.bind(this);
    }

    onItemClick(e, option, i) {
        var selected = this.isSelected(i);

        if (this.props.multiple) {
            var indexes = this.state.activeIndex||[];
            if(selected)
                indexes = indexes.filter(index => index !== i);
            else
                indexes.push(i);

            this.setState({activeIndex: indexes});
        }
        else {
            if(selected)
                this.setState({activeIndex: null});
            else
                this.setState({activeIndex: i});
        }
        
        if(this.props.onChange) {
            this.props.onChange({
                originalEvent: event,
                value: option.value,
                index: i
            });
            event.preventDefault();
        }
    }

    isSelected(i) {
        return this.props.multiple ? this.state.activeIndex && this.state.activeIndex.includes(i) : this.state.activeIndex === i;
    }

    render() {
        var className = classNames('ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-3', this.props.className);

        return (
            <div id={this.props.id}>
                <div className={className} style={this.props.style}>
                    {this.props.options.map((option, index) => {
                        var selected = this.isSelected(index);
                        var innerStyleClass = classNames('ui-button ui-widget ui-state-default ui-button-text-only', {
                            'ui-state-active': selected,
                            'ui-state-disabled': this.props.disabled
                        });
                        var buttonset = <div className={innerStyleClass} key={option.label} onClick={() => this.onItemClick(event, option, index)}>
                            <span className="ui-button-text ui-c">{option.label}</span>
                        </div>;
                        return buttonset;
                    })}
                </div>
            </div>
        );
    }
}