import React, { useState, useEffect } from 'react';
import Clip from './Clip';
import { Grid } from 'semantic-ui-react'

const ClipList = ({ clips, server, fetchMore, showUserModal, setUserModal, setSec_uid }) => {

    var [saves, setSaves] = useState([]);

    useEffect(() => {
        var data = localStorage.getItem('douyin_saved');
        if (!data | data == '') {
            localStorage.setItem('douyin_saved', '')
        } else {
            let arr = data.split(',');
            setSaves(arr)
        }
    }, [])

    const loadmore = (index) => {
        if (index + 3 > clips.length) {
            fetchMore()
        }
    }

    const renderedList = clips.map((clip, index) => {
        return (
            <Grid divided='vertically' style={{ marginTop: '1%' }}>
                <Clip
                    index={index}
                    clipURL={clip.video.play_addr.url_list[server]}
                    imgURL={clip.video.origin_cover.url_list[0]}
                    avaURL={clip.author.avatar_thumb.url_list[0]}
                    nickname={clip.author.nickname}
                    clipID={clip.aweme_id}
                    desc={clip.desc}
                    douyinID={clip.author.unique_id!=""?clip.author.unique_id:clip.author.short_id}
                    sign={clip.author.signature}
                    music={clip.music.title}
                    musicAuth={clip.music.author}
                    sec={clip.author.sec_uid}
                    loadmore={loadmore}
                    saves={saves}
                    setSaves={setSaves}
                    showUserModal={showUserModal}
                    setUserModal={setUserModal}
                    setSec_uid={setSec_uid}
                >
                </Clip>
                <Grid.Row>
                </Grid.Row>
            </Grid>
        )
    })
    return (
        <Grid.Column width={13}>
            {renderedList}
        </Grid.Column>
    )
}
export default ClipList;