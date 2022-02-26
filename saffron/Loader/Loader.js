import React from 'react';
import styles from './Loader.module.css';

export default class Loader extends React.Component {
    render() {
        return (
            <div style={this.props.style} className={styles['lds-spinner']}>
                {new Array(12).fill(<div></div>)}
            </div>
        );
    }
}