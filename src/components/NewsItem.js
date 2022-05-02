import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, source, date } = this.props;
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img height="160px" src={imageUrl ? imageUrl : "https://storage.googleapis.com/pmd-stage-northamerica-northeast1-dcs-static-files/9.4.3/websites/images/postmedia-image-fallback.png"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title ? title.slice(0, 40) : ""}...</h5>
          <h6 className='bg-dark text-light text-center py-1'><strong>Source: {source}</strong></h6>
          <p className="card-text">{description ? description.slice(0, 88) : ""}...</p>
          <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-dark btn-sm">Read More</a>
          <strong className='mx-3 bg-info p-2'>{date}</strong>
        </div>
      </div>
    )
  }
}