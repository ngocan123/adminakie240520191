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
        name : '', description : '', tags : [], alltags : [], 
        author : '', imagePath: '', selectedFile: null,
        _id: null,
        gallerys: [],
        listCatProduct: [],
        parent_id: '',
        style_id: '',
        link: '',
        keyname: '',
        title_seo: '',
        description_seo: '',
        keyword_seo: '',
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
changeLink(e){
  $this.setState({ link : e.target.value });
}
changeDescription(e){
  $this.setState({ description : e.target.value });
}
changeStyleId(e) {
    $this.setState({ style_id : e.target.value });
    if(e.target.value!=''){
      axioApi.get('/api/stylegallery/show/'+e.target.value).then((res) => {
        console.log(res.data)
        $this.setState({
            keyname: res.data.keyname,
        })
      })
    }else{
      $this.setState({
        keyname: null,
      })
    }
}
changeTitle_seo(e) {
  $this.setState({ title_seo : e.target.value });
}
changeDescription_seo(e) {
  $this.setState({ description_seo : e.target.value });
}
changeKeyword_seo(e) {
  $this.setState({ keyword_seo : e.target.value });
}
componentDidMount(){
  axioApi.get('/api/photo/show/'+$this.props.match.params.id).then((res) => {
    $this.setState({
        _id: res.data._id,
        name: res.data.name,
        keyname: res.data.keyname,
        description: res.data.description,
        style_id: res.data.style_id,
        link: res.data.link,
        imageNumber: res.data.imageNumber,
        imagePath: res.data.imagePath,
        title_seo: res.data.title_seo,
        description_seo: res.data.description_seo,
        keyword_seo: res.data.keyword_seo,
    });
  });
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
tabRowsListCat(){
  return $this.state.listCatProduct.map(function(post, index){
    if(post._id==$this.state.style_id){
      return <option value={post._id} dataParent={$this.state.style_id} selected>
      { post.name }
      </option>
    }else{
      return <option value={post._id} dataParent={$this.state.style_id}>
      { post.name }
      </option>
    }
  });
}

savePost(){
  var postdata = {
    name: $this.state.name,
    description: $this.state.description,
    keyname: $this.state.keyname,
    style_id: $this.state.style_id,
    link: $this.state.link,
    imageNumber: $this.state.imageNumber,
    imagePath: $this.state.imagePath,
  }
  axioApi.post('/api/photo/update/'+$this.state._id,postdata).then((res) => {
    $this.props.history.push('/photo/index');
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
    console.log(res.data);
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
getListCat(){
  axioApi.get('/api/stylegallery/getAll').then((res) => {
    $this.setState({
      listCatProduct: res.data
    })
  });
}
render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Sửa ảnh</strong>
                <button onClick={this.savePost} className="btn btn-sm btn-primary flor">Cập nhật</button>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                  <Label htmlFor="name"><strong>Tên ảnh</strong></Label>
                  <Input type="text" value={$this.state.name} onChange={this.changeName} id="name" placeholder="Tên ảnh" required />
                </div>
                <div className="form-group">
                  <Label htmlFor="name"><strong>Đường dẫn ảnh</strong></Label>
                  <Input type="text" value={$this.state.link} onChange={this.changeLink} id="name" placeholder="Đường dẫn ảnh" required />
                </div>
                <div className="form-group">
                  <Label htmlFor="style_id"><strong>Loại ảnh</strong></Label>
                  <select className="form-control" name="style_id" onChange={this.changeStyleId}>
                    <option value="">Loại ảnh</option>
                    {this.tabRowsListCat()}
                  </select>
                </div>
                <div className="form-group">
                    <Label htmlFor="image"><strong>Ảnh đại diện</strong></Label>
                    <div>
                      <Button color="primary" onClick={this.togglePrimary} className="mr-1">Chọn ảnh</Button>
                      <div className="showImage">{this.imagePath()}{this.imageNumbers()}
                      </div>
                    </div>
                </div>
                <div className="form-group">
                  <Label htmlFor="description"><strong>Mô tả</strong></Label>
                  <Input type="textarea" value={$this.state.description} onChange={this.changeDescription} name="description" id="description"
                        placeholder="Mô tả" rows="3"/>
                </div>
                <hr></hr>
                <div className="form-group">
                  <Label htmlFor="title_seo"><strong>Tiêu đề seo</strong></Label>
                  <Input type="text" value={$this.state.title_seo} onChange={this.changeTitle_seo} id="title_seo" placeholder="Tiêu đề seo" />
                </div>
                <div className="form-group">
                  <Label htmlFor="description_seo"><strong>Mô tả seo</strong></Label>
                  <Input type="textarea" value={$this.state.description_seo} onChange={this.changeDescription_seo} name="description_seo" id="description_seo"
                        placeholder="Mô tả seo" rows="3"/>
                </div>
                <div className="form-group">
                  <Label htmlFor="keyword_seo"><strong>Từ khóa seo</strong></Label>
                  <Input type="textarea" value={$this.state.keyword_seo} onChange={this.changeKeyword_seo} name="keyword_seo" id="keyword_seo"
                        placeholder="Từ khóa seo" rows="3"/>
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
