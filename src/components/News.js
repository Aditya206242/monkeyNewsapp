import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'; // Update the import path according to your project structure
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  // apikey = 'e7f13de79a9b4aa19560a6488646eafd'
  

  static defaultProps ={
    country:"in",
    pageSize :6,
    category:"general"
  }
  static PropTypes ={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
    
  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  articles=  []
  constructor(props){
    super(props);
    console.log("hi  I am  constructor from news ")
    this.state={
      articles: this.articles,
      loading:true,
      page:1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- News monkey`;

      
  }
  async updateNews(){
    
    this.props.setProgress(30);

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
    this.setState({loading:true});

    let data = await fetch(url);
    this.props.setProgress(50);

    let parsedata = await data.json();
    this.props.setProgress(70);
    

    
    this.setState({articles: parsedata.articles,
      totalResults:parsedata.totalResults,
      loading:false,
    });
    this.props.setProgress(100);


  }

  async componentDidMount(){
   this.updateNews();
  }

 
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
      
    });
  
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
  
    let data = await fetch(url);
    let parsedata = await data.json();
  
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      
    });
  };
  
  render() {
   
    return (
      <>
        <h1 className='text-center' style={{margin:'35px'}}>NewsMonkey -Top {this.capitalizeFirstLetter(this.props.category) } headlines</h1>
        
         {this.state.loading &&<Spinner/>} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <this.state.totalResults}
          loader={<Spinner/>}
        >

        
        <div className="container">
        <div className="row">
        { this.state.articles.map((element) =>{
          return  <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title? element.title.slice(0,45):""} description ={element.description? element.description.slice(0,88):""} imgUrl={element.urlToImage?element.urlToImage:"https://image.shutterstock.com/image-vector/table-breaking-news-banner-background-260nw-1277774833.jpg"} newsUrl={element.url} author ={element.author} date={element.publishedAt} source={element.source.name} className="card-img-top"/>
          </div>
        })}
         
       </div>
       </div>
       </InfiniteScroll>

     
       
      
        
        
       </>
    )
  }
}

export default News
