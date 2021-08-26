import React, {useEffect, useState} from "react";
import Publication from './Publication';
import {Button, Columns, Content, Form, Modal} from 'react-bulma-components';
import {BigNumber} from "ethers";
import styled from "styled-components";

const {Field, Label, Control, Input} = Form;

const Details = styled.div({});

const Download = styled.a`
  display: inline-block;
`;

const PublicationList = ({provider, contract, iface, ipfsGateway, limit, accountAddress}) => {
    const [metadataUrl, setMetadataUrl] = useState(`Loading...`);
    const [publications, setPublications] = useState([]);
    const [detailModalShow, setDetailModalShow] = useState(false);
    const [detail, setDetail] = useState(false);


    const times = n => f => {
        let iter = i => {
            if (i === n) return
            f(i)
            iter(i + 1)
        }
        return iter(0)
    }

    useEffect(() => {
        const getSupply = async () => {
            try {
                const galleryContract = contract;
                const totalSupplyHex = await galleryContract.totalSupply();
                let totalSupply = BigNumber.from(totalSupplyHex).toNumber();
                if (limit != null) {
                    totalSupply = Math.min(totalSupply, limit);
                }

                let accountTokenIds = null;
                if (accountAddress != null) {
                    const published = contract.filters.Published(accountAddress);
                    const events = await contract.queryFilter(published, 0);
                    accountTokenIds = events.map(e => BigNumber.from(e.args[1]).toNumber())
                }

                times(totalSupply)(async (i) => {
                    const tokenIdHex = await galleryContract.tokenByIndex(i);
                    const tokenId = BigNumber.from(tokenIdHex).toNumber();
                    if (accountTokenIds && !accountTokenIds.includes(tokenId)) {
                        return
                    }
                    const metadataUri = await galleryContract.tokenURI(tokenId);

                    const newItem = (
                        <Columns.Column key={i}>
                            <Publication metadataUri={metadataUri} setDetail={setDetail}
                                         setDetailModalShow={setDetailModalShow}/>
                        </Columns.Column>
                    );

                    setPublications((prev) => {
                        return [...prev, newItem];
                    });

                    setMetadataUrl(metadataUrl);
                });

            } catch (err) {
                console.log(err)
            }
        }
        getSupply();
    }, [accountAddress, contract, limit, metadataUrl]);

    return (
        <>
            <Columns>
                {publications}
            </Columns>
            <Modal
                show={detailModalShow}
                onClose={() => {
                    setDetailModalShow(false);
                    setDetail(null);
                }}
            >
                <Modal.Card>
                    <Modal.Card.Head showClose onClose={() => setDetailModalShow(false)}>
                        <Modal.Card.Title>
                            {detail.title}
                        </Modal.Card.Title>
                    </Modal.Card.Head>
                    <Modal.Card.Body>
                        <Content>
                            <Field>
                                <Label>
                                    Publication ID
                                </Label>
                                <Control>
                                    <Input
                                        readOnly
                                        value={detail.file_cid}
                                    />
                                </Control>
                            </Field>
                            <Field>
                                <Label>
                                    Publication Integrity
                                </Label>
                                <Control>
                                    <Input
                                        readOnly
                                        value={detail.file_integrity}
                                    />
                                </Control>
                            </Field>
                            <Field>
                                <Label>
                                    Preview ID
                                </Label>
                                <Control>
                                    <Input
                                        readOnly
                                        value={detail.preview_cid}
                                    />
                                </Control>
                            </Field>
                            <Field>
                                <Label>
                                    Preview Integrity
                                </Label>
                                <Control>
                                    <Input
                                        readOnly
                                        value={detail.preview_integrity}
                                    />
                                </Control>
                            </Field>

                            <Field>
                                <Label>
                                    Suffix
                                </Label>
                                <Control>
                                    <Input
                                        readOnly
                                        value={detail.suffix}
                                    />
                                </Control>
                            </Field>

                            <Details>
                                {detail.introduction}
                            </Details>
                        </Content>
                    </Modal.Card.Body>
                    <Modal.Card.Foot
                        align="right"
                    >
                        <Columns>
                            <Columns.Column>
                                <Download href={ipfsGateway + "/" + detail.preview_cid} target="_blank" download>
                                    <Button fullwidth>
                                        Preview
                                    </Button>
                                </Download>
                            </Columns.Column>

                            <Columns.Column>
                                <Button color="warning" fullwidth>
                                    Pay {detail.price} ETH
                                </Button>
                            </Columns.Column>

                            <Columns.Column>
                                <Download href={ipfsGateway + "/" + detail.file_cid} target="_blank" download>
                                    <Button color="primary" fullwidth>
                                        Download
                                    </Button>
                                </Download>
                            </Columns.Column>

                        </Columns>

                    </Modal.Card.Foot>
                </Modal.Card>

            </Modal>
        </>

    );
};

export default PublicationList;
