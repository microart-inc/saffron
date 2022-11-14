import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import styles from './inspector.module.css';

let domState = {
    isMouseDown: false,
    startX: 0,
    startY: 0,
    padding: 10
};

export default function Inspector() {

    const toolbarRef = useRef(null);
    const wrapperRef = useRef(null);
    const [dom, setDom] = React.useState(null);

    useEffect(() => {
        const handleMouseDown = (e) => {
            domState.isMouseDown = true;
            let rect = toolbarRef.current.getBoundingClientRect();
            domState.startX = e.clientX - rect.left;
            domState.startY = e.clientY - rect.top;
        };

        const handleMouseUp = () => {
            domState.isMouseDown = false;
            domState.startX = 0;
            domState.startY = 0;
        };

        const handleMouseMove = (e) => {
            if (domState.isMouseDown) {
                let left = e.clientX - domState.startX;
                let top = e.clientY - domState.startY;
                left = Math.max(domState.padding, left);
                top = Math.max(domState.padding, top);
                left = Math.min(window.innerWidth - wrapperRef.current.offsetWidth - domState.padding, left);
                top = Math.min(window.innerHeight - wrapperRef.current.offsetHeight - domState.padding, top);
                wrapperRef.current.style.left = left + "px";
                wrapperRef.current.style.top = top + "px";
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        setDom([...document.body.children]);

        global.inspectorHoverElement = document.createElement('div');
        global.inspectorHoverElement.appendChild(document.createElement('div'));
        global.inspectorHoverElement.classList.add(styles.hoverElement);
        document.body.appendChild(global.inspectorHoverElement);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [toolbarRef.current]);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.toolbar} ref={toolbarRef}>
                <span>Inspector</span>
                <IoClose />
            </div>
            <div className={styles.content}>
                {dom?.map((element, index) => {
                    return <DomElement key={index} element={element} wrapperRef={wrapperRef} />
                })}
            </div>
        </div>
    )
}

function DomElementName({ element }) {
    return (
        <summary>
            <span>{element.tagName.toLowerCase()}</span>
            {element.id && <span>{element.id}</span>}
            {element.className && <span>.{element.className}</span>}
        </summary>
    )
}

function formatElementName(element) {
    let name = element.tagName.toLowerCase();
    if (element.id) name += "#" + element.id;
    if (element.className) name += "." + element.className;
    return name;
}

function DomElement({ element, wrapperRef }) {
    if (element === wrapperRef.current) return null;
    return (
        <div>
            <details style={{ marginLeft: 10 }}>
                <summary
                    onMouseEnter={() => {
                        global.inspectorHoverElement.style.visibility = "visible";
                        let rect = element.getBoundingClientRect();
                        global.inspectorHoverElement.style.left = rect.left + "px";
                        global.inspectorHoverElement.style.top = rect.top + "px";
                        global.inspectorHoverElement.style.width = rect.width + "px";
                        global.inspectorHoverElement.style.height = rect.height + "px";
                        global.inspectorHoverElement.children[0].innerHTML = formatElementName(element);
                        global.$_ = element;
                    }}
                    onMouseLeave={() => {
                        global.inspectorHoverElement.style.visibility = "hidden";
                    }}
                >{element.tagName.toLowerCase()}</summary>
                {element.children.length > 0 ? ([...element.children].map((child, index) =>
                    <DomElement key={index} element={child} wrapperRef={wrapperRef} />
                )) : (
                    <div style={{ marginLeft: 10 }}>{element.innerHTML}</div>
                )}
            </details>
        </div>
    )
}

function getReactInstance(dom, traverseUp = 0) {
    const key = Object.keys(dom).find(key => {
        return key.startsWith("__reactFiber$") // react 17+
            || key.startsWith("__reactInternalInstance$"); // react <17
    });
    const domFiber = dom[key];
    if (domFiber == null) return null;
    // react 16+
    const GetCompFiber = fiber => {
        //return fiber._debugOwner; // this also works, but is __DEV__ only
        let parentFiber = fiber.return;
        while (typeof parentFiber.type == "string") {
            parentFiber = parentFiber.return;
        }
        return parentFiber;
    };
    let compFiber = GetCompFiber(domFiber);
    for (let i = 0; i < traverseUp; i++) {
        compFiber = GetCompFiber(compFiber);
    }
    return compFiber.stateNode;
}