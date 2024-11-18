import { PostCard } from '../PostCard';

import "./styles.css"

export function Posts({posts}) {

    return(
        <div className="posts">
            {posts.map((posts) => (
            <PostCard 
                cover={posts.cover} 
                body={posts.body} 
                title={posts.title} 
                key={posts.id} 
            />
            ))}
        </div>

    )

}