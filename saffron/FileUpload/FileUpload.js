import React from 'react';
import Button from '../Button/Button';
import Flex from '../Flex/Flex';
import Image from '../Image/Image';
import TextInput from '../TextInput/TextInput';

export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            fileblob: ""
        };
    }

    render() {
        return (
            <Flex
                row
                justify="stretch"
                align="stretch"
                style={{
                    width: "100%",
                    ...this.props.style
                }}
                mobile={this.props.mobile}
                gap="10px"
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (this.props.onChange) {
                            this.props.onChange(e);
                        }
                        this.setState({
                            file: e.target.files[0],
                            fileblob: URL.createObjectURL(e.target.files[0])
                        });
                    }}
                    ref={(x) => {
                        this.fileUploadButton = x;
                    }}
                    style={{
                        maxWidth: "0",
                        maxHeight: "0",
                        display: "none"
                    }}
                />
                {
                    this.state.file ? (
                        <Image
                            src={this.state.fileblob}
                            width="auto"
                            height="auto"
                            aspectRatio="1/1"
                            style={{
                                borderRadius: "22.37%",
                                border: "1px solid rgba(0,0,0,0.17)",
                                boxSizing: "border-box",
                                flexGrow: "2"
                            }}
                        />
                    ) : null
                }
                <TextInput
                    disabled
                    value={this.state.file?.name}
                    placeholder={
                        <span
                            style={{
                                fontSize: "0.8em",
                                color: "gray",
                            }}
                        >Choose a file</span>
                    }
                    rootStyle={{
                        flexGrow: "1"
                    }}
                />
                <Button
                    disabled={this.props.disabled}
                    text="Choose"
                    primary
                    onClick={() => {
                        this.fileUploadButton.click();
                    }}
                />
            </Flex>
        );
    }
}