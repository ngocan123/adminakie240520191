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
import configUrl from './../../config/configUrl';
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
        name : '', description : '', tags : [], alltags : [], author : '',
        selectedFile: null,
        listCatProduct: [],
        category_id: '',
        gallerys: [],
        imageNumber: '',
        imagePath: '',
        price: '',
        title_seo: '',
        description_seo: '',
        keyword_seo: '',
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
  togglePrimary() {
    this.showAllImage();
    this.setState({
      primary: !this.state.primary,
    });

  }
  //setup send data to serve
  changePrice(e){
    $this.setState({ price : e.target.value });
  }
  changeName(e){
    $this.setState({ name : e.target.value });
  }

  changeDescription(e){
      $this.setState({ description : e.target.value });
  }
  changeCategoryId(e){
    $this.setState({
      category_id: e.target.value
    });
  }
  tagsSelectChange = (selectedtag) => {
      $this.setState({ tags : selectedtag });
  }
  componentDidMount(){
      axioApi.get('/api/product/getAllTags').then((res) => {
          $this.setState({
              alltags : res.data
          });
      });
      this.getAllImage();
      this.getListCat();
  }
  getListCat(){
    axioApi.get('/api/catproduct/getAll').then((res) => {
      console.log(res.data)
      $this.setState({
        listCatProduct: res.data
      })
    });
  }
  tabRowsListCat(){
    return $this.state.listCatProduct.map(function(post){
      return <option value={post._id}>
      { post.name }
      </option>
        
    });
  }
  savePost(){
    const postdata = {
        name: $this.state.name,
        price: $this.state.price,
        price_old: $this.state.price_old,
        category_id: $this.state.category_id,
        imageNumber: $this.state.imageNumber,
        imagePath: $this.state.imagePath,
        description: $this.state.description,
        tags: $this.state.tags,
        //author : $this.state.author,
    }
    axioApi.post('/api/product/saveProductAndTag', postdata).then((res) => {
      $this.props.history.push('/product/index');
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
                <strong>Thêm sản phẩm</strong>
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
                    Dữ liệu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '6' })}
                    onClick={() => { this.toggle('6'); }}
                  >
                    Ảnh
                  </NavLink>
                </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                            <div className="form-group">
                              <Label htmlFor="name"><strong>Tên sản phẩm</strong></Label>
                              <Input type="text" onChange={this.changeName} id="name" placeholder="Tên sản phẩm" required />
                            </div>
                            <div className="form-group">
                              <Label htmlFor="description"><strong>Mô tả</strong></Label>
                              <Input type="textarea" onChange={this.changeDescription} name="description" id="description"
                                    placeholder="Mô tả" rows="3"/>
                            </div>
                            <hr></hr>
                            <div className="form-group">
                              <Label htmlFor="title_seo"><strong>Tiêu đề seo</strong></Label>
                              <Input type="text" onChange={this.changeName} id="title_seo" placeholder="Tiêu đề seo" />
                            </div>
                            <div className="form-group">
                              <Label htmlFor="description_seo"><strong>Mô tả seo</strong></Label>
                              <Input type="textarea" onChange={this.changeDescription} name="description_seo" id="description_seo"
                                    placeholder="Mô tả seo" rows="3"/>
                            </div>
                            <div className="form-group">
                              <Label htmlFor="description_seo"><strong>Từ khóa seo</strong></Label>
                              <Input type="textarea" onChange={this.changeDescription} name="keyword_seo" id="keyword_seo"
                                    placeholder="Từ khóa seo" rows="3"/>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="description"><strong>Tags sản phẩm</strong></Label>
                                <CreatableSelect
                                    isClearable
                                    onChange={this.tagsSelectChange}
                                    //onInputChange={this.handleInputChange}
                                    options={this.state.alltags}
                                    isMulti = {true}
                                />
                            </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="price"><strong>Giá sản phẩm</strong></Label>
                          <Input type="number" onChange={this.changePrice} id="price" placeholder="Giá sản phẩm" />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="price"><strong>Giá gốc</strong></Label>
                          <Input type="number" onChange={this.changePriceOld} id="price_old" placeholder="Giá gốc" />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="category_id"><strong>Danh mục sản phẩm</strong></Label>
                          <select className="form-control" name="category_id" onChange={this.changeCategoryId}>
                            <option value="">Danh mục sản phẩm</option>
                            {this.tabRowsListCat()}
                          </select>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="category_id"><strong>Danh mục sản phẩm</strong></Label>
                          
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="6">
                    <Row>
                      <Col sm="6">
                        <div className="form-group">
                            <Label htmlFor="image"><strong>Ảnh đại diện</strong></Label>
                            <div>
                              <Button color="primary" onClick={this.togglePrimary} className="mr-1">Chọn ảnh</Button>
                              <div className="showImage">
                                {this.imagePath()}{this.imageNumbers()}
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
    );
  }
}
export default Create;


