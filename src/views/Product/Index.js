import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import axioApi from './../../config/axioConfig'
import configUrl from './../../config/configUrl'
import { Link } from 'react-router-dom'
import qs from 'qs'
let $this
class IndexProduct extends Component {
    constructor(props){
		  super(props);
      this.state = {'posts' : [], author : '', 'page': 1, 'current': 1, 'pages': 1}
      $this = this; 
    }
    componentDidMount(){
      setTimeout(function(){
        axioApi.get('/api/auth/checkToken').then((res) => {
          $this.setState({
              author: res.data.id
          })
        }).catch((err) => {
          $this.props.history.push('/login')
        })
      }, 1500)
      this.getDats();
      document.addEventListener('scroll',this.trackScrolling)
    }
    
    getDats(){
        const filter = {
          keyword: $this.state.keyword,
          page: $this.state.page
        }
        axioApi.get('/api/product/list?'+qs.stringify(filter)).then((res) => {
          //console.log(res.data)
          $this.setState({
            posts: res.data.posts,
            current: res.data.current,
            pages: res.data.pages,
          })
          this.showPaginate();
          ///console.log($this.state.pages);
        });
    }
    deletePost(id){
        axioApi.post('/api/product/remove', {_id : id}).then((res) => {
            this.getDats();
        });
    }
    tabRows(){
      return $this.state.posts.map(function(post, i){
          return <Postlist post={post}/>
      });
    }
    changeKeyword(e){
      $this.setState({
        keyword : e.target.value
      })
      setTimeout(function(){
        $this.getDats()
      }, 500)
    }
    activePagination(page){
      $this.setState({
        page: page
      });
      //console.log($this.state.page);
      this.getDats();
    }
    //show paginate
    showPaginate(){
      let obj = [];
      //console.log($this.state.pages);
      for (let index = 1; index <= $this.state.pages; index++) {
        //varrindex[index] = index
        obj.push({p:index});
      }
      //console.log(obj);
      return obj.map(function(index, i){
        return <PaginationItem><PaginationLink onClick={() => $this.activePagination(index.p)} tag="button" data-id={parseInt(i)+parseInt(1)}>{parseInt(i)+parseInt(1)}</PaginationLink></PaginationItem>
      });
    }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách sản phẩm
                <Link to="/product/create"><button className="btn btn-sm btn-success flor"><i className="fa fa-plus" aria-hidden="true"></i> Thêm</button></Link>
              </CardHeader>
              <div className="h15"></div>
              <div>
                <div className="col-sm-4" className="col-sm-3 flol">
                    <input type="text" onBlur={this.changeKeyword} className="form-control" placeholder="Tên sản phẩm"/>
                </div>
              </div>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Danh mục</th>
                    <th>Hiển thị</th>
                    <th>Hành động</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.tabRows()}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    {this.showPaginate()}
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default IndexProduct;

class Postlist extends Component{
  constructor(props){
    super(props)

  }
  render(){
    return <tr>
        <td className="text-center wtd100"><img className="w8" src={configUrl.baseURL+ this.props.post.imagePath}/></td>
        <td>{this.props.post.name}</td>
        <td>{(this.props.post.category_id)? this.props.post.category_id.name : ''}</td>
        <td>{(this.props.post.author)? this.props.post.author.email : ''}</td>
        <td className="text-center" style={{width: "120px"}}>
            <Link to={"/product/edit/"+this.props.post._id}>
                <button className="btn btn-sm btn-warning mar-3"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            </Link>
            <button className="btn btn-sm btn-danger mar-3" onClick={() => $this.deletePost(this.props.post._id)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </td>                   
      </tr>; 
  }
}
