import './styles.css'

export const PostCard = ({post}) => {
    return (
        <div className='post'>
            <img src={post.cover} alt={post.tile}></img>
            <div className='post-content'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            </div>
        </div>
    );
}