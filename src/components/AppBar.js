import React, { useState } from 'react';
import { Menu, Image, Dropdown, Form } from 'semantic-ui-react';
import { douyinID_secID } from '../apis/douyin/post';

const searchOptions = [
    {
        key: 'Search Clip',
        text: 'Search Clip',
        value: 'Search Clip',
    },
    {
        key: 'Search User',
        text: 'Search User',
        value: 'Search User',
    },
]
const placeHolderOptions = {
    "Search Clip": "type Clip id ...",
    "Search User": "type Douyin id ..."
}
const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
]
const AppBar = ({setSec_uid, setUserModal ,fetchInit, fetchClip, setUserClips }) => {
    const [activeItem, setActiveItem] = useState('douyin')
    const [currentSearchOption, setCurrentSearchOption] = useState('Search User');
    const [searchTerm, setsearchTerm] = useState("");
    const myStyle = {
        wrapper: {
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderBottom: '1px solid rgba(34,90,89,0.2)',
        }
    }
    const handleItemClick = (e, { name }) => setActiveItem(name);
    const handleSearchChange = (e) => {
        var chose = e.target.innerText;
        setCurrentSearchOption(chose)
    } 

    const handleSubmit = () =>{
        switch (currentSearchOption) {
            case 'Search Clip':
                fetchClip(searchTerm)
                break;
        
            case 'Search User':
                setUserClips([]);
                setUserModal(true)
                douyinID_secID(searchTerm).then((data)=>{
                    setSec_uid(data);
                })
                break;
        }
    }

    return (
        <Menu secondary fixed='top' size='huge' style={myStyle.wrapper}>
            <Menu.Item>
                <div style={{ padding: '1%' }}>
                </div>
            </Menu.Item>
            <Menu.Item onClick={() => fetchInit()}>
                {activeItem === 'douyin' ?
                    <Image onClick={() => fetchInit()} rounded size='tiny' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEA8QDw8PDQ8NDw8NDw8PDQ8PDQ0NFREWFhURFhUYHSggGBonGxUWIT0hJSkrLjAuFx8zODMsNygtLisBCgoKDg0OFRAPFS0dHR0rLS0tKzAtLS0tLS0rNy0tLS0tKy0tLTIrNy0tLS8tKysrLS0tLS0rLS0tLSstLTcrLf/AABEIAK0BIwMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAAAQIGBwQFCAP/xABNEAACAQMBBAQGCg8HBQAAAAAAAQIDBBEFBgcSIRMxQVEyYXGBkaEUIiMzUnKUsdHSFRckJTRCQ1RzgoOTsrPBYmR1lcPh4jVThKLC/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EACoRAQEAAgECBQQABwAAAAAAAAABAhEDBCESEzFBUQUyQoEiJDRxcoLB/9oADAMBAAIRAxEAPwDVOA0WkQBREFiCEAAYrciAQGzLQwRkZDSJEE5IkEVZDJZU3GKFcksqaZSCBkIrIglsgqDIwGC6ZyQCAIykZBBQAAAABQAAMDAADAAAAAI7iR80fRlZGXVVlSQyCAwQZsblQVLZKMmmgIjIGi2DZAZBdM2jZDJKl0yjJBLIZoCGCGwyjABDYZtSVYbCKiASyCoAAAAAAACgAAAAAAAAACO5KyGSHIy6qEMlsjJBDZGQ2VYVHEVyARp3mxdlTuL2lSqxU6clUbi84eItrqNr2+wNnOKlG1pY8cpfSav3fP74UPJU/gZ6E0f3qPlfzmp6PDyY+Zz+G2601JvG2HjbUKde3owpqE+CooN81Jcnz7mvWaxkeq9XsI3NGpRn4NWLjnufY/MzzPtHo1WyualCssSg8xfZOD6pLxGfd75x4Y8Xb1ldXkgloo2VzSyAVyUS2RgAumLQqyWyMBlBIyCgxggnIBhEEgGQSQAAAAABQAAAAAAAR2rZVhsjJl1QQ2SymQEmVkwQFVYyTgA2yDYB/fC3/afy5HofRn7kvLI877CPGoW3xp/wSPQ2i+9frMvs8kv8z/q7E6Ha3ZS21OlwVk4zh71WhjpKT/qvEztrm7p0uHpJxhxyUI8TwpTfUvUfdMj3WXW3n3XN2eoW8moKFxBdU4S4G18WX0mG3dtOlOVOpFxnB8Mo9zPWkop9fM8+72LOnTv7mUI8LlKnlLqbdOOXglumeLp+TO5WXtjNsHZUZCNOVqQfW2jmdNNZUpwi13pySwbW3zaDaWtpaytrajbuVy4SdKnGDlHopPDa6+aRUahBLRKQRXALYN1aZo9rLZqVV29F1nYV6nSulDpekXHiXFjOeQGk8EEs52iaTWva8LegourU4uFSlwx5LL5+YDgAzlbqNW+BQ+UL6C/2pdW7rZf+R/xIumBv0A37sDsmrC3lSvYW1SvVqynHCVTEOFJLLXiZgt3ul1HpJunK1cHOThmtNPgb5LHD3DZqteE4M9+1JqfwrVftp/VOs2i2AvNPoO4ryoSpqUIPo6kpSzJ4XJxRTTFAS0QAAAAAAAARHYgcRXiI6jKsnJVgQjKtA2IuLlKdV+x6T5rKzUmvFHs852m77ZqMkruvHKb9xg1y5flH/Q2zp2lrClU8qj9JdPDnzZ8mfl8Xt61g+n7u7PC9yqV32ynNqLfmwjpN4ex1O1o0alChGk3UcJYm3xLhyuT8hupRS7kl6jCd7H4JS/Tr+Fmcsuz39B0Hi5sZnnbtqLYfK1C2+PJf+kj0Tonvf6zPO+x/LUqH6WX8LPQuhv3L9Z/0Nfi8uePh624/E/6x3es/uOH6eH8MjVmj7xNQspOMairUU8KnVTlwrPUn1o2nvW/AY+KvD5pHn2t4UvKznO+dfd5M7j0nHr5rclhvkpNe7WzjL+xUwvWYJt5rdO+q1K9NcKqOGItpyWIpdnkMTbINXDfu8uHWTDHKTCbymtoCGQb08DcuxGgaDO1sqtaVCV3KNOc1O7amq/FyXBxcueOWDPtqLGxr0VHUOi6FTUo9LU6OKqYeMPK54yeX6DxOD7VOLT8akjeG+2Ten20v71B+mlMKwXWNO0qOs0aVOdJadLoXUarN0k2nxLjzyXV2md/YTZVfj2Xyx/WNHVJ5Pnld6CNnbwbHQYWTlp07Z3Kq0klRrupPgz7bll8sGWaFz2Yf+HXK9UzQya7GvSb52ZWdmWv7jd/6hK1GhGjn6JqtayrQuKElGrT4uFyipLmmnyfiZwjO93GzGm31KvK+rulOnVjCEVcQo5g45zz6+fzFZfTT95GtXFalRp1bfjr1I0ocVvFR4pPCy12HbbXbS7QaY6KuK9o+n43B0aKl4GM5yl8JGRaVsVoVrWp16dwpVKE1Uhx30HFSXVldp2u02l6VqSpeyq1OXQ8XA4XcINcWM9T59SDWmoam8jVZNSdalmPgvoIcj60d4+sTlCCuIZnKMFmhTxmTSXzmeLYPQIppV+UuTzfx5r0kUtjdn6U4TVWGacozXFfpriTyu3vRNLq/Lp9r9U1/TadKpWvLeUa1To10VGPEpcLlzzHq5GDaxtff3lN0biu6lJyjJx4IRTlF5XUjdW0FTSL+nGjdXNtOMJ9JHF5CEozw1nKl3NmNXGy2zMYy+6KSeHj745ecfGBY02yCZrm+7Lx5CCsAAChKIJRBAJ4QRHOkVBAdRs5OmWrr1qVJflakYeRN836Dis7rYpL2fbZ+G/Twssc+a6wys+G79CsY5jGKxToxikuzksJeo7nVdQp2tGpWqeDTWfHJ9iRx9Dhim38KWTHd6kp+xKcY54ZV48ePFFtesnJdRv6R0+OXl438vVgO0u2VzcOUp1ZU6f4lGnJxil48dfnMUra3Vlyy2uvEpSkcS9qOU5N97S8SRxjlhh8vrdT9QyxyuHB/DjHebITzqFs+2VX50z0RoXvT+M/mR5z2Q/DrX9KvmZ6K0L3uXxv6I7/i/P229XLfeOi3pr7hX6en/wDR58uPDl8ZnoPek/uDy16X9Tz5c+HP4z+c54/ff7Pt8/8AR4f5V8wRxENnV8tIK5GQjPNj92t1fU6VzKpSoW1TE4ttzrTipYeIrkup9bN07Q2FlWoKN+qbt6UozzVnwQUlyTbyu80JZ7e6lb29G3oVo0aVusR4aUOOUeJtqUnnv7MGzN9Us6XSfwrmg354SYal7MC2kvNLhrFvUtoUZWFFUOmjRpJ0pOMpcftfxuTXoM5o7fbOwWI0kl/h/wDsam2c2dudSqTpWsYSnTh0kuOaglDKXX5WZGt0+rfBtvlH/EiO22/2x0q8sp0LSm41pVKUoy9iqklGM05e28hlWyXPZvHfZ3i9dQwFbpdW7rX5Q/qm1Nndn61vpKsajh03se4pNxbdNTqceOeOr2yJVjzeiHHxGaaxu11G0oVbir7HdOhB1J8FaTlwrraXCYagyzvYTdtLUqPsmrW9j0XKUaajTU6lRxeHLnySzlGTy3MWufwyv+6o/Qd5u5jOWiUo0ZKFSVO5jTk+qNR1J8MvTgwuW7rXXzd6m+1u+uMt+grfs7lbmbT88uP3dH6B9pyzXXd3PmhR+qdIt3Gt9t3HzXtx9BEt2usvru6fnvLj6BsdNsfsjRvr67talWpCFr0vDOChxT4avAs5TXVzOn2u0mNjeV7anKVSNFwUZTUeNqUIy545dpmW5+hKlqV5Tm8zp0KtKbTynONeKbz280zHt6C++t55aP8AIgEs7MUAAZAAFC2CqLkQBGQFctlSZEEdEHN0W76C4o1eynUi38XqfqbOEQwznPFLHpjZ+cXSzF555znOU+a9RfX9LV3bzot8LftoS+DNdTNe7qNqoyStK0kppcMG34cV4K8q6vQbTRb3XpcrhJ8x5k2i06tbXFSlXg4TTbWVynHPhLvR1eD0/rWi0LyChXpU6sVzTlFNxfifYY9S2Ft6UlKlb0W11NrLXpEjHUcmctsx3tgW7vZ2cZq7rR4Uk1Ri+tt8nPHdg3Jo1NxpLPLibl5uw4lnpCTzUecdUV1ec51/f07anKrVkoU6cctv1JeMuVmtOHSdPy58vmZzve0jCd7V+lC3t0+cpOvJd0Yppetv0Gja7zKT75My7bDXZ3NWrXlydX2tOPwKa6l6PWzDmcuPvbk+/wDUpOLi4uD3ne/tVgMROz4wQTIIDt9ndn7m/qwpUac5Kckp1OF9HThn20nLq5LsNsb77qELC2oZzOpcRlFdvBThJOXky0vOY1svvNp6fYUraNrOtXp9JmTnGFFuU3JN9r5NGE7Q67cX9eVe5nxzftYxXKFKHZCK7EF32fXZvaS502pOrayhGdSHRy6SHHFxyn1eVGQvexq3w7f5P/uYKCaSVnH21tX/AO7Q+Tx+k2tsntBWutI9mVeHp1SuZNpYi5U5TSeP1TzkbA2a3hUrPTZWMrepUm43EFUjOCh7q5NZT58uJjTUrqtU3i6ndUalCtVp9FXhwTjGjGLcX1rJihHd5CUErf27OVT7CUnSw6qjddGn4LqdJPhz58GEVNr9pU2nQqRa5NLT28P0HW7Ebwq2m03QlSVzQcnOK4+CdJvrw8PKb54Mp+3NT/Mqn7+P0EXfZ08dr9pH+Rq/5c/qkS2p2kf5Ot/l6+qdu98sPzGfyiP1T5y3yr8xfyhfVKftO6jSryN5dXVzRqUlVpyTlVpum51p1FJ4T87MS3p/9Vu/2P8AJgZNW3xzw+CygpdjnXbivKlHma21O/qXNWpXqy4qlabnN4ws9yXclheYF9HFZAJTDKAAFEXKIuSgACDksrksyodAq2TkqEXpVZQkpQbjKLTjKLxKLXambW2Q3pR4Y0dRTjJYirmKzGS/tx7H41y8hqbIkyrO1enrLWbWslKlcUqiayuGpH5jk1LylFZlUhFeOcUeW6NeUOcZOPzHI+ytXvT8uTN8XtHrw8jL78rP03/rO21lbppVOnqLkoUmpc/HLqRqvanayrdPNaXDCPOnQi+S8b734zEKmo1X2peRHEbb5t5b7zFwyy+56cet6fp5vgx3l819rq4lUll+ZdyPgwyp1xmu0fJ5OTLkyuWV3akIhhGmEsgkgCUSVGQLRxnnzRM2s8lhdxQkCGAAAyABKZAAAAEAAFAAggkABYIsVRZiiMgEERzCpJBHVVorkuygQZVliGVLVRknJVyRYztLKDIKgSQCAwSkQygMBPBOQIGC1OSTTa4kmm11ZWeo+15UhOc5QpqlCTzGmm5KC7svrA44AAABEAkMgoAAgAAAAAAAAvKOEua59naigAEokqixAwCQFcllWXkUI6IkULyKMAVZLKsrFVkQSQyxkAAAAAAAUAgSABAAMAEAIAAACgACAAQBIAAnBABQABARbJVEkFgRgBXJZUsyr6yOgz5stkqAzyKskhlYqqIZYqWMgAAAAAAAACBQABAAAAAACSAygACAAAAAAAAAAAAAAkgAg//Z' />
                    : <Image rounded size='tiny' src='https://techfest.vn/storage/post/cong-ty-tnhh-cong-nghe-tiktok-viet-nam-don-vi-quang-cao-truyen-thong-dong-hanh-techfest-vietnam-2020-1608273620.jpeg' />
                }
            </Menu.Item>
            <Menu.Item
                name='douyin'
                active={activeItem === 'douyin'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='tiktok'
                active={activeItem === 'tiktok'}
                onClick={handleItemClick}
            />
            <Dropdown text='Change Server' options={options} simple item />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Form onSubmit={handleSubmit}>
                        <div class="ui input">
                            <input
                                type="text" 
                                placeholder={placeHolderOptions[currentSearchOption]}
                                style={{ borderRadius: '80px' }}
                                value={searchTerm}
                                onChange={(e) => setsearchTerm(e.target.value)}
                            ></input>
                        </div>
                    </Form>
                </Menu.Item>
                <Menu.Item>
                    <Dropdown
                        button
                        inline
                        options={searchOptions}
                        defaultValue={currentSearchOption}
                        onChange={handleSearchChange}
                    />
                </Menu.Item>
            </Menu.Menu>
            <Menu.Item>
                <div style={{ padding: '1%' }}>
                </div>
            </Menu.Item>
        </Menu>
    )
}
export default AppBar;