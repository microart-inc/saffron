import React from 'react';
import AppContext from './AppContext';

export default class AppContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: typeof window !== 'undefined' ? window.innerWidth < 800 : this.props.isMobileView
        };
    }

    componentDidMount = () => {
        window.onresize = () => {
            if (window.innerWidth < 800 && !this.state.isMobile) {
                this.setState({
                    isMobile: true
                });
            } else if (window.innerWidth >= 800 && this.state.isMobile) {
                this.setState({
                    isMobile: false
                });
            }
        };
    }

    componentWillUnmount = () => {
        window.onresize = null;
    }

    render() {
        return (
            <AppContext.Provider
                value={this.state}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}