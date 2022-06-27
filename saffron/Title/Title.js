import React from 'react';
import Head from 'next/head';

export default class Title extends React.Component {
    render() {
        let showSuffix = true;
        if (this.props.showSuffix === false) showSuffix = false;
        let suffix = showSuffix ? ' - Microart' : '';
        return (
            <Head>
                <title>{this.props.children}{suffix}</title>
            </Head>
        );
    }
}