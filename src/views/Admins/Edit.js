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
        gallerys: [],
        name: '',
        description: '',
        imagePath: '',
        selectedFile: null,
        imageNumber: '',
        phone: '',
        email: '',
        password: '',
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
  changePhone(e){
      $this.setState({ phone : e.target.value });
  }
  changeEmail(e){
      $this.setState({ email : e.target.value });
  }
  changePassword(e){
      $this.setState({ password : e.target.value });
  }
  changeDescription(e){
      $this.setState({ description : e.target.value });
  }
  componentDidMount(){
      this.showAllImage();
      this.getAllImage();
      this.getPosts();
      //console.log($this.props.match.params.id);
  }
  getPosts(){
    axioApi.get('/api/admin/show/'+$this.props.match.params.id).then((res) => {
      console.log(res.data);
      $this.setState({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          password: res.data.password,
          description: res.data.description,
          imagePath: res.data.imagePath,
          imageNumber: res.data.imageNumber
      });
    });
  }
  savePost(){
      var postdata = {
          name: $this.state.name,
          phone: $this.state.phone,
          email: $this.state.email,
          description: $this.state.description,
          imageNumber: $this.state.imageNumber,
          imagePath: $this.state.imagePath,
      }
      axioApi.post('/api/admin/update/'+$this.state._id,postdata).then((res) => {
          $this.props.history.push('/admin/index');
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
                <strong>Sửa tài khoản</strong>
                <button onClick={this.savePost} className="btn btn-sm btn-primary flor">Cập nhật</button>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                  <Label htmlFor="name"><strong>Họ Tên</strong></Label>
                  <Input type="text" value={$this.state.name} onChange={this.changeName} id="name" placeholder="Họ Tên" required />
                </div>
                <div className="form-group">
                    <Label htmlFor="imageNumber"><strong>Ảnh đại diện</strong></Label>
                    <div>
                      <Button color="primary" onClick={this.togglePrimary} className="mr-1">Chọn ảnh</Button>
                      <div className="showImage">{this.imagePath()}{this.imageNumbers()}
                      </div>
                    </div>
                </div>
                <Row>
                    <Col sm="6">
                        <div className="form-group">
                        <Label htmlFor="email"><strong>Email</strong></Label>
                        <Input type="email" value={$this.state.email} onChange={this.changeEmail} id="email" placeholder="Email" required />
                        </div>
                    </Col>
                    <Col sm="6">
                        <div className="form-group">
                        <Label htmlFor="phone"><strong>Điện thoại</strong></Label>
                        <Input type="text" value={$this.state.phone} onChange={this.changePhone} id="phone" placeholder="Điện thoại" required />
                        </div>
                    </Col>
                </Row>
                <div className="form-group">
                  <button className="btn btn-sm btn-success">Đổi mật khẩu</button>
                </div>
                <div className="form-group">
                  <Label htmlFor="description"><strong>Ghi chú</strong></Label>
                  <Input type="textarea" value={$this.state.description} onChange={this.changeDescription} name="description" id="description"
                        placeholder="Ghi chú" rows="3"/>
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
