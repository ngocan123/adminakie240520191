import React, { Component } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
  Button, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
//import ManagerGallery from './../Gallery/ManagerGallery';
import axioApi from './../../config/axioConfig';
import CreatableSelect from 'react-select/lib/Creatable';
import classnames from 'classnames';
let $this;
class Create extends Component {
  constructor(props, context) {
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
        activeTab: '1',
        name : '', description : '', author : '',
        selectedFile: null,
        imageName: '',
        namecompany: '',
        address: '',
        hotline: '',
        phone: '',
        website: '',
        email: '',
        zalo: '',
        facebook: '',
        gplus: '',
        gallerys: [],
        lang: 'vi',
        slogan: '',
        title_seo: '',
        description_seo: '',
        keyword_seo: ''
      };
      $this = this;
  }

  toggle(tab) {
    $this.setState({ collapse: !$this.state.collapse });
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleFade() {
    $this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  //Hien thi modal primary
  togglePrimary(e) {
    this.setState({
      imageName: e.target.value
    });
    this.showAllImage();
    this.setState({
      primary: !this.state.primary,
    });
  }
  //setup send data to serve
  changeName(e){
    $this.setState({ name : e.target.value });
  }
  changeSlogan(e){
    $this.setState({
      slogan: e.target.value
    });
  }
  changeEmail(e){
    $this.setState({
      email: e.target.value
    });
  }
  changePhone(e){
    $this.setState({
      phone: e.target.value
    });
  }
  changeHotline(e){
    $this.setState({
      hotline: e.target.value
    });
  }
  changeAddress(e){
    $this.setState({
      address: e.target.value
    });
  }
  changeTitle_seo(e){
    $this.setState({
      title_seo: e.target.value
    });
  }
  changeDescription_seo(e){
    $this.setState({
      description_seo: e.target.value
    });
  }
  changeKeyword_seo(e){
    $this.setState({
      keyword_seo: e.target.value
    });
  }
  changeLogo(e){
    $this.setState({
      logo: e.target.value
    });
  }
  changeFavicon(e){
    $this.setState({
      favicon: e.target.value
    });
  }
  changeWebsite(e){
    $this.setState({
      website: e.target.value
    })
  }
  changeFacebook(e){
    $this.setState({
      facebook: e.target.value
    })
  }
  changeZalo(e){
    $this.setState({
      zalo: e.target.value
    })
  }
  changeLinken(e){
    $this.setState({
      linken: e.target.value
    })
  }
  changeTwitcher(e){
    $this.setState({
      twitcher: e.target.value
    })
  }
  changeGplus(e){
    $this.setState({
      gplus: e.target.value
    })
  }
  componentDidMount(){
    this.getItemPost();
    this.getAllImage();
  }
  getItemPost(){
    $this.setState({
        lang: $this.props.match.params.lang
    });
    axioApi.get('/api/setting/show/'+$this.props.match.params.lang).then((res) => {
      $this.setState({
        lang: res.data.lang,
        name : res.data.name,
        slogan : res.data.slogan,
        namecompany : res.data.namecompany,
        address : res.data.address,
        logo : res.data.logo,
        favicon : res.data.favicon,
        hotline : res.data.hotline,
        phone : res.data.phone,
        email : res.data.email,
        facebook : res.data.facebook,
        gplus : res.data.gplus,
        website : res.data.website,
        title_seo : res.data.title_seo,
        description_seo : res.data.description_seo,
        keyword_seo : res.data.keyword_seo,
      });
      if(res.data.logo){
        $this.setState({
          logoNumber: res.data.logo,
          logoPath: res.data.logo.path
        })
      }
      if(res.data.favicon){
        $this.setState({
          faviconNumber: res.data.favicon,
          faviconPath: res.data.favicon.path
        })
      }
    });
  }

  savePost(){
    const postdata = {
        lang: $this.props.match.params.lang,
        slogan: $this.state.slogan,
        name : $this.state.name,
        namecompany : $this.state.namecompany,
        address : $this.state.address,
        logo : $this.state.logoNumber,
        favicon : $this.state.faviconNumber,
        hotline : $this.state.hotline,
        phone : $this.state.phone,
        email : $this.state.email,
        facebook : $this.state.facebook,
        zalo: $this.state.zalo,
        gplus : $this.state.gplus,
        website : $this.state.website,
        title_seo : $this.state.title_seo,
        description_seo : $this.state.description_seo,
        keyword_seo : $this.state.keyword_seo,
        //author : $this.state.author,
    }
    axioApi.post('/api/setting/update/'+$this.props.match.params.lang, postdata).then((res) => {
      //console.log(res);
      window.location.reload();
      //$this.props.history.push('/setting/'+res.data.lang);
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
    if(this.state.imageName == 'logo'){
      $this.setState({
        logoNumber: res.data._id,
        logoPath: res.data.path
      });
    }else if(this.state.imageName == 'favicon'){
      $this.setState({
        faviconNumber: res.data._id,
        faviconPath: res.data.path
      });
    }else{
      $this.setState({
        logoNumber: '',
        logoPath: '',
        faviconNumber: '',
        faviconPath: ''
      });
    }
    //console.log($this.state.logoNumber);
  });
}

logoNumbers(){
  
  if($this.state.logoNumber!=''){
    return <input name='logo' className="hidden" value={$this.state.logoNumber}/>;
  }else{
    return '';
  }
}
logoPath(){
  if($this.state.logoPath!=''){
    return <img src={"http://localhost:3008/"+$this.state.logoPath}/>;
  }else{
    return '';
  }
}
faviconNumbers(){
  if($this.state.faviconNumber!=''){
    return <input name='favicon' className="hidden" value={$this.state.faviconNumber}/>;
  }else{
    return '';
  }
}
faviconPath(){
  if($this.state.faviconPath!=''){
    return <img src={"http://localhost:3008/"+$this.state.faviconPath}/>;
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
          <img className="img100" src={'http://localhost:3008'+post.path} alt={post.filename} data-path={post.path} data-id={post._id}
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
              <strong>Cấu hình chung</strong>
              <button onClick={this.savePost} className="btn btn-sm btn-primary flor">Cập nhật</button>
            </CardHeader>
            <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Chung
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Mạng online
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Hình ảnh
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                        <div className="form-group">
                            <Label htmlFor="name"><strong>Tên website</strong></Label>
                            <Input type="text" value={$this.state.name} onChange={this.changeName} name="name" id="name" placeholder="Tên website" required />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="slogan"><strong>Slogan</strong></Label>
                            <Input type="text" value={$this.state.slogan} onChange={this.changeSlogan} name="slogan" id="slogan"
                                placeholder="Slogan"/>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="email"><strong>Email</strong></Label>
                            <Input type="text" value={this.state.email} onChange={this.changeEmail} name="email" id="email"
                                placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col sm="6">
                                    <Label htmlFor="phone"><strong>Phone</strong></Label>
                                        <Input type="text" value={this.state.phone} onChange={this.changePhone} name="phone" id="phone"
                                            placeholder="Phone"/>
                                </Col>
                                <Col sm="6">
                                    <Label htmlFor="email"><strong>Hotline</strong></Label>
                                    <Input type="text" value={this.state.hotline} onChange={this.changeHotline} name="hotline" id="hotline"
                                            placeholder="Hotline"/>
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="address"><strong>Address</strong></Label>
                            <Input type="text" value={this.state.address} onChange={this.changeAddress} name="address" id="address"
                                placeholder="Address"/>
                        </div>
                        <hr></hr>
                        <div className="form-group">
                            <Label htmlFor="title_seo"><strong>Tiêu đề seo</strong></Label>
                            <Input type="text" value={this.state.title_seo} onChange={this.changeTitle_seo} id="title_seo" placeholder="Tiêu đề seo" />
                        </div>
                        <div className="form-group">
                        <Label htmlFor="description_seo"><strong>Mô tả seo</strong></Label>
                        <Input type="textarea" value={this.state.description_seo} onChange={this.changeDescription_seo} name="description_seo" id="description_seo"
                                placeholder="Mô tả seo" rows="3"/>
                        </div>
                        <div className="form-group">
                        <Label htmlFor="description_seo"><strong>Từ khóa seo</strong></Label>
                        <Input type="textarea" value={this.state.keyword_seo} onChange={this.changeKeyword_seo} name="keyword_seo" id="keyword_seo"
                                placeholder="Từ khóa seo" rows="3"/>
                        </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                    <div className="form-group">
                        <Row>
                            <Col sm="6">
                                <Label htmlFor="website"><strong>Website</strong></Label>
                                    <Input type="text" value={this.state.website} onChange={this.changeWebsite} name="website" id="website"
                                        placeholder="website"/>
                            </Col>
                            <Col sm="6">
                                <Label htmlFor="facebook"><strong>Facebook</strong></Label>
                                <Input type="text" value={this.state.facebook} onChange={this.changeFacebook} name="facebook" id="facebook"
                                        placeholder="Facebook"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <Label htmlFor="zalo"><strong>Zalo</strong></Label>
                                    <Input type="text" value={this.state.zalo} onChange={this.changeZalo} name="zalo" id="zalo"
                                        placeholder="Zalo"/>
                            </Col>
                            <Col sm="6">
                                <Label htmlFor="gplus"><strong>Gplus</strong></Label>
                                <Input type="text" value={this.state.gplus} onChange={this.changeGplus} name="gplus" id="gplus"
                                        placeholder="G+"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <Label htmlFor="linken"><strong>Linken</strong></Label>
                                    <Input type="text" value={this.state.linken} onChange={this.changeLinken} name="linken" id="linken"
                                        placeholder="Linken"/>
                            </Col>
                            <Col sm="6">
                                <Label htmlFor="twitcher"><strong>Twitcher</strong></Label>
                                <Input type="text" value={this.state.twitcher} onChange={this.changeTwitcher} name="twitcher" id="twitcher"
                                        placeholder="Twitcher"/>
                            </Col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="6">
                            <div className="form-group">
                                <Label htmlFor="logo"><strong>Logo</strong></Label>
                                <div>
                                    <Button color="primary" value="logo" onClick={this.togglePrimary} className="mr-1">Chọn ảnh</Button>
                                    <div className="showImage">{this.logoPath()}{this.logoNumbers()}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="form-group">
                                <Label htmlFor="favicon"><strong>Favicon</strong></Label>
                                <div>
                                    <Button color="primary" value="favicon" onClick={this.togglePrimary} className="mr-1">Chọn ảnh</Button>
                                    <div className="showImage">{this.faviconPath()}{this.faviconNumbers()}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
              className={'modal-primary modal-lg ' + this.props.className}>
        <ModalHeader toggle={this.togglePrimary}>
            <button className="buttonUploadImage">
                Tải ảnh <input type="file" name="file" onChange={this.onChangeHandler}/>
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
      )
  }
}
export default Create;