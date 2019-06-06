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
} from 'reactstrap'
//import ManagerGallery from './../Gallery/ManagerGallery';
import Select from 'react-select'
import axioApi from './../../config/axioConfig'
import configUrl from './../../config/configUrl'
import CreatableSelect from 'react-select/lib/Creatable'
import classnames from 'classnames'
//Ckeditor
import CKEditor from 'ckeditor4-react'
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
        name: '', description: '', detail: '', tags: [], alltags: [], author: '',
        selectedFile: null,
        listCatProduct: [],
        listSupplier: [],
        category_id: null,
        supplier_id: null,
        dataSupplier: {value: "",label: "Chọn nhà cung cấp"},
        style_ids: [],
        listStyleProduct: [],
        dataStyle: [],
        gallerys: [],
        imageNumber: '',
        imagePath: '',
        price: 0,
        price_old: 0,
        _id: '',
        title_seo: '',
        description_seo: '',
        keyword_seo: ''
      };
      $this = this
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
changePriceOld(e){
  $this.setState({ price_old: e.target.value });
}
changeCode(e){
  $this.setState({ code: e.target.value });
}
changeName(e){
  $this.setState({ name : e.target.value });
}
changeDescription(e){
  $this.setState({ description : e.editor.getData() });
}
changeDetail(e){
$this.setState({ detail : e.editor.getData() });
}
changeCategoryId(e) {
  $this.setState({ category_id : e.target.value });
}
changeSupplierId = (vsup) => {
  $this.setState({
    supplier_id: vsup.value,
    dataSupplier: {value: vsup.value, label: vsup.label}
  })
}
changeStyleProductId = (vsup) => {
  console.log(vsup)
  $this.setState({
    styles_id: vsup
  })
}

