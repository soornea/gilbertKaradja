import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 15px;
    padding: 15px 0px;
    margin-bottom: 15px;
    border-bottom: 1px solid #f1f1f1;
`;

const ImageContainer = styled.div`
    flex-shrink: 0;
    position: relative;
    height: 150px;
    width: 110px;
    border: 2px solid black;
    border-radius: 3px;
    overflow: hidden;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;

const WatchedBanner = styled.div`
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1fad53;
    box-sizing: border-box;
    text-align: center;
    opacity: 0.9;

    p {
        font-size: 10px;
        font-weight: bold;
        color: white;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

const Title = styled.h4`
    font-size: 20px;
    margin: 0px 0px;
    margin-bottom: 10px;
`;

const Comment = styled.p`
    margin: 5px 0px;
`;

const ControlsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const ActionText = styled.a`
    text-decoration: underline;
    color: #1460b1;
    cursor: pointer;
`;

/**
 * @param {String} title
 * @param {String} imageUrl
 * @param {String} comment
 * @param {boolean} isAlreadyWatched 
 */
function MovieItemProps(title, imageUrl, comment, isAlreadyWatched) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.comment = comment;
    this.isAlreadyWatched = isAlreadyWatched;
}

/**
 * @param {MovieItemProps} props 
 */

export default function MovieItem(props) {
    const { title, imageUrl, comment, isAlreadyWatched, } = props;

    return (
        <Container>
            <ImageContainer>
                <img src={imageUrl} />

                {isAlreadyWatched && (
                    <WatchedBanner>
                        <p>WATCHED</p>
                    </WatchedBanner>
                )}
            </ImageContainer>

            <ContentContainer>
                <Title>{title}</Title>
                <Comment>{comment}</Comment>

                <ControlsContainer>
                    <ActionText>
                        {!isAlreadyWatched && 'Watched this one!'}
                        {isAlreadyWatched && 'Remove from watched'}
                    </ActionText>
                </ControlsContainer>
            </ContentContainer>
        </Container>
    );
}