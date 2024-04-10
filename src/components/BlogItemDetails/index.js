import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

class BlogItemDetails extends Component {
  state = {blogItemDetails: {}, isTrue: true}

  componentDidMount = () => {
    this.getBlogItemDetails()
  }

  getBlogItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()

    const updateData = {
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      author: data.author,
      content: data.content,
    }

    this.setState({blogItemDetails: updateData, isTrue: false})
  }

  renderBlogItemDetails = () => {
    const {blogItemDetails} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogItemDetails
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isTrue} = this.state
    return (
      <div className="blog-container">
        {isTrue ? <Loader type="TailSpin" /> : this.renderBlogItemDetails()}
      </div>
    )
  }
}

export default BlogItemDetails
