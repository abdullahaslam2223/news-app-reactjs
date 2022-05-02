import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            results: 0,
            loading: false,
            page: 1
        }
        const cat = this.props.category[0].toUpperCase() + this.props.category.slice(1);
        document.title = cat + " - World News";
    }

    async updateNews(pageNo) {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0673da7e3b91418ca034323a5fc0adf4&page=${pageNo}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let parsedData = await fetch(url).then(data => data.json());
        this.setState({
            page: pageNo,
            articles: parsedData.articles,
            loading: false
        });
    }

    async componentDidMount() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0673da7e3b91418ca034323a5fc0adf4&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let parsedData = await fetch(url).then(data => data.json());
        this.setState({
            page: this.state.page,
            articles: parsedData.articles,
            results: parsedData.totalResults,
            loading: false
        });
    }

    handleNextClick = async () => {
        this.updateNews(this.state.page + 1);
    }

    handlePreClick = async () => {
        this.updateNews(this.state.page - 1);
    }


    render() {
        let { pageSize } = this.props;
        return (
            <div className="container">
                <h1 className='text-center mb-4' style={{marginTop: "80px"}}>World News - Top Headlines ({this.props.category[0].toUpperCase() + this.props.category.slice(1)})</h1>
                <div className='d-flex justify-content-center'>
                    <h5 className='bg-info text-dark p-2 text-center w-25'>{this.state.results} - Results</h5>
                </div>
                <div className="row my-2">
                    {this.state.articles && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} date={element.publishedAt.slice(0, 10)} />
                        </div>
                    })}
                </div>
                <div className='d-flex justify-content-center' style={{ height: "100px" }}>
                    {this.state.loading && <Spinner />}
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
                    <button disabled={this.state.page >= (Math.ceil(this.state.results / pageSize))} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}













