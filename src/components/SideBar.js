import React, { useState } from "react";
import { Menu, Feed, Button } from "semantic-ui-react";
import { Ellipsis } from 'react-spinners-css'

const myStyle = {
    suggestAcc: {
        fontFamily: "PingFangSC,sans-serif",
        fontWeight: "400",
        boxSizing: "border-box",
        marginBottom: "0px !important",
        textAlign: "left",
        padding: "16px 0 0 4px",
        fontSize: "14px",
        lineHeight: "20px",
        color: "rgba(22,24,35,0.75)",
        width: "fit-content !important",
    },
    item: {
        paddingTop: "4px",
        paddingBottom: "4px",
    },
};

const SideBar = ({ setSec_uid, loveUsers, fetchInit, fetchHotSearch, fetchPopularDay, fetchSavedClips, setUserModal }) => {
    const [activeItem, setactiveItem] = useState("Newest");
    const [isShowUser, setShowUser] = useState(false);

    const handleItemClick = (e, { name }) => {
        setactiveItem(name);
        switch (name) {
            case 'Newest':
                fetchInit();
                return;
            case 'Hot search':
                fetchHotSearch();
                return;
            case 'Most Popular':
                fetchPopularDay();
                return;
            case 'Saved clips':
                fetchSavedClips();
                return;

        }
    }

    const UserClick = (sec_uid) =>{
        setUserModal((current) => !current)
        setSec_uid(sec_uid);
    }

    const renderUserList = loveUsers
        .slice(0, isShowUser ? loveUsers.length : 5)
        .map((user, index) => {
            return (
                <Menu.Item onClick={()=> UserClick(user.user_info.sec_uid)} style={myStyle.item}>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label
                                image={user.user_info.avatar_thumb.url_list[0]}
                            />
                            <Feed.Content>
                                <Feed.Date content={user.user_info.uid} />
                                <Feed.Summary>
                                    {user.user_info.nickname.length < 15
                                        ? user.user_info.nickname
                                        : user.user_info.nickname.substring(0, 10)}
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Menu.Item>
            );
        });

    return (
        <>
            <Menu
                secondary
                vertical
                size="large"
                fixed="left"
                style={{
                    top: "15%",
                    left: "7%",
                    width: "fit-content",
                    overflow: "scroll",
                }}
            >
                <Menu.Item
                    name="Newest"
                    active={activeItem === "Newest"}
                    onClick={handleItemClick}
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                />
                <Menu.Item
                    name="Most Popular"
                    active={activeItem === "Most Popular"}
                    onClick={handleItemClick}
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                />
                <Menu.Item
                    name="Hot search"
                    active={activeItem === "Hot search"}
                    onClick={handleItemClick}
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                />
                <Menu.Item
                    name="Saved clips"
                    active={activeItem === "Saved clips"}
                    onClick={handleItemClick}
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                />
                <Menu.Item>
                    <div
                        style={{
                            borderBottom:
                                "1px solid rgba(34,90,89,0.2)",
                        }}
                    ></div>
                </Menu.Item>
                <Menu.Item
                    style={{
                        paddingBottom: "10px",
                        paddingLeft: "7px",
                    }}
                >
                    <frameElement style={myStyle.suggestAcc}>
                        Suggected accounts
                                </frameElement>
                </Menu.Item>
                {loveUsers.length == 0 ?
                    <Ellipsis style={{ left: '28%' }}></Ellipsis>
                    : renderUserList}
                <Menu.Item>
                    <div
                        onClick={() => setShowUser(!isShowUser)}
                        style={{
                            display: "flex",
                            cursor: "pointer",
                            width: "fit-content",
                            fontSize: "18px",
                        }}
                    >
                        <p>{isShowUser ? "See less" : "See all"}</p>
                        <i
                            style={{ paddingTop: "5px" }}
                            class={
                                isShowUser
                                    ? "angle up icon"
                                    : "angle down icon"
                            }
                        ></i>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <Button content="Get Windows App" color='teal' onClick={() => window.location.href = "https://raw.githubusercontent.com/prozip/douyin-web/main/build/windows/douyin-web-ui_0.1.0_x64.msi"}></Button>
                </Menu.Item>
                <Menu.Item>
                    {/* <div style={{marginBottom:'50%', borderBottom:'1px solid rgba(34,90,89,0.2)'}}></div> */}
                    <div style={{ paddingTop: "50%" }}></div>
                </Menu.Item>
            </Menu>
        </>
    );
};
export default SideBar;
