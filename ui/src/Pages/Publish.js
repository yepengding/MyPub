import {Box, Button, Columns, Container, Form, Heading, Panel, Section} from 'react-bulma-components';

import Hero from '../Components/Hero';
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const {Label, Field, Control, Input, InputFile} = Form;
const {Block} = Panel;

const Publish = ({contract, ipfsGateway}) => {

    const [titleField, setTitleField] = useState("");
    const [selectedPreview, setSelectedPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [priceFiled, setPriceField] = useState("0");
    const [introductionField, setIntroductionField] = useState("");
    const [disabledPublishBtn, setDisabledPublishBtn] = useState(true);
    const [loadingPublishBtn, setLoadingPublishBtn] = useState(false);

    const publish = async () => {
        setLoadingPublishBtn(true);

        if (titleField == null || titleField.length === 0 || titleField.length > 255) {
            toast.info("Please write a suitable title");
            return;
        }

        if (selectedPreview == null) {
            toast.info("Please select a preview");
            return;
        }

        if (selectedFile == null) {
            toast.info("Please select a file to publish");
            return;
        }

        let price;

        if (priceFiled == null) {
            toast.info("Please set a price");
            return;
        } else {
            price = parseFloat(priceFiled);
            if (price <= 0) {
                toast.info("Please set a suitable price");
                return;
            }
        }

        price = price.toString();

        if (introductionField == null || introductionField.length === 0 || introductionField.length > 255) {
            toast.info("Please write a suitable introduction");
            return;
        }

        const uploadedPreview = await upload(selectedPreview).then((data) => {
            const cid = data.cid;
            const integrity = data.integrity;
            return {cid, integrity}
        });

        toast.info("Uploaded preview");

        const uploadedFile = await upload(selectedFile).then((data) => {
            const cid = data.cid;
            const integrity = data.integrity;
            return {cid, integrity}
        });

        toast.info("Uploaded file");

        const metaData = generateMetaDataFile(titleField, selectedFile.name, getSuffix(selectedFile.name), price, introductionField,
            uploadedPreview.cid, uploadedPreview.integrity, uploadedFile.cid, uploadedFile.integrity);

        const uploadedMetaData = await upload(metaData).then((data) => {
            const cid = data.cid;
            const integrity = data.integrity;
            return {cid, integrity}
        });

        toast.info("Uploaded metadata");


        try {
            await contract.mint(uploadedMetaData.cid, price);
            setLoadingPublishBtn(false);
            toast.success(`Published ${selectedFile.name} successfully.`)
        } catch (err) {
            console.error(err)
            toast.error(`Failed to published ${selectedFile.name}.`)
        }

        setTitleField("");
        setSelectedPreview(null);
        setSelectedFile(null);
        setPriceField("0");
        setIntroductionField("");
        setDisabledPublishBtn(true);
    }

    // Change disabled state of "Publish" button
    useEffect(() => {
        setDisabledPublishBtn(titleField.length === 0 || selectedPreview == null || selectedFile == null || priceFiled <= 0 || introductionField == null || introductionField.length === 0);
    }, [selectedPreview, selectedFile, introductionField, titleField.length, priceFiled]);

    const upload = (file) => {
        const formData = new FormData();
        formData.append(
            'file',
            file,
            file.name
        );

        let result;

        result = fetch(`${ipfsGateway}/upload`, {
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
                return null
            }
        );

        return result;
    };

    const generateMetaDataFile = (title, filename, suffix, price, introduction, preview_cid, preview_integrity, file_cid, file_integrity) => {
        const data = JSON.stringify({
            title: title,
            filename: filename,
            suffix: suffix,
            price: price,
            introduction: introduction,
            preview_cid: preview_cid,
            preview_integrity: preview_integrity,
            file_cid: file_cid,
            file_integrity: file_integrity
        });

        const blob = new Blob([data], {type: "application/json"});

        return new File([blob], `${filename}.meta.json`);
    }

    const getSuffix = (filename) => {
        const split_str = filename.split('.');
        return split_str.length > 1 ? split_str.pop() : "";
    }

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">Publishing Panel</Heading>

            <Container>
                <Box>
                    <Field>
                        <Label>
                            Title
                        </Label>
                        <Control>
                            <Input
                                placeholder="Publication title"
                                type="text"
                                value={titleField}
                                onChange={(event) => setTitleField(event.target.value)}
                            />
                        </Control>
                    </Field>

                    <Columns>
                        <Columns.Column>
                            <InputFile
                                fullwidth boxed name="file" label='Select a preview...'
                                onChange={(event) => setSelectedPreview(event.target.files[0])}
                            />
                        </Columns.Column>
                        <Columns.Column>
                            <InputFile
                                fullwidth boxed name="file" label='Select a file to publish...'
                                onChange={(event) => setSelectedFile(event.target.files[0])}
                            />
                        </Columns.Column>
                    </Columns>

                    <Field>
                        <Label>
                            Price
                        </Label>
                        <Control>
                            <Input
                                placeholder="Price"
                                type="number"
                                min={0}
                                value={priceFiled}
                                onChange={(event) => setPriceField(event.target.value)}
                            />
                        </Control>
                    </Field>

                    <Field>
                        <Label>
                            Introduction
                        </Label>
                        <Control>
                            <Input
                                placeholder="Introduction to your publication"
                                type="text"
                                value={introductionField}
                                onChange={(event) => setIntroductionField(event.target.value)}
                            />
                        </Control>
                    </Field>

                    <Block>
                        <Button color='warning' fullwidth onClick={publish} disabled={disabledPublishBtn}
                                loading={loadingPublishBtn}>
                            Publish
                        </Button>
                    </Block>
                </Box>
            </Container>

            <ToastContainer/>
        </Section>
    )
};

export default Publish;
