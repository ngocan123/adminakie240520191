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
        style_id: null,
        link: '',
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
changeLink(e){
  $this.setState({ link : e.target.value });
}
// changeKeyname(e){
//   $this.setState({ keyname : e.target.value });
// }
changeDescription(e) {
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
    style_id: $this.state.style_id,
    link: $this.state.link,
    imageNumber: $this.state.imageNumber,
    imagePath: $this.state.imagePath,
  }
  console.log(postdata)
  axioApi.post('/api/photo/store', postdata).then((res) => {
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
    return <option value={post._id}>
    { post.name }
    </option>
      
  });
}
render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Thêm ảnh</strong>
                <button onClick={this.savePost} className="btn btn-sm btn-primary flor">Cập nhật</button>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                  <Label htmlFor="name"><strong>Tên ảnh</strong></Label>
                  <Input type="text" onChange={this.changeName} id="name" placeholder="Tên ảnh" required />
                </div>
                <div className="form-group">
                  <Label htmlFor="name"><strong>Đường dẫn ảnh</strong></Label>
                  <Input type="text" onChange={this.changeLink} id="link" placeholder="Đường dẫn ảnh" required />
                </div>
                <div className="form-group">
                  <Label htmlFor="style_id"><strong>Chọn loại ảnh</strong></Label>
                  <select className="form-control" name="style_id" onChange={this.changeStyleId}>
                  <option value="">Chọn loại ảnh</option>
                    {this.tabRowsListCat()}
                  </select>
                </div>
                <div className="form-group">
                    <Label htmlFor="description"><strong>Ảnh đại diện</strong></Label>
                    <div>
                      <Button color="primary" onClick={this.togglePrimary} className="mr-1">Chọn ảnh</Button>
                      <div className="showImage">{this.imagePath()}{this.imageNumbers()}
                      </div>
                    </div>
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
