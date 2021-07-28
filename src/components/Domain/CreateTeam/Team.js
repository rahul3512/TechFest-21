import React, { useEffect, useState } from 'react'

const Team = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const url = 'http://localhost:4000/api/user/create-team';
        fetch(url).then(resp => resp.json())
            .then(resp => setPosts(resp))
    }, [])
    return (
        <div>
            {
                posts.map(post =>
                    <div>
                        <h1>{`${post.teamLeader}`}</h1>
                    </div>
                )
            }
        </div>
    )
}

export default Team;
