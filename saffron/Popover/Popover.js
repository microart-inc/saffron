import React from 'react';
import styles from './Popover.module.css';
import Popover from 'react-popover';

export default class PopoverEx extends React.Component {
    render() {
        return (
            <Popover
                body={this.props.body ?? 
                (<div className={styles.popover}>
                    <span>{this.props.text ?? "Saffron Popover"}</span>
                </div>)}
                isOpen={this.props.isOpen}
                preferPlace={this.props.preferPlace ?? "below"}
                place={this.props.place}
                enterExitTransitionDurationMs={this.props.transitionDuration ?? 500}
                tipSize={this.props.arrowSize ?? 0.01}
                onOuterAction={this.props.onOuterAction}
            >
                {this.props.children}
            </Popover>
        );
    }
}