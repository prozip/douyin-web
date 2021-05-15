import React, { useState, useEffect } from "react";
import handleViewport from "react-in-viewport";
import { Grid, Feed, Card, Image, Embed, Button } from "semantic-ui-react";

const Block = (props) => {
    const { inViewport, forwardedRef } = props;
    return <div className="viewport-block" ref={forwardedRef}></div>;
};

const myStyle = {
    playFrame: {
        borderRadius: "7px",
        paddingTop: "120%",
        minHeight: "400px",
        minWidth: "225px",
        // minWidth: ''
    },
};

const ViewportBlock = handleViewport(Block /** options: {}, config: {} **/);

const Clip = ({
    index,
    clipURL,
    imgURL,
    avaURL,
    nickname,
    clipID,
    douyinID,
    desc,
    loadmore,
    sign,
    music,
    musicAuth,
    saves,
    setSaves,
    showUserModal,
    setUserModal,
    setSec_uid,
    sec
}) => {
    const [isShow, setShow] = useState(false);
    const [isSave, setSave] = useState(false);
    clipURL = clipURL.replace("http://", "https://");

    useEffect(() => {
        if (saves.find((item) => item == clipID) != undefined) {
            setSave(true);
        }
    }, []);

    const save = () => {
        setSave(true);
        setSaves([...saves, clipID]);
        localStorage.setItem("douyin_saved", [...saves, clipID]);
    };
    const unsave = () => {
        setSave(false);
        var newArr = saves.filter((item) => item != clipID);
        setSaves(newArr);
        localStorage.setItem("douyin_saved", newArr);
    };

    const enterView = () => {
        setShow(true);
        loadmore(index);
    };

    const openModal = () =>{
        if (sec!=undefined){
            setUserModal(true)
            setSec_uid(sec)            
        }

    }
    
    
    return (
        <Grid.Row style={{ marginBottom: "10px" }}>
            <Grid.Column width={5} style={{ height: "fit-content" }}>
                <Embed
                    autoplay={true}
                    iframe={{
                        // allowFullScreen: true,
                        src: clipURL + "&autoplay=1",
                        allow: "autoplay",
                    }}
                    style={myStyle.playFrame}
                    placeholder={imgURL}
                    active={isShow&!showUserModal}
                />
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={9}>
                <div style={{ position: 'relative', top: '50%' }}>
                    <ViewportBlock
                        onEnterViewport={enterView}
                        onLeaveViewport={() => setShow(false)}
                    />
                </div>

                <Card fluid style={{ margin: '0px' }}>
                    <Card.Content>
                        <Card.Header>{sign}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label onClick={openModal} image={avaURL}  style={{cursor:'pointer'}}/>
                                <Feed.Content>
                                    <Feed.Date
                                        content={"douyinID: " + douyinID}
                                    />
                                    <Feed.Summary onClick={openModal} image={avaURL}  style={{cursor:'pointer'}}>{nickname}</Feed.Summary>
                                </Feed.Content>
                                <Feed.Content>
                                    {isSave ? (
                                        <Button
                                            onClick={unsave}
                                            content="SAVED"
                                            floated="right"
                                            color="red"
                                        ></Button>
                                    ) : (
                                        <Button
                                            onClick={save}
                                            content="SAVE"
                                            floated="right"
                                            primary
                                        ></Button>
                                    )}
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <a> Clip ID: </a> {clipID}
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <a> Description: </a> {desc}
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <a> Music: </a> {music}
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <a> Music Author: </a> {musicAuth}
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid.Row>
    );
};
export default Clip;
