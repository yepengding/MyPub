import React, {useCallback, useEffect, useState} from "react";
import styled from 'styled-components';
import {Content, Media} from 'react-bulma-components';

const Title = styled.strong({
    display: "block",
    color: "#242424",
    fontWeight: "bold",
    fontSize: "1.6rem"
});

const SubTitle = styled.strong({
    display: "block",
    color: "#242424"
});

const DetailBtn = styled.button({

})

const Publication = ({
                         metadataUri,
                         tokenId,
                         paidTokenIds,
                         setDetail,
                         setDetailModalShow
                     }) => {
    const [title, setTitle] = useState(`Loading...`);
    const [introduction, setIntroduction] = useState(`Loading...`);
    const [cid, setCid] = useState(`Loading...`);
    const [price, setPrice] = useState(`Loading...`);
    // const [publicationUrl, setPublicationUrl] = useState(``);
    const [metadata, setMetadata] = useState(null);

    const getMetadata = useCallback(async () => {
        try {
            const res = await fetch(`${metadataUri}`);
            const data = await res.json();

            const publication_cid = metadataUri.split("/").pop();
            setCid(publication_cid);
            setTitle(data.title);
            setIntroduction(data.introduction);
            setPrice(data.price);

            data.publication_cid = publication_cid;
            data.tokenId = tokenId;
            data.paid = paidTokenIds.includes(tokenId);

            setMetadata(data);

        } catch (err) {
            console.log(err)
        }
    }, [metadataUri, paidTokenIds, tokenId])

    useEffect(() => {
        getMetadata();
    }, [getMetadata]);

    return (
        <>
            <Media renderAs="article">
                <Media.Item align="center">
                    <Content>
                        <p>
                            <Title>{title}</Title>
                            <SubTitle>{cid}</SubTitle>
                            {introduction}
                            <br/>
                            <small>

                            </small>

                            <span>
                                    <strong>{price} ETH</strong> <DetailBtn onClick={() => {
                                setDetail(metadata);
                                setDetailModalShow(true);
                            }}>Detail</DetailBtn>
                                </span>
                        </p>
                    </Content>
                </Media.Item>

            </Media>

        </>
    );
};

export default Publication;
