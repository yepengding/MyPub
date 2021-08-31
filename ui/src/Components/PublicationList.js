import React, {useCallback, useEffect, useState} from "react";
import Publication from './Publication';
import {Button, Columns, Content, Form, Modal} from 'react-bulma-components';
import {BigNumber} from "ethers";
import styled from "styled-components";
import {parseUnits} from "ethers/lib/utils";
import {toast, ToastContainer} from "react-toastify";
import {ipfsConfig} from "../config";
import {connect} from "react-redux";


const {Field, Label, Control, Input} = Form;

const Details = styled.div({});

const Download = styled.a`
  display: inline-block;
`;

const PublicationList = ({contract, limit, accountAddress, currentAccountAddress}) => {
    const [publications, setPublications] = useState([]);
    const [detailModalShow, setDetailModalShow] = useState(false);
    const [detail, setDetail] = useState({});
    const [payBtnLoading, setPayBtnLoading] = useState(false);

    const times = n => f => {
        let iter = i => {
            if (i === n) return
            f(i)
            iter(i + 1)
        }
        return iter(0)
    }

    const getSupply = useCallback(async (paidTokenIds) => {
        if (!currentAccountAddress) {
            return
        }
        try {
            const totalSupplyHex = await contract.totalSupply();
            let totalSupply = BigNumber.from(totalSupplyHex).toNumber();

            // Limit the number of presented supplies
            if (limit != null) {
                totalSupply = Math.min(totalSupply, limit);
            }

            // Query publications of the passed account
            let accountTokenIds = null;
            if (accountAddress) {
                const publishedEvents = await contract.queryFilter(contract.filters.Published(accountAddress), 0);
                accountTokenIds = publishedEvents.map(e => BigNumber.from(e.args[1]).toNumber());
            }

            // Query paid publications of the current account
            if (currentAccountAddress) {
                const paidEventEvents = await contract.queryFilter(contract.filters.Paid(currentAccountAddress), 0);
                paidTokenIds.push(...paidEventEvents.map(e => BigNumber.from(e.args[1]).toNumber()))
            }

            times(totalSupply)(async (i) => {
                const tokenIdHex = await contract.tokenByIndex(i);
                const tokenId = BigNumber.from(tokenIdHex).toNumber();
                if (accountTokenIds && !accountTokenIds.includes(tokenId)) {
                    return
                }
                const metadataUri = await contract.tokenURI(tokenId);

                const newItem = (
                    <Columns.Column key={i}>
                        <Publication metadataUri={metadataUri} tokenId={tokenId} paidTokenIds={paidTokenIds}
                                     setDetail={setDetail}
                                     setDetailModalShow={setDetailModalShow}/>
                    </Columns.Column>
                );

                setPublications((prev) => {
                    return [...prev, newItem];
                });

            });

        } catch (err) {
            console.log(err)
        }
    }, [accountAddress, contract, currentAccountAddress, limit]);

    useEffect(() => {
        getSupply([]);
    }, [getSupply]);

    const pay = async () => {
        try {
            const tokenId = BigNumber.from(detail.tokenId).toNumber();
            const amount = parseUnits(detail.price);
            await contract.purchase(tokenId, {value: amount});
            toast.success("Paid successfully!");
            setPublications([]);
            await getSupply([tokenId]);

            setDetailModalShow(false);
        } catch (err) {
            console.error(err);
            toast.error("Something wrong while paying.");
        }

    }

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
                                        value={detail.publication_cid}
                                    />
                                </Control>
                            </Field>
                            <Field>
                                <Label>
                                    File ID
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
                                    File Integrity
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
                                        value={detail.format}
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
                                <Download href={ipfsConfig.gateway + "/" + detail.preview_cid} target="_blank" download>
                                    <Button fullwidth>
                                        Preview
                                    </Button>
                                </Download>
                            </Columns.Column>

                            <Columns.Column>
                                <Button color="warning" fullwidth onClick={() => {
                                    setPayBtnLoading(true);
                                    pay().then(() => {
                                        setPayBtnLoading(false);
                                    });
                                }} disabled={detail.paid} loading={payBtnLoading}>
                                    {detail.paid ? "Paid" : `Pay ${detail.price} ETH`}
                                </Button>
                            </Columns.Column>

                            <Columns.Column>
                                <Download href={ipfsConfig.gateway + "/" + detail.decryptor_cid} target="_blank" download>
                                    <Button color="primary" fullwidth disabled={!detail.paid}>
                                        Decryptor
                                    </Button>
                                </Download>
                            </Columns.Column>

                            <Columns.Column>
                                <Download href={ipfsConfig.gateway + "/" + detail.file_cid} target="_blank" download>
                                    <Button color="primary" fullwidth disabled={!detail.paid}>
                                        Download
                                    </Button>
                                </Download>
                            </Columns.Column>

                        </Columns>

                    </Modal.Card.Foot>
                </Modal.Card>

            </Modal>
            <ToastContainer/>
        </>

    );
};

const mapStateToProps = (state) => {
    return {
        currentAccountAddress: state.account.address,
    };
};

export default connect(mapStateToProps)(PublicationList);
