import './App.css';
import { Component } from 'react';

class App extends Component{

  state = {
     posts: []
  }

  
  componentDidMount(){
    this.loadPosts();
    
  }



  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
    
    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url }
    })

    this.setState({ posts: postsAndPhotos })

  }


  
  render(){

    const { posts } = this.state;
    

    return (

      <section className='container'>
        <div className="posts">
            {posts.map((posts) => (
              
              <div className='post'>
                <img src={posts.cover} alt={posts.title} />
                <div key={posts.id} className='post-content'>
                  <h1>{posts.title}</h1>
                  <p>{posts.body}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
