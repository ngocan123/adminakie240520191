import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import axioApi from './../../config/axioConfig'
import { Link } from 'react-router-dom'
import qs from 'qs'

let $this;
class ListCatProduct extends Component {
    constructor(props){
		  super(props);
      this.state = {'posts' : [], author : '', 'page': 1, 'current': 1, 'pages': 1,}
      $this = this; 
    }
    componentDidMount(){
      this.getDats();
    }
    
    getDats(){
        const filter = {
          keyword: $this.state.keyword,
          page: $this.state.page
        };
        axioApi.get('/api/catproduct/list?'+qs.stringify(filter)).then((res) => {
          $this.setState({
            posts: res.data.posts
          })
        });
    }
    tabRows(){
        return $this.state.posts.map(function(post){
            return <option value={post._id}>{post.name}</option>
        });
      }
  render() {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="parent_id"><strong>Danh mục cha</strong></label>
                <select className="form-control" onChange="this.changeParentId()" name="parent_id">
                    {this.tabRows()}
                </select>
            </div>
        </div>
    );
  }
}
export default ListCatProduct;
