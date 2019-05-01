import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import axioApi from './../../config/axioConfig';
import configUrl from './../../config/configUrl';
import qs from 'qs';
import CreatableSelect from 'react-select/lib/Creatable';

let $this;
class Create extends Component {
  constructor(props) {
      super(props); 
      this.toggle = this.toggle.bind(this);
      this.toggleFade = this.toggleFade.bind(this);
      this.toggle = this.toggle.bind(this);
      this.togglePrimary = this.togglePrimary.bind(this);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        primary: false,
        modal: false,
        name: '', description : '', tags : [], alltags : [], 
        author: '', imagePath: '', selectedFile: null,
        listCatProduct: [],
        gallerys: [],
        parent_id: '',
        imageNumber: '',
        keyname: '',
        path: '',
        _id: ''
      };
      $this = this;
  }

  toggle() {
    $this.setState({ collapse: !$this.state.collapse });
  }

  toggleFade() {
    $this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  //Hien thi modal primary
  togglePrimary() {
    this.showAllImage();
    this.setState({
      primary: !this.state.primary,
    });
  }
  //setup send data to serve
changeName(e){
    $this.setState({ name : e.target.value });
}
changeKeyname(e){
  $this.setState({ keyname : e.target.value });
}
changePath(e){
  $this.setState({ path : e.target.value });
}
changeDescription(e) {
  $this.setState({ description : e.target.value });
}
changeParentId(e) {
    $this.setState({ parent_id : e.target.value });
}
componentDidMount(){
  this.showAllImage();
  this.getAllImage();
  this.getListCat();
}
getListCat(){
  axioApi.get('/api/permission/getAll').then((res) => {
    //console.log(res.data)
    $this.setState({
      listCatProduct: res.data
    })
  });
}
savePost(){
  var postdata = {
    name: $this.state.name,
    keyname: $this.state.keyname,
    path: $this.state.path,
    description: $this.state.description,
    parent_id: $this.state.parent_id
  }
  axioApi.post('/api/permission/store', postdata).then((res) => {
    console.log(res.data);
    $this.props.history.push('/permission/index');
  });
}
//upload image
getAllImage(){
  axioApi.get('/api/gallery/getAll').then((res) => {
      $this.setState({
          gallerys : res.data
      });
  });
}
getIdImage(id){
  axioApi.get('/api/gallery/show/'+id).then((res) => {
    //console.log(res.data);
    $this.setState({
      imageNumber: res.data._id,
      imagePath: res.data.path
    });
  });
}
imageNumbers(){
  if($this.state.imageNumber!=''){
    return <input name='imageNumber' className="hidden" value={$this.state.imageNumber}/>;
  }else{
    return '';
  }
}
imagePath(){
  if($this.state.imagePath!=''){
    return <img src={configUrl.baseURL+$this.state.imagePath}/>;
  }else{
    return '';
  }
}
showAllImage(){
  return $this.state.gallerys.map(function(post, i){
      return <Col xs="6" sm="3" className="text-center flol">
      <div color="divItemImage warning">
        <img className="img100" src={configUrl.baseURL+post.path} data-path={post.path} data-id={post._id}
         onClick={(e) => $this.getIdImage(post._id)}/>
      </div>
      <div className="clearfix"></div>
      <Label>{post.name}</Label>
    </Col>
  });
}
tabRowsListCat(){
  return $this.state.listCatProduct.map(function(post){
      
      if(post._id==$this.state.parent_id){
        return <option value={post._id} selected>
        { post.name }
        </option>
      }else{
        return <option value={post._id}>
        { post.name }
        </option>
      } 
      
  });
}
render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Thêm quyền hạn</strong>
                <button onClick={this.savePost} className="btn btn-sm btn-primary flor">Cập nhật</button>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                  <Label htmlFor="name"><strong>Tên quyền hạn</strong></Label>
                  <Input type="text" onChange={this.changeName} id="name" placeholder="Tên quyền hạn" />
                </div>
                <div className="form-group">
                  <Label htmlFor="parent_id"><strong>Nhóm quyền hạn</strong></Label>
                  <select className="form-control" name="parent_id" onChange={this.changeParentId}>
                    <option value="">Chọn nhóm quyền hạn</option>
                    {this.tabRowsListCat()}
                  </select>
                </div>
                <div className="form-group">
                  <Label htmlFor="keyname"><strong>Ký hiệu quyền hạn</strong></Label>
                  <Input type="text" onChange={this.changeKeyname} id="keyname" placeholder="Ký hiệu quyền hạn" />
                </div>
                <div className="form-group">
                  <Label htmlFor="path"><strong>Đường dẫn</strong></Label>
                  <Input type="text" onChange={this.changePath} id="name" placeholder="Đường dẫn" />
                </div>
                <div className="form-group">
                  <Label htmlFor="description"><strong>Mô tả</strong></Label>
                  <Input type="textarea" onChange={this.changeDescription} name="description" id="description"
                        placeholder="Mô tả" rows="3"/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                className={'modal-primary modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.togglePrimary}>
            <button className="buttonUploadImage">
              Tải ảnh
              <input type="file" name="file" onChange={this.onChangeHandler}/>
            </button>
            
          </ModalHeader>
          <ModalBody>
           {this.showAllImage()}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.togglePrimary}>Cập nhật</Button>
            <Button color="secondary" onClick={this.togglePrimary}>Bỏ qua</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default Create;
