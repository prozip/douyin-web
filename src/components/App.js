import React, { useState, useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";
import AppBar from "./AppBar";
import ClipList from "./ClipList";
import SideBar from "./SideBar";
import {
    fetchInit,
    fetchMore,
    fetchClip,
    fetchHotSearch,
    fetchPopularDay,
    fetchSavedClips,
    fetchUserData
} from "../apis/douyin/post";
import { Facebook, Ripple } from "react-spinners-css";
import UserModal from "./UserModal";

const App = () => {
    const [clips, updateClips] = useState([]);
    const [server, setServer] = useState(0);
    const [fetching, setfetching] = useState('false');
    const [loveUsers, setloveUsers] = useState([]);
    const [showUserModal, setUserModal] = useState(false);
    const [sec_uid, setSec_uid] = useState("-1");
    const [userClips, setUserClips] = useState([]);

    useEffect(() => {
        fetchInit(updateClips, setloveUsers);
    }, []);

    useEffect(() => {
        fetchUserData(sec_uid, setUserClips)
    }, [sec_uid])

    return (
        <Container fluid style={{ paddingTop: "1%" }}>
            <UserModal
                showUserModal={showUserModal}
                setUserModal={setUserModal}
                userClips={userClips}
                setSec_uid={setSec_uid}
                sec_uid={sec_uid}
                setUserClips={setUserClips}
            ></UserModal>
            <Grid>
                <Grid.Row columns={1}>
                    <Container>
                        <AppBar
                            server={server}
                            setServer={setServer}
                            fetchInit={() => {
                                setfetching('false');
                                fetchInit(updateClips, setloveUsers);
                            }}
                            fetchClip={(id) => {
                                setfetching('no');
                                fetchClip(updateClips, id);
                            }}
                            setSec_uid={setSec_uid}
                            setUserModal={setUserModal}
                            setUserClips={setUserClips}
                        ></AppBar>
                    </Container>
                </Grid.Row>
                <Grid.Row>
                    <div style={{ margin: "2vh" }}></div>
                </Grid.Row>
                <Grid.Row>
                    <SideBar
                        loveUsers={loveUsers}
                        setSec_uid={setSec_uid}
                        userClips={userClips}
                        setUserClips={setUserClips}
                        fetchInit={() => {
                            setfetching('false');
                            fetchInit(updateClips, setloveUsers);
                        }}
                        fetchPopularDay={() => {
                            setfetching('no');
                            fetchPopularDay(updateClips);
                        }}
                        fetchHotSearch={() => {
                            setfetching('no');
                            fetchHotSearch(updateClips);
                        }}
                        fetchSavedClips={() => {
                            setfetching('no');
                            fetchSavedClips(updateClips);
                        }}
                        setUserModal={setUserModal}
                    ></SideBar>
                    <Grid.Column width={10} style={{ right: "-30%" }}>
                        {clips.length == 0 ? (
                            <Facebook
                                style={{ position: "relative", left: "40%" }}
                            ></Facebook>
                        ) : (
                            <ClipList
                                fetchMore={() =>
                                    fetchMore(
                                        fetching,
                                        setfetching,
                                        clips,
                                        updateClips
                                    )
                                }
                                clips={clips}
                                server={server}
                                showUserModal={showUserModal}
                                setUserModal={setUserModal}
                                setSec_uid={setSec_uid}
                            ></ClipList>
                        )}
                        {((fetching=='true') && (clips.length != 0)) ? (
                            <Ripple
                                style={{ position: "relative", left: "45%" }}
                            ></Ripple>
                        ) : null}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};
export default App;
