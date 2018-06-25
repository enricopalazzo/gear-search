import _ from 'lodash';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import axios from 'axios';
import GoogleList from './components/google_result_list';
import ShopList from './components/shop_list';
import ProductPage from './components/product_page';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import TabNav from './components/tab_nav';
import Tools from './components/tools';

const API_KEY = '------'; //youtube
const cx = '-------';
//const API_KEY ='--------'; //YOUTUBE

let apiUrls = 'https://www.googleapis.com/customsearch/v1?';
//let apiUrls = 'https://www.googleapis.com/customsearch/v1';?key=------&cx=----:----`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      se_results: null,
      shop_results: null,
      API_KEY: API_KEY,
      cx: cx,
      search_started: null,
      term: null,
      videos: [],
      selected_video: null,
      savedSearchs: [],
      isDashboard: false,
      shop_loading: false,
      video_loading: false,
      web_loading: false
    };
    //this.videoSearch(' ');
    this.getFromGoogle = this.getFromGoogle.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.searchStuff = this.searchStuff.bind(this);
    this.getFromShops = this.getFromShops.bind(this);
    this.saveToLocal = this.saveToLocal.bind(this);
    this.loadFromLocal = this.loadFromLocal.bind(this);
  }
  componentWillMount() {
    try {
      let values = JSON.parse(localStorage.getItem("savedSearch"));
      if (values !== null) {
        this.setState({ savedSearchs: values });
      }
    } catch (ex) {
      console.log("no hay savedsearchs");
    }
    /* axios.get('https://search.4ray.co?q=fender%20site%3Athegearpage.net&categories=general&pageno=2&language=en&format=json')
       .then(response => this.setState({ se_results: response.data.results })) */
  }
  setSearchTerm(term) {
    this.setState({ term: term });
  }
  saveToLocal() {
    if (!this.state.term) {
      alert("No search to save.");
    }
    else {
      const newItem = {
        term: this.state.term,
        videos: this.state.videos,
        shop_results: this.state.shop_results,
        se_results: this.state.se_results,
        selected_video: this.state.selected_video
      };

      if (!this.state.savedSearchs) {
        localStorage.setItem("savedSearch", JSON.stringify(newItem));
      }
      else {
        const list = [...this.state.savedSearchs];
        list.push(newItem);
        this.setState({ savedSearchs: list });
        localStorage.setItem("savedSearch", JSON.stringify(list));
      }
    }
  }
  loadFromLocal = (search) => {
    this.setState({
      term: search.term,
      videos: search.videos,
      shop_results: search.shop_results,
      se_results: search.se_results,
      search_started: true,
      selected_video: search.selected_video
    });
    console.log(search);
  }
  searchStuff() {
    this.setState({ search_started: "yes", isDashboard: true });
    this.videoSearch(this.state.term);
    this.getFromGoogle(this.state.term);
    this.getFromShops();
  }
  videoSearch(term, limit = 20) {
    this.setState({video_loading:true});
    console.log("el termo " + this.state.term + " limit " + limit);
    YTSearch({
      key: API_KEY,
      term: term,
      limit: limit,
      // channelId: 'UCDE5Ezmxq1bNVak4lmkpCMw',
    },
      (videos) => {
        this.setState({
          videos: videos,
          selected_video: videos[0],
          video_loading:false
        });
      });
  }
  getFromShops() {
    this.setState({shop_loading:true});
    axios.get('https://my.api.mockaroo.com/products.json?key=429a6dc0')
      .then(
        response => {
          this.setState({ shop_results: response.data })
          this.setState({ shop_loading: false});
        }
      )


    /*axios.get('http://localhost:3000/products.json')
      .then(response => this.setState({ shop_results: response.data }))*/
  }
  getFromGoogle(term) {
    this.setState({web_loading:true});
    //GOOGLE CUSTOM SEARCH RESULTS API. IS LIMITED SO ONLY USE IT WHEN SHOWING THE PROTOTYPE WITH REAL RESULTS
    //axios.get('https://www.googleapis.com/customsearch/v1?key=-----&cx=------:----&q=----')  this.setState({results: response.data.items})
    // axios.get('https://search.4ray.co?q='+term+'%20site%3Athegearpage.net&categories=general&pageno=2&language=en&format=json')

    //MOCKARRO API THAT SIMULATES GOOGLE CUSTOMSEARCH RESULTS 
    axios.get('https://my.api.mockaroo.com/search.json?key=429a6dc0')
  //    .then(response => this.setState({ se_results: response.data.items }))
      .then(
        response => {
          this.setState({ se_results: response.data.items })
          this.setState({ web_loading: false});
        }
      )

    /*axios.get('http://localhost:3000/v1.json')
      .then(response => this.setState({ se_results: response.data.items }))*/
  }

  render() {
    const DashBoard = (props) => {
      console.log(this.state);
      return (
        <div className="row">
          <div className="col-md-4">
          <div className={this.state.video_loading ? ("loading") : (null)}>
            <h4>Videos </h4>
            <p>Results from Youtube</p>
            <VideoDetail video={this.state.selected_video} />
            <VideoList
              isLoading={this.state.video_loading}
              onVideoSelect={selected_video => this.setState({ selected_video })}
              videos={this.state.videos}
              isDashboard={true}
              itemsToShow={3} />
              </div>
          </div>
          <div className="col-md-4">
            <h4>From the Web</h4>
            <p>Results from forums, blogs, magazines, etc</p>
            <div className={this.state.web_loading ? ("loading") : (null)}>
            <GoogleList
              gresults={this.state.se_results}
              itemsToShow={5}
              isDashboard={true} />
              </div>
          </div>
          <div className="col-md-4">
            <h4>Shop</h4>
            <div className={this.state.shop_loading ? ("loading") : (null)}>
            <p>Results from online stores</p>
            <ShopList
              shop_results={this.state.shop_results}
              itemsToShow={3}
              isDashboard={true} />
              </div>
          </div>
        </div>
      );
    }
    const VideoPage = (props) => {
      return (
        <div className="row">
        
          <div className="col-md-8">
          <div className={this.state.video_loading ? ("loading") : (null)}>
            <VideoDetail video={this.state.selected_video} />
            </div>
          </div>
          <div className="col-md-4">
          <div className={this.state.video_loading ? ("loading") : (null)}>
            <VideoList
              onVideoSelect={selected_video => this.setState({ selected_video })}
              videos={this.state.videos}
              isDashboard={false} />
          </div>
          </div>
        </div>
      );
    }
    const ShopPage = (props) => {
        return (
          <div className="row">
            <div className="col-md-12">
              <h2>Shop page</h2>
              <div className={this.state.shop_loading ? ("loading") : (null)}>
              <ShopList
              
                shop_results={this.state.shop_results}
                itemsToShow={20}
                isDashboard={false} />
                </div>
            </div>
          </div>
        );
    }
    const OnTheWebPage = (props) => {
      return (
        <div className="row">
          <div className="col-md-12">
            <h2>Results from the Web</h2>
            <div className={this.state.web_loading ? ("loading") : (null)}>
            <GoogleList
              gresults={this.state.se_results}
              itemsToShow={20}
              isDashboard={false} />
              </div>
          </div>
        </div>
      );
    }
    var TabContents = (props) => {
      return (
        <div>
          <div className="tab-content">
            <Switch>
              <Route path="/videos/" render={VideoPage} />
              <Route path="/shop/" render={ShopPage} />
              <Route path="/ontheweb/" render={OnTheWebPage} />
              <Route path="/dashboard/" render={DashBoard} />
              <Route path="/" render={DashBoard} />
            </Switch>
          </div>
        </div>
      );
    }

    var NoSearchContents = (props) => {
      return <div style={{ width: "80%", paddingTop: "50px", margin: "auto", textAlign: "center" }}> <h4>Please do some searchin' </h4>
        <blockquote style={{ width: "320px", margin: "auto", textAlign: "center" }}><strong>Note:</strong> work in progress. This current Demo is not connecting to real APIS (Google, Amazon,ect) because of the search limits</blockquote>  </div>;
    }

    var TheTabs = (props) => {
      const isSearchStarted = this.state.search_started;
      if (isSearchStarted) {
        return <TabNav results={this.state} />;
      }
      return <NoSearchContents />;
    }
    var TheBody = (props) => {
      const isSearchStarted = this.state.search_started;
      if (isSearchStarted) {
        return <TabContents />;
      }
      return null;
    }

    return (
      <div>
        <div className="container-fluid">
          <Menu right isOpen={false} noOverlay className={"shadow"}>
            <Tools saveToLocal={this.saveToLocal} loadFromLocal={this.loadFromLocal} savedsearch={this.state.savedSearchs} />
          </Menu>
          <BrowserRouter>
            <div id="Conta">
              <ProductPage />
              <div className="row">
                <div className="col-md-12">
                  <SearchBar searchStuff={this.searchStuff} setSearchTerm={this.setSearchTerm} searchterm={this.state.term} />
                </div>
              </div>
              <TheTabs />
              <TheBody isSearchStarted={true} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
