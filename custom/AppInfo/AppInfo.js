import React from 'react';
import Link from 'next/link';
import styles from './AppInfo.module.css';

export default class AppInfo extends React.Component {
    render() {
        return (
            <Link
                href={`/apps/${this.props.app.id}`}
            >
                <div className={styles.app}>
                    <img src={this.props.app.iconUrl} alt={this.props.app.name} />
                    <b>{this.props.app.name}</b>
                    <span>{this.props.app.category.name}</span>
                </div>
            </Link>
        );
    }
}