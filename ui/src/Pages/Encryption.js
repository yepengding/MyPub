import {Box, Button, Columns, Container, Form, Heading, Panel, Section} from 'react-bulma-components';
import {serviceConfig} from "../config";
import Hero from '../Components/Hero';
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import styled from "styled-components";

const {InputFile} = Form;
const {Block} = Panel;

const Download = styled.a`
  display: inline-block;
`;
const Encryption = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [encrypted, setEncrypted] = useState(null);
    const [loadingEncryptBtn, setLoadingEncryptBtn] = useState(false);

    const encrypt = async () => {
        if (selectedFile == null) {
            toast.info("Please select a file to publish");
            return;
        }

        const formData = new FormData();
        formData.append(
            'file',
            selectedFile,
            selectedFile.name
        );

        setLoadingEncryptBtn(true);
        toast.info("Encrypting your file")

        let result = await fetch(`${serviceConfig.base_url}/cipher/encrypt`, {
            method: 'POST',
            body: formData
        }).then(
            response => response.json()
        ).then(
            success => {
                if (success.code === 200) {
                    return success.data;
                } else {
                    return null;
                }
            }
        ).catch(
            error => {
                toast.error("Something wrong while uploading.");
                console.log(error);
                return null;
            }
        );
        setLoadingEncryptBtn(false);
        if (result != null) {
            setEncrypted(result);
            toast.success("Encrypted successfully!");
        } else {
            toast.error("Failed to get encrypted information.");
        }
        console.log(result);

    }

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">Encryption</Heading>
            <Container>
                <Box>
                    <InputFile
                        fullwidth boxed name="file" label='Select a file to encrypt...'
                        onChange={(event) => setSelectedFile(event.target.files[0])}
                    />

                    <Block>
                        <Button fullwidth color="warning" loading={loadingEncryptBtn} onClick={encrypt}>
                            Encrypt
                        </Button>
                    </Block>

                    <Block>
                        <Columns>
                            <Columns.Column>
                                <Download
                                    href={encrypted != null ? `${serviceConfig.base_url}/file/${encrypted.file}` : "#"}
                                    target="_blank"
                                    download>
                                    <Button color="primary" fullwidth disabled={encrypted == null}>
                                        File
                                    </Button>
                                </Download>
                            </Columns.Column>
                            <Columns.Column>
                                <Download
                                    href={encrypted != null ? `${serviceConfig.base_url}/file/${encrypted.decryptor}` : "#"}
                                    target="_blank"
                                    download>
                                    <Button color="primary" fullwidth disabled={encrypted == null}>
                                        Decryptor
                                    </Button>
                                </Download>
                            </Columns.Column>
                            <Columns.Column>
                                <Download
                                    href={encrypted != null ? `${serviceConfig.base_url}/file/${encrypted.key}` : "#"}
                                    target="_blank"
                                    download>
                                    <Button color="primary" fullwidth disabled={encrypted == null}>
                                        Secret Key
                                    </Button>
                                </Download>
                            </Columns.Column>
                        </Columns>
                    </Block>

                </Box>

                <Box>
                    <p>
                        This online encryption service is based on <a href="https://github.com/yepengding/MyPubService"
                                                                      target="_blank"
                                                                      rel="noreferrer">MyPub Service</a>.
                    </p>

                    <p>
                        It is <strong>highly recommended</strong> that you encrypt your publications and get
                        corresponding decryptors <strong>in your local environment</strong> by <a
                        href="https://github.com/yepengding/MyPubEncryptor" target="_blank"
                        rel="noreferrer">MyPub Encryptor</a>.
                    </p>
                </Box>
            </Container>

            <ToastContainer/>
        </Section>
    )
};

export default Encryption;
