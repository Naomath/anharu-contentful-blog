import React from 'react';
import styled from 'styled-components';
import { Subscribe, Provider } from 'unstated';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Posts from './Posts';
import SnsShare from './SnsShare';

export default class PostPage extends React.Component {  
  componentDidMount() {
    this.props.retrievePost(this.props.id);
    window.scrollTo(0, 0);
  }
  render() {
    console.log(this.props);
    if (this.props.state.existPost) {
      const post = this.props.state.post;
      console.log(post);
      const date = new Date(post.fields.date);
      return (
        <Wrapper>
          <Background url={post.fields.image.fields.file.url}>
            <PostInfo>
              <div>
                <p>{date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}</p>
                <h1>{post.fields.title}</h1>
              </div>
              <Arrow>
                <span />
              </Arrow>
            </PostInfo>
            <SnsShare url={encodeURI("https://anharu-blog.netlify.com/posts/" + post.fields.url)}/>
          </Background>
          <PostWrapper>
            {documentToReactComponents(post.fields.content, options)}
          </PostWrapper>
        </Wrapper>
      );
    } else if (this.props.state.loading) {
      return (
        <div>
        </div>
      );
    } 
    else {
      return (
        <div>
          <p>記事が見つかりません</p>
        </div>
      );
    }
  }
}

const options = {
  renderNode: {
      'embedded-asset-block': (node) =>
        <img class="img-fluid" src={node.data.target.fields.file.url}/>
      }
};
const Wrapper = styled.div`
  background-color:  #f7f7f7;
`;

const Background = styled.div`
  height: calc(100vh - 70px - 24.4px);
  padding-top: 24.4px;
  background-image: url(${props => props.url });
  background-size: cover;
  background-attachment: fixed;
`;

const PostInfo = styled.div`
  color: #fff;
  margin-top: 50vh;
  padding-right 50px;
  padding-left 50px;
  height: calc(50vh  - 21.4px - 70px);
  background-image: linear-gradient(to bottom,  rgba(0, 0, 0, 0), #000000);
  background-size: 100%;
  p {
    padding-top: 100px;
    font-family: "HalisR-Bold";
    border-bottom: 2px solid #fff;
    display: inline;
    padding-bottom: 5px;
    font-weight: 900;
  }
  h1{
    font-size: 2.3rem;
  }
  div {
    padding-top: 90px;
  }
`;

const Arrow = styled.div`
  @keyframes arrow {
    0% {
        opacity: 1;
        -webkit-transform: translate3d(-50%, 0, 0);
        transform: translate3d(-50%, 0, 0);
      }

  100% {
      opacity: 0.5;
      -webkit-transform: translate3d(-50%, -8px, 0);
      transform: translate3d(-50%, -8px, 0);
    }
  }
  width: 15px;
  margin: 0 auto;
  -webkit-animation: arrow 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0s infinite alternate;
  animation: arrow 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0s infinite alternate;
}))
  span {
    position: relative;
    display: block;
    left: 50%;
  }
  }
  span:before {
    content: '';
    width: 30px;
    height: 30px;
    border: 0;
    border-top: solid 2px #fff;
    border-right: solid 2px #fff;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    box-sizing: border-box;))''
  }
`;

const PostWrapper = styled.div`
  padding: 50px 40px 30px;
  h1 {
    position: relative;
    padding: .7em;
    margin-bottom: 60px;
    background: #e0edff;
    z-index:1;
  }
  h1:after {
    position: absolute;
    content: '';
    top: 100%;
    left: 30px;
    border: 15px solid transparent;
    border-top: 15px solid #e0edff;
    width: 0;
    height: 0;
  }
  h2 {
    padding: 0.3em 0.5em;
    color: #494949;
    background: transparent;
    border-left: solid 3px #7db4e6;
  }
  h3 {
    background: linear-gradient(transparent 70%, #a7d6ff 70%);
  }
  img {
    max-width: 100%;
  }
`;