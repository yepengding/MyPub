import React, {useCallback, useEffect, useState} from "react";
import styled from 'styled-components';
import {Box, Button, Panel} from 'react-bulma-components';

const {Block} = Panel;

const Title = styled.h2({
    color: "#242424",
    fontWeight: "bold",
    fontSize: "1.3rem",
    marginTop: "0.3rem"
});

const SubTitle = styled.h3({
    color: "#242424",
    marginTop: "0.1rem",
});

const Details = styled.h5({
    color: "#292A2D"
});

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
    // const [publicationUrl, setPublicationUrl] = useState(``);
    const [metadata, setMetadata] = useState(null);

    const getMetadata = useCallback(async () => {
        try {
            const res = await fetch(`${metadataUri}`);
            const data = await res.json();

            data.tokenId = tokenId;
            setTitle(data.title);
            setIntroduction(data.introduction);
            const metadataCid = metadataUri.split("/").pop();
            setCid(metadataCid);
            // setPublicationUrl(`/publication/${metadataCid}`);
            data.paid = paidTokenIds.includes(tokenId);

            setMetadata(data);

        } catch (err) {
            console.log(err)
        }
    }, [metadataUri])

    useEffect(() => {
        getMetadata();
    }, [getMetadata]);

    return (
        <>
            <Box>
                <Title>{title}</Title>
                <SubTitle>{cid}</SubTitle>
                <Details>{introduction}</Details>
                <Block>
                    <Button color="info" fullwidth onClick={() => {
                        setDetail(metadata);
                        setDetailModalShow(true);
                    }}>
                        Detail
                    </Button>
                </Block>

            </Box>

        </>
    );
};

export default Publication;
