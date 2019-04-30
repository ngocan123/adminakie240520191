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
        gallerys: [],
        parent_id: 0,
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
changeDescription(e){
  $this.setState({ description : e.target.value });
}
changeParentId = (selectedparentId) => {
    $this.setState({ parent_id : selectedparentId });
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
  this.showAllImage();
  this.getAllImage();
}
savePost(){
  var postdata = {
    name: $this.state.name,
    description: $this.state.description,
    parent_id: $this.state.parent_id,
    imageNumber: $this.state.imageNumber,
    imagePath: $this.state.imagePath,
    title_seo: $this.state.title_seo,
    description_seo: $this.state.description_seo,
    keyword_seo: $this.state.keyword_seo,
  }
  axioApi.post('/api/supplier/store',postdata).then((res) => {
    $this.props.history.push('/supplier/index');
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
      <div className="colItemImage">
        <div color="warning" className="divItemImage">
        <a title={post.filename}>
          <img className="img100" src={configUrl.baseURL+post.path} alt={post.filename} data-path={post.path} data-id={post._id}
          onClick={(e) => $this.getIdImage(post._id)}/>
          </a>
        </div>
      </div>
    </Col>
  });
}
onChangeHandler = event =>{
  const formData = new FormData();
  formData.append(
    'file', event.target.files[0]
  )
  axioApi.post('/api/gallery/store', formData,{}).then((res) => {
    this.showAllImage();
  })
}
render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Thêm nhà cung cấp</strong>
                <button onClick={this.savePost} className="btn btn-sm btn-primary flor">Cập nhật</button>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                  <Label htmlFor="name"><strong>Tên nhà cung cấp</strong></Label>
                  <Input type="text" onChange={this.changeName} id="name" placeholder="Tên nhà cung cấp" required />
                </div>
                <div className="form-group">
                    <Label htmlFor="description">Ảnh đại diện</Label>
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
                <hr></hr>
                <div className="form-group">
                  <Label htmlFor="title_seo"><strong>Tiêu đề seo</strong></Label>
                  <Input type="text" onChange={this.changeTitle_seo} id="title_seo" placeholder="Tiêu đề seo" />
                </div>
                <div className="form-group">
                  <Label htmlFor="description_seo"><strong>Mô tả seo</strong></Label>
                  <Input type="textarea" onChange={this.changeDescription_seo} name="description_seo" id="description_seo"
                        placeholder="Mô tả seo" rows="3"/>
                </div>
                <div className="form-group">
                  <Label htmlFor="description_seo"><strong>Từ khóa seo</strong></Label>
                  <Input type="textarea" onChange={this.changeKeyword_seo} name="keyword_seo" id="keyword_seo"
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
