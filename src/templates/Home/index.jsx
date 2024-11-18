import './styles.css';

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
    postsPerPage: 2,
    searchValue: "",
  }

  async componentDidMount() {

    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }


  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({
      posts, page: nextPage
    })

  }

  handleChange =  (e) => {
    const { value } = e.target;
    this.setState({searchValue: value})
  }


  render() {

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return  post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {
            !!searchValue && (<h1>Search vallue: {searchValue}</h1>)
          }
          
          <TextInput searchValue={searchValue}  handleChange={this.handleChange} />

          {filteredPosts.length === 0 && (
            <h1>Não existem posts relacionados</h1>
          )}
        </div>
       
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
              onClick={this.loadMorePosts}
              text="Load More Posts"
              disabled={noMorePosts}
            />
          )}
          
        </div>
      </section>
    );
  }
}




