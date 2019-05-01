import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import axioApi from './../../config/axioConfig'
import configUrl from './../../config/configUrl'
import { Link } from 'react-router-dom'
import qs from 'qs'

let $this;
class Index extends Component {
    constructor(props){
		  super(props);
      this.state = {'posts' : [], nameCat: '', author : '', 'page': 1, 'current': 1, 'pages': 1,}
      $this = this; 
    }
    componentDidMount(){
      this.getDats();
      console.log(this.state.nameCat)
    }
    
    getDats(){
        const filter = {
          keyword: $this.state.keyword,
          page: $this.state.page
        }
        axioApi.get('/api/permission/list?'+qs.stringify(filter)).then((res) => {
          $this.setState({
            posts: res.data.posts,
            current: res.data.current,
            pages: res.data.pages,
          })
          this.showPaginate();
          console.log($this.state.pages);
        });
    }
    deletePost(id){
        axioApi.post('/api/permission/remove', {_id : id}).then((res) => {
            $this.getDats()
        });
    }
    tabRows(){
      return $this.state.posts.map(function(post, i){
          return <tr>
          <td className="text-center wtd100" style={{width:"40px"}}>{i+1}</td>
          <td>{post.name}</td>
          <td>{post.keyname}</td>
          <td>{post.path}</td>
          <td className="text-center" style={{width:'120px'}}>
              <Link to={"/permission/edit/"+post._id}>
                  <button className="btn btn-sm btn-warning mar-3"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              </Link>
              <button className="btn btn-sm btn-danger mar-3" onClick={() => $this.deletePost(post._id)}>
                  <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
          </td>                   
        </tr>
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
      this.getDats();
    }
    //show paginate
    showPaginate(){
      //return 'ok';
      let obj = [];
      for (let index = 1; index <= $this.state.pages; index++) {
        obj.push({p:index});
      }
      // return obj.map(function(index, i){
      //   return <PaginationItem><PaginationLink onClick={() => $this.activePagination(index.p)} tag="button" data-id={parseInt(i)+parseInt(1)}>{parseInt(i)+parseInt(1)}</PaginationLink></PaginationItem>
      // });
      return obj.map((post, index) => 
        <PaginationItem><PaginationLink onClick={() => $this.activePagination(post.p)} tag="button" data-id={parseInt(index)+parseInt(1)}>{parseInt(index)+parseInt(1)}</PaginationLink></PaginationItem>
      );
    }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách quyền hạn
                <Link to="/permission/create"><button className="btn btn-sm btn-success flor"><i className="fa fa-plus" aria-hidden="true"></i> Thêm</button></Link>
              </CardHeader>
              <div className="h15"></div>
              <div>
                <div className="col-sm-3 flol">
                    <input type="text" onBlur={this.changeKeyword} className="form-control" placeholder="Tên danh mục hoặc mô tả"/>
                </div>
              </div>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên quyền hạn</th>
                    <th>Ký hiệu quyền hạn</th>
                    <th>Đường dẫn</th>
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
export default Index;
