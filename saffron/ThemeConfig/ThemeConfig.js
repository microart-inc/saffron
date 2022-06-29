import React from 'react';
import AppContext from '../../AppContext';

export default class ThemeConfig extends React.Component {

    static contextType = AppContext;

    render() {
        /*
 --accent-color: #4f77dc;
    --accent-color-dark: #394ec6;

    --button-text-color: gray;
    --button-primary-text-color: white;
    --button-hover-color: var(--accent-color);
    --button-primary-color: var(--accent-color);
    --button-primary-hover-color: #4151ab;

    --textinput-hover-color: var(--accent-color);

    --text-selection-color: var(--accent-color);
        */
        /*
        */
        let style = {};
        if (this.props.accentColor) style['--accent-color'] = this.props.accentColor;
        if (this.props.accentColorDark) style['--accent-color-dark'] = this.props.accentColorDark;
        if (this.props.buttonTextColor) style['--button-text-color'] = this.props.buttonTextColor;
        if (this.props.buttonPrimaryTextColor) style['--button-primary-text-color'] = this.props.buttonPrimaryTextColor;
        if (this.props.buttonHoverColor) style['--button-hover-color'] = this.props.buttonHoverColor;
        if (this.props.buttonPrimaryColor) style['--button-primary-color'] = this.props.buttonPrimaryColor;
        if (this.props.buttonPrimaryHoverColor) style['--button-primary-hover-color'] = this.props.buttonPrimaryHoverColor;
        if (this.props.textInputHoverColor) style['--textinput-hover-color'] = this.props.textInputHoverColor;
        if (this.props.textSelectionColor) style['--text-selection-color'] = this.props.textSelectionColor;
        if (this.props.textSelectionTextColor) style['--text-selection-text-color'] = this.props.textSelectionTextColor;
        style = {
            ...style,
            ...this.props.style,
        };
        if (this.context.isMobile) style = { ...style, ...this.props.mobile };
        return (
            <div
                style={style}
                className={this.props.className}
                ref={(ref) => this.props.xRef && this.props.xRef(ref)}
            >
                {this.props.children}
            </div>
        );
    }
}