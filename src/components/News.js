import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {


  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }  
  }

  async componentDidMount() {   
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=fb453fa8ccdc470ab2fd76010df83574"; 
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles})
   }
  
  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=fb453fa8ccdc470ab2fd76010df83574&page=${this.state.page - 1}`; 
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles})

    this.setState = ({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }

  handleNextClick = async ()=>{

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=fb453fa8ccdc470ab2fd76010df83574&page=${this.state.page + 1}`; 
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles})

    this.setState = ({
      page: this.state.page+1,
      articles: parsedData.articles
    })
  }
  
  render() {
    return (
        <div className='container my-3'>
          <h1>Top Headlines</h1>
         
          < div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev </button>
            <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
    )
  }
}

export default News