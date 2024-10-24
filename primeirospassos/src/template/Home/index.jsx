import './style.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      posts,
      allPosts
    } = this.state;

    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);

    this.setState({posts: posts, page: nextPage});
  }

  handlerChange = (e) => {
    const {value} = e.target;

    this.setState({searchValue: value});
  }

  render() {
    const { posts, postPerPage, page, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}

          <TextInput 
            searchValue={searchValue}
            handlerChange={this.handlerChange}
          />
        </div>
        

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}
        
        <div className="button-container">
          {!searchValue && (
            <Button 
              text='load more posts'
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
