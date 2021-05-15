import React, { useState } from "react";
import { Button, Container, Icon, Image, Modal, Grid, Embed } from "semantic-ui-react";
import { Grid as GridSpin } from 'react-spinners-css'


const Player = ({clip}) => {
    const [isShow, setShow] = useState(false)
    return (
        <div style={{borderRadius:'10px', overflow:'hidden'}} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <Embed
                autoplay={true}
                iframe={{
                    allowFullScreen: true,
                    src: clip.video.download_addr.url_list[0] + "&autoplay=1",
                    allow: "autoplay",
                }}
                style={{height:'406px'}}
                placeholder={clip.video.cover.url_list[0]}
                active={isShow}
            />
        </div>
    )
}

const UserModal = ({ showUserModal, setUserModal, userClips, setUserClips, sec_uid }) => {
    const renderedList = userClips.map((clip, index) => {
        return (
            <Grid.Column>
                <Player clip={clip}></Player>
            </Grid.Column>
        )
    })
    if (userClips.length != 0) {
        return (
            <Modal
                open={showUserModal}
                onClose={() => { setUserClips([]); setUserModal(false)}}
                onOpen={() => setUserModal(true)}
            >
                <Modal.Header>{userClips[0].author.signature}</Modal.Header>
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '45px' }}>
                            <Image src={userClips[0].author.avatar_medium.url_list[0]}
                                size='small' style={{ borderRadius: '50%' }}></Image>
                            <div style={{ marginLeft: '30px', overflow: 'hidden', flex: '1 1 0%', textOverflow: 'ellipsis' }}>
                                <h2 style={{ fontFamily: 'sofiapro-bold, PingFangSC, sans-serif', fontWeight: '700', fontSize: '32px', lineHeight: '38px' }}
                                >{userClips[0].author.nickname}</h2>
                                <h1 style={{ fontFamily: "sofiapro-semibold, PingFangSC, sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "25px", textOverflow: "ellipsis", height: "25px", overflow: "hidden", maxWidth: "450px", whiteSpace: "nowrap", marginTop: '0px' }}
                                >Douyin ID: {userClips[0].author.unique_id}</h1>
                                <Button color='red' content='SAVE' style={{marginTop:'16px', width:'208px'}}></Button>
                            </div>
                        </div>
                        <Container style={{ position: 'relative', width: '750px', top: '50px' }}>
                            <Grid columns={3} centered>
                                {userClips.length == 0 ?
                                    <GridSpin></GridSpin> :
                                    renderedList}
                            </Grid>
                        </Container>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <Button onClick={() => setUserModal(false)} primary>
                        Proceed <Icon name="chevron right" />
                    </Button> */}
                </Modal.Actions>
            </Modal>
        )
    } else {
        if (sec_uid!='no'){
            return (
                <Modal
                    open={showUserModal}
                    onClose={() => setUserModal(false)}
                    onOpen={() => setUserModal(true)}
                >
                    <GridSpin style={{ padding: '50px', left: '45%', marginTop: '150px', marginBottom: '150px' }}></GridSpin>
                </Modal>
            )            
        }else{
            return (
                <Modal
                    open={showUserModal}
                    onClose={() => setUserModal(false)}
                    onOpen={() => setUserModal(true)}
                >
                    <h2>not found</h2>
                </Modal>
            )              
        }

    }

};

export default UserModal;
