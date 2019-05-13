import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import axioApi from './../../config/axioConfig'
import configUrl from './../../config/configUrl'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
// import Nestable from 'react-nestable';
//import Tree from './Tree';

import { Link } from 'react-router-dom'
import qs from 'qs'

const alertNodeInfo = ({ node, path, treeIndex }) => {
  const objectString = Object.keys(node)
    .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
    .join(',\n   ');
  //console.log(objectString)
  
  // global.alert(
  //   'Info passed to the button generator:\n\n' +
  //     `node: {\n   ${objectString}\n},\n` +
  //     `path: [${path.join(', ')}],\n` +
  //     `treeIndex: ${treeIndex}`
  // );
};

let $this;

class Index extends Component {
    constructor(props){
      super(props);
      
      this.state = {
        posts : [],
        listitems: [],
        treeData: [],
        renderItem: '', author : '', page: 1, current: 1, pages: 1
      }
      $this = this; 
    }
    componentDidMount(){
      this.getDats();
      this.getListMenu();
      // axioApi.get('/api/menu/listmenu').then((res) => {
      //   $this.setState({
      //     listitems: res.data,
      //     treeData: res.data
      //   })
      // });
    }
    loadEdit({ node, path, treeIndex }){
      const objectString = Object.keys(node)
      .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
      .join(',\n   ');
      //console.log(node);
      $this.props.history.push('/menu/edit/'+node._id);
    }
    getDats(){
        const filter = {
          keyword: $this.state.keyword,
          page: $this.state.page
        }
        axioApi.get('/api/menu/list?'+qs.stringify(filter)).then((res) => {
          $this.setState({
            posts: res.data.posts,
            current: res.data.current,
            pages: res.data.pages,
          })
          this.showPaginate();
        })
    }
    getListMenu(){
      axioApi.get('/api/menu/getAll').then((res) => {
        $this.setState({
          listitems: res.data,
          treeData: res.data
        })
      });
    }
    deletePost(id){
        axioApi.post('/api/menu/remove', {_id : id}).then((res) => {
          //console.log(res.data.post)
            $this.getDats()
        });
    }
    tabRows(){
      return $this.state.posts.map(function(post){
          
          return <tr>
          <td className="text-center wtd100"><img alt={post.imagePath} className="w8" src={configUrl.baseURL+ post.imagePath}/></td>
          <td>{post.name}</td>
          <td>{post.description}</td>
          <td>{(post.author)? post.author.email : ''}</td>
          <td className="text-center" style={{width:'120px'}}>
              <Link to={"/menu/edit/"+post._id}>
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
      let obj = [];
      for (let index = 1; index <= $this.state.pages; index++) {
        obj.push({p:index});
      }
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
                <i className="fa fa-align-justify"></i> Danh sách menu
                <Link to="/menu/create"><button className="btn btn-sm btn-success flor"><i className="fa fa-plus" aria-hidden="true"></i> Thêm</button></Link>
              </CardHeader>
              <div className="h15"></div>
              <div>
                <div className="col-sm-3 flol">
                    <input type="text" onBlur={this.changeKeyword} className="form-control" placeholder="Tên danh mục hoặc mô tả"/>
                </div>
              </div>
              <CardBody>
                <div style={{ height: 400 }}>
                  <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    generateNodeProps={rowInfo => ({
                      buttons: [
                        <button
                          className="btn btn-outline-success"
                          style={{
                            verticalAlign: 'middle',
                          }}
                          onClick={() => this.loadEdit(rowInfo)}
                        >
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>,
                        <button
                          className="btn btn-outline-danger"
                          style={{
                            verticalAlign: 'middle',
                          }}
                          onClick={() => this.loadEdit(rowInfo)}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      ],
                    })}
                  />
                </div>

                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Họ Tên</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Hành động</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.tabRows()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Index;