tagsSelectChange = (selectedtag) => {
    $this.setState({ tags : selectedtag })
}
componentDidMount(){
    this.getItemPost();
    axioApi.get('/api/product/getAllTags').then((res) => {
        $this.setState({
            alltags : res.data,
        })
    })
    this.getAllImage()
    this.getListCat()
    this.getListSupplier()
    this.getListStyle()
}
onChangeHandler = event=>{
  this.setState({
    selectedFile: event.target.files[0],
    loaded: 0,
  })
}
getItemPost(){
  $this.setState({
      _id: $this.props.match.params.id
  });
  axioApi.get('/api/product/show/'+$this.props.match.params.id).then((res) => {
      const tags = res.data.data.tags.map(function(obj, i){
          return {value: obj._id, label:obj.label};
      })
      // Hiển thị loại sản phẩm
      const dataStyle = res.data.listStyle.map(function(obj, i){
        return {value: obj._id, label:obj.name};
      })
      if(res.data.itemSupplier){
        let dataSupplier = {id:res.data.itemSupplier._id,label:res.data.itemSupplier.name}
        $this.setState({
          dataSupplier: dataSupplier
        })
      }
      if(res.data.data.category_id){
        $this.setState({
          category_id: res.data.data.category_id._id
        });
      }
      $this.setState({
          _id: res.data.data._id,
          name: res.data.data.name,
          code: res.data.data.code,
          detail: res.data.data.detail,
          description: res.data.data.description,
          price: res.data.data.price,
          price_old: res.data.data.price_old,
          imageNumber: res.data.data.imageNumber,
          imagePath: res.data.data.imagePath,
          tags: tags,
          dataStyle: dataStyle
      });
  });
}
//Lấy danh sách danh mục sản phẩm
getListCat(){
  axioApi.get('/api/catproduct/getAll').then((res) => {
    $this.setState({
      listCatProduct: res.data
    })
  });
}
tabRowsListCat(){
  return $this.state.listCatProduct.map(function(post){
    if(post._id==$this.state.category_id){
      return <option value={post._id} data-parent={$this.state.category_id} selected>
      { post.name }
      </option>
    }else{
      return <option value={post._id} data-parent={$this.state.category_id}>
      { post.name }
      </option>
    }
  });
}
//Kết thúc lấy danh sách sản phẩm
//Danh sách nhà cung cấp
getListSupplier(){
  axioApi.get('/api/supplier/getAll').then((res) => {

    $this.setState({
      listSupplier: res.data
    })
  })
}
//Danh sách loại sản phẩm
getListStyle(){
  axioApi.get('/api/styleproduct/getAll').then((res) => {
    // console.log(res.data)
    $this.setState({
      listStyleProduct: res.data
    })
  })
}
tabRowsSupplier(){
  return $this.state.listSupplier.map(function(post){
    return <option value={post._id}>
    { post.name }
    </option>
  })
}
savePost(){
  const postdata = {
      _id: $this.state._id,
      name: $this.state.name,
      category_id: $this.state.category_id,
      price: $this.state.price,
      price_old: parseInt($this.state.price_old),
      imageNumber: $this.state.imageNumber,
      imagePath: $this.state.imagePath,
      description: $this.state.description,
      tags: $this.state.tags,
      //author : $this.state.author,
  }
  postdata.tags = postdata.tags.map(function(t){
      return t.label
  })
  console.log(postdata);
  axioApi.post('/api/product/saveProductAndTagAsync', postdata).then((res) => {
    console.log(res.data)
    //$this.props.history.push('/product/index');
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
      <div color="divItemImage warning">
        <img className="img100" src={configUrl.baseURL+post.path} data-path={post.path} data-id={post._id}
         onClick={(e) => $this.getIdImage(post._id)}/>
      </div>
      <div className="clearfix"></div>
      <Label>{post.name}</Label>
    </Col>
  });
}
render() {
    return (
      <div className="animated fadeIn">
      
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>Sửa sản phẩm</strong>
              <button onClick={this.savePost} className="btn btn-sm btn-primary flor">Cập nhật</button>
            </CardHeader>
            <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  <strong>Chung</strong>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  <strong>Dữ liệu</strong>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '6' })}
                  onClick={() => { this.toggle('6'); }}
                >
                  <strong>Ảnh</strong>
                </NavLink>
              </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                          <div className="form-group">
                            <Label htmlFor="name"><strong>Tên sản phẩm</strong></Label>
                            <Input type="text" value={$this.state.name} onChange={this.changeName} id="name" placeholder="Tên sản phẩm" required />
                          </div>
                          {/* <div className="form-group">
                            <Label htmlFor="description"><strong>Mô tả</strong></Label>
                            <Input type="textarea" value={this.state.description} onChange={this.changeDescription} name="description" id="description"
                                  placeholder="Mô tả" rows="3"/>
                          </div> */}
                          <div className="form-group">
                            <Label htmlFor="description"><strong>Mô tả</strong></Label>
                            <CKEditor
                                data={this.state.description}
                                onChange={this.changeDescription}
                                placeholder="Mô tả sản phẩm"
                                config={ {
                                    toolbar: [ [ 'Source','Bold', 'Italic', 'TextColor', 'BgColor', 'Styles', 'Font', 'Format', 'FontSize', 'NumberedList', 'BulletedList' ] ]
                                } }
                            />
                          </div>
                          <div className="form-group">
                              <Label htmlFor="detail"><strong>Chi tiết</strong></Label>
                              <CKEditor
                                  data={$this.state.detail}
                                  onChange={this.changeDetail}
                              />
                            </div>
                          <hr></hr>
                          <div className="form-group">
                            <Label htmlFor="title_seo"><strong>Tiêu đề seo</strong></Label>
                            <Input type="text" value={this.state.title_seo} onChange={this.changeName} id="title_seo" placeholder="Tiêu đề seo" />
                          </div>
                          <div className="form-group">
                            <Label htmlFor="description_seo"><strong>Mô tả seo</strong></Label>
                            <Input type="textarea" value={this.state.description_seo} onChange={this.changeDescriptionSeo} name="description_seo" id="description_seo"
                                  placeholder="Mô tả seo" rows="3"/>
                          </div>
                          <div className="form-group">
                            <Label htmlFor="description_seo"><strong>Từ khóa seo</strong></Label>
                            <Input type="textarea" value={this.state.keyword_seo} onChange={this.changeKeywordSeo} name="keyword_seo" id="keyword_seo"
                                  placeholder="Từ khóa seo" rows="3"/>
                          </div>
                          <div className="form-group">
                              <Label htmlFor="Tagsproduct"><strong>Tags sản phẩm</strong></Label>
                              <CreatableSelect
                                  isClearable
                                  onChange={this.tagsSelectChange}
                                  //onInputChange={this.handleInputChange}
                                  options={this.state.alltags}
                                  value={this.state.tags}
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
                        <Input type="number" value={this.state.price} onChange={this.changePrice} id="price" placeholder="Giá sản phẩm" />
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <Label htmlFor="price_old"><strong>Giá gốc</strong></Label>
                        <Input type="number" value={this.state.price_old} onChange={this.changePriceOld} id="price_old" placeholder="Giá gốc" />
                      </div>
                    </Col>
                    <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="code"><strong>Mã sản phẩm</strong></Label>
                          <Input type="text" value={$this.state.code} onChange={this.changeCode} name="code" id="code" placeholder="Mã sản phẩm" />
                        </div>
                      </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <Label htmlFor="parent_id"><strong>Danh mục sản phẩm</strong></Label>
                        <select className="form-control" name="parent_id" onChange={this.changeCategoryId}>
                          <option value="">Danh mục sản phẩm</option>
                          {this.tabRowsListCat()}
                        </select>
                      </div>
                    </Col>
                    <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="supplier_id"><strong>Nhà cung cấp</strong></Label>
                          <Select
                              isMulti= {false}
                              placeholder= "Chọn nhà cung cấp"
                              onChange= {this.changeSupplierId}
                              options= {$this.state.listSupplier}
                              value= {$this.state.dataSupplier}
                            />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="styles_id"><strong>Loại sản phẩm</strong></Label>
                          <Select
                              isClearable
                              onChange={this.changeStyleProductId}
                              //onInputChange={this.handleInputChange}
                              options={this.state.listStyleProduct}
                              value={this.state.dataStyle}
                              isMulti = {true}
                            />
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
                          <div className="showImage">{this.imagePath()}{this.imageNumbers()}
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
      )
  }
}
export default Create;


