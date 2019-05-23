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
        name: '', description: '', tags: [], alltags : [], 
        author: '', imagePath: '', selectedFile: null,
        keyname: '',
        listCatProduct: [],
        gallerys: [],
        parent_id: null,
        imageNumber: '',
        title_seo: '',
        description_seo: '',
        keyword_seo: '',
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
  axioApi.get('/api/stylegallery/getAll').then((res) => {
    $this.setState({
      listCatProduct: res.data
    })
  });
}
savePost(){
  var postdata = {
    name: $this.state.name,
    description: $this.state.description,
    keyname: $this.state.keyname,
    parent_id: $this.state.parent_id,
    imageNumber: $this.state.imageNumber,
    imagePath: $this.state.imagePath,
  }
  axioApi.post('/api/stylegallery/store', postdata).then((res) => {
    $this.props.history.push('/stylegallery/index');
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
                <strong>Thêm loại ảnh</strong>
                <button onClick={this.savePost} className="btn btn-sm btn-primary flor">Cập nhật</button>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                  <Label htmlFor="name"><strong>Tên loại ảnh</strong></Label>
                  <Input type="text" onChange={this.changeName} id="name" placeholder="Tên lại ảnh" required />
                </div>
                <div className="form-group">
                  <Label><strong>Mã loại ảnh</strong></Label>
                  <Input type="text" name="keyname" onChange={this.changeKeyname} id="keyname" placeholder="Mã loại ảnh" required />
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
