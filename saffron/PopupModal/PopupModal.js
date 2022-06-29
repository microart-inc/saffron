import React from 'react';
import Modal from '../Modal/Modal';

export default class PopupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen ?? false
        }
    }

    render() {
        return (
            <>
                <div onClick={() => {
                    this.setState({ isOpen: true });
                }}>
                    {this.props.display}
                </div >
                <Modal className={this.props.className} isOpen={this.state.isOpen} onOuterClick={() => {
                    this.setState({ isOpen: false });
                }}>
                    {this.props.children}
                </Modal>
            </>
        )
    }
}