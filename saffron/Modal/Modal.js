import React from "react";
import Modal from 'react-modal';
import Flex from "../Flex/Flex";
import c from "../../CustomClass";
import styles from './Modal.module.css';
Modal.setAppElement('#__next');
Modal.defaultStyles = {
    overlay: {
        position: "fixed",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999999999999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    content: {}
}
/*
const ModalX = ({ children, containerRef }) => {
    ReactDOM.render(children, containerRef);
    return (null);
}
export default class Modal extends React.Component {
    componentWillUnmount() {
        let container = document.getElementById("__saffron_modal");
        //container.onclick = null;
        ReactDOM.unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
    }

    render() {
        if (typeof (window) === 'undefined') return (<div>&nbsp;</div>);
        let containerRef;
        if (document.getElementById("__saffron_modal") === null) {
            containerRef = document.createElement("div");
            containerRef.id = "__saffron_modal";
            document.body.appendChild(containerRef);
        } else {
            containerRef = document.getElementById("__saffron_modal");
        }
        containerRef.onclick = (e) => {
            if (e.target === containerRef) {
                this.props.onOuterClick(e);
            }
        }
        return (
            <ModalX containerRef={containerRef}>
                <div className={styles.modal}>
                    {this.props.children}
                </div>
            </ModalX>
        );
    }
}
*/

export default class ModalEx extends React.Component {

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onOuterClick}
                contentLabel="ModalD ASDs"
                className={c(this.props.className, styles.content)}
                style={this.props.style}
                onAfterOpen={this.props.onAfterOpen}
            >
                {this.props.raw ? this.props.children : (
                    this.props.children
                )}
            </Modal>
        );
    }
}