const fetchInit = (updateClips, setloveUsers) => {
    updateClips([]);
    setloveUsers([]);

    fetch('https://test.prozip.workers.dev/', {
        method: 'get',
    }).then(res => {
        return res.json()
    }).then(data => updateClips(data.aweme_list))

    fetch('https://cors.bridged.cc/http://aweme.snssdk.com/aweme/v1/hotsearch/star/billboard/', {
        method: 'get',
    }).then(res => {
        return res.json()
    }).then(data => setloveUsers(data.user_list))
}

const fetchMore = (fetching, setfetching, clips, updateClips) => {
    if (fetching == 'false') {
        setfetching('true');
        fetch('https://test.prozip.workers.dev/', {
            method: 'get',
        }).then(res => {
            return res.json()
        }).then(data => {
            updateClips([...clips, ...data.aweme_list]);
            setfetching(false);
        })
    }
}


const fetchClip = (updateClips, id) => {
    updateClips([]);
    fetch('https://cors.bridged.cc/https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=' + id, {
        method: 'get',
    }).then(res => {
        return res.json()
    }).then(data => updateClips(data.item_list))
}

const get1Clip = (updateClips, id) => {
    fetch('https://cors.bridged.cc/https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=' + id, {
        method: 'get',
    }).then(res => {
        return res.json()
    }).then(data => updateClips((current) => [...current, ...data.item_list]))
}

const fetchHotSearch = (updateClips) => {
    updateClips([]);
    fetch('https://cors.bridged.cc/https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/aweme/', {
        method: 'get',
    }).then(res => {
        return res.json()
    }).then(data => updateClips(data.aweme_list.map((o) => o.aweme_info)))
}

// const fetchHotSearch = (updateClips) =>{
//     updateClips([]);
//     fetch('https://cors.bridged.cc/https://creator.douyin.com/aweme/v1/creator/data/billboard/?billboard_type=1', {
//         method: 'get',
//     }).then(res => {
//         return res.json()
//     }).then(data => console.log(data))      
// }

const fetchPopularDay = (updateClips) => {
    updateClips([]);
    fetch('https://cors.bridged.cc/https://creator.douyin.com/aweme/v1/creator/data/billboard/?billboard_type=4', {
        method: 'get',
    }).then(res => {
        return res.json()
    }).then(data => {
        data.billboard_data.map(item => {
            let items_ids = item.link.match('video/(.*?)/')[1];
            get1Clip(updateClips, items_ids)
        })
    })
}

const fetchSavedClips = (updateClips) => {
    updateClips([]);
    var data = localStorage.getItem('douyin_saved');
    if (!data | data == '') {
        localStorage.setItem('douyin_saved', '')
    } else {
        data = data.split(',');
        data.map(items_ids => {
            get1Clip(updateClips, items_ids)
        })
    }
}

const fetchUserData = (sec_uid, setUserClips) => {
    if (sec_uid != '-1' && sec_uid != 'no') {
        setUserClips([])
        fetch('https://cors.bridged.cc/https://www.iesdouyin.com/web/api/v2/aweme/post/?sec_uid=' + sec_uid + '&count=30&max_cursor=0&aid=1128&_signature=xRygQQAApZUjeT8eFIGZO8UcoF&dytk=', {
            method: 'get',
        }).then(res => {
            return res.json()
        }).then(data => setUserClips(data.aweme_list))
    }
}

const douyinID_secID = async (douyinID) => {
    const res = await fetch('https://cors.bridged.cc/https://aweme-hl.snssdk.com/aweme/v1/search/sug/?keyword=' + douyinID + '&source=general&ts=1568182105&js_sdk_version=&app_type=normal&openudid=30D9D9EC63F40000&version_name=6.6.0&device_type=MI%203W&ssmix=a&iid=75188514167&os_api=19&mcc_mnc=46007&device_id=68274007671&resolution=720*1280&device_brand=Xiaomi&aid=1128&manifest_version_code=660&app_name=aweme&_rticket=1568182106141&os_version=4.4.2&device_platform=android&version_code=660&update_version_code=6602&ac=wifi&dpi=240&uuid=864394010302174&language=zh&channel=tengxun_new', {
        method: 'get',
    });
    const text = await res.json();
    const data = await text;
    try {
        return data.sug_list[0].extra_info.rich_sug_sec_uid;
    } catch (error) {
        return 'no'
    }
}


export { fetchInit, fetchMore, fetchClip, fetchHotSearch, fetchPopularDay, fetchSavedClips, fetchUserData, douyinID_secID }