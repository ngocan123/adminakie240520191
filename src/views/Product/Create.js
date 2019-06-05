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
import Tabs from 'react-bootstrap/Tabs'
import Select from 'react-select'
import axioApi from './../../config/axioConfig'
import configUrl from './../../config/configUrl'
import CreatableSelect from 'react-select/lib/Creatable'
import classnames from 'classnames'
//ckeditor
import CKEditor from 'ckeditor4-react';
//import CKEditor from '@ckeditor/ckeditor5-react'
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
let $this;
class Create extends Component {
  constructor(props, context) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.toggleFade = this.toggleFade.bind(this);
      this.toggle = this.toggle.bind(this);
      this.togglePrimary = this.togglePrimary.bind(this);
      this.state = {
        typeImage: '',
        collapse: true,
        fadeIn: true,
        timeout: 300,
        primary: false,
        modal: false,
        activeTab: '1',
        activeTabs: '11',
        name : '', description : '', tags : [], alltags : [], author : '',
        selectedFile: null,
        listCatProduct: [],
        listSupplier: [],
        category_id: null,
        supplier_id: null,
        style_ids: [],
        listStyleProduct: [],
        gallerys: [],
        imageNumber: '',
        imagePath: '',
        imageArray: [],
        imageArrayData: [],
        price: 0,
        price_old: 0,
        code: '',
        detail: '',
        title_seo: '',
        description_seo: '',
        keyword_seo: '',
        //thuộc tính
        getTypeOptionValue: '',
        displayOption: {display: "none"}
      }
      this.getIdImage = this.getIdImage.bind(this)
      this.typeOptionChange = this.typeOptionChange.bind(this)
      this.displayTypeOption = []
      $this = this;
  }
  //xử lý option
  typeOptionChange(e){
    console.log(e.target.getAttribute('value'))
    $this.setState({
      displayOption: {display:"none"}
    })
    $this.setState({
      getTypeOptionValue: e.target.getAttribute('value')
    })
    this.displayTypeOption.push(<div className="display-type-option"><pre>{e.target.getAttribute('value')}</pre></div>)
  }
  inputOptionOnclick(){
    $this.setState({
      displayOption: {display:"block"}
    })
  }
  removeTypeOption(e){
    console.log(e.target.getAttribute('data-key'))
  }          
  toggle(tab) {
    $this.setState({ collapse: !$this.state.collapse })
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  //tab loại thược tính
  toggles(tab) {
    $this.setState({ collapse: !$this.state.collapse })
    if (this.state.activeTabs !== tab) {
      this.setState({
        activeTabs: tab
      });
    }
  }

  toggleFade() {
    $this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  //Hien thi modal primary
  togglePrimary(e) {
    console.log(e.target.getAttribute('data-type'))
    this.showAllImage()
    this.setState({
      typeImage: e.target.getAttribute('data-type'),
      primary: !this.state.primary,
    })
  }
  //setup send data to serve
  changePrice(e){
    $this.setState({ price: e.target.value });
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
    console.log(e.editor.getData())
    $this.setState({ description : e.editor.getData() });
  }
  changeDetail(e){
    //console.log(e.editor.getData())
    $this.setState({ detail : e.editor.getData() });
  }
  changeCategoryId(e){
    $this.setState({
      category_id: e.target.value
    });
  }
  changeSupplierId = (vsup) => {
    $this.setState({
      supplier_id: vsup.value
    });
  }
  changeStyleProductId = (vsup) => {
    $this.setState({
      styles_id: vsup
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
      this.getListSupplier();
      this.getListStyle();
      this.getSldierImage();
  }
  //Danh sách danh mục
  getListCat(){
    axioApi.get('/api/catproduct/getAll').then((res) => {
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
        name: $this.state.name,
        code: $this.state.code,
        price: $this.state.price,
        price_old: $this.state.price_old,
        category_id: $this.state.category_id,
        supplier_id: $this.state.supplier_id,
        styles_id: $this.state.styles_id,
        imageNumber: $this.state.imageNumber,
        imagePath: $this.state.imagePath,
        imageArray: $this.state.imageArray,
        description: $this.state.description,
        detail: $this.state.detail,
        tags: $this.state.tags,
        //author : $this.state.author,
    }
    //console.log(postdata);
    // postdata.tags = postdata.tags.map(function(t){
    //     return t.label
    // })
    axioApi.post('/api/product/saveProductAndTag', postdata).then((res) => {
      //console.log(res.data)
      $this.props.history.push('/product/index')
    });
  }
  getSldierImage(){
    let dataId = $this.state.imageArray
    axioApi.get('/api/gallery/listDataWithId?dataId='+dataId).then((res) => {
      const datas = res.data
      this.setState({
        imageArrayData: res.data
      })
      
    })
  }
  removeItemSliderImage(id){
    let index = $this.state.imageArray.indexOf(id)
    let datas = $this.state.imageArray
    //console.log(datas.length)
    if(datas.length<=1){
      //alert('hết ảnh')
      $this.setState({
        imageArray: []
      })
      this.getSldierImage()
    }else{
      datas.splice(index, 1)
      $this.setState({
        imageArray: datas
      })
      this.getSldierImage()
    }
    //this.getSldierImage()
  }
  showSliderImage(){
    if($this.state.imageArrayData.length>0){
      return $this.state.imageArrayData.map(function(post){
        return <tr value={post._id}>
        <td><img style={{width: "80px",height: "80px"}} src={configUrl.baseURL+post.path} /></td>
        <td><input className="form-control" name="" data-value={post._id} data-sort="" /></td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={(e) => $this.removeItemSliderImage(post._id)} data-value={post._id}>
            <i className="fa fa-minus-circle" aria-hidden="true"></i>
          </button>
        </td>
        </tr>
      })
    }else{
      return ""
    }
    
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
      if($this.state.typeImage=='itemImage'){
        $this.setState({
          imageNumber: res.data._id,
          imagePath: res.data.path
        })
      }else if($this.state.typeImage=='galleryImage'){
        if($this.state.imageArray.indexOf(res.data._id)<0){
          var dataGallery = $this.state.imageArray.concat(res.data._id)
          $this.setState({
            imageArray: dataGallery
          })
          this.getSldierImage()
        }else{
          alert('Đã tồn tại ảnh')
        }
      }
      
    })
    //this.getSldierImage()
  }
  imageNumbers(){
    if($this.state.imageNumber!=''){
      return <input name='imageNumber' className="hidden" value={$this.state.imageNumber}/>
    }else{
      return ''
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
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '8' })}
                    onClick={() => { this.toggle('8'); }}
                  >
                  <strong>Thuộc tính</strong>
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
                              <CKEditor
                                  data=""
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
                                  data=""
                                  onChange={this.changeDetail}
                                  scriptUrl="http://dummy.com/ckeditor/ckeditor.js"
                              />
                              {/* <CKEditor
                                  editor={ ClassicEditor }
                                  data="<p>Hello from CKEditor 5!</p>"
                                  onInit={ editor => {
                                      // You can store the "editor" and use when it is needed.
                                      console.log( 'Editor is ready to use!', editor );
                                  } }
                                  onChange={ ( event, editor ) => {
                                      const data = editor.getData();
                                      console.log( { event, editor, data } );
                                  } }
                                  onBlur={ editor => {
                                      console.log( 'Blur.', editor );
                                  } }
                                  onFocus={ editor => {
                                      console.log( 'Focus.', editor );
                                  } }
                              /> */}
                            </div>
                            <hr></hr>
                            <div className="form-group">
                              <Label htmlFor="title_seo"><strong>Tiêu đề seo</strong></Label>
                              <Input type="text" onChange={this.changeName} id="title_seo" placeholder="Tiêu đề seo" />
                            </div>
                            <div className="form-group">
                              <Label htmlFor="description_seo"><strong>Mô tả seo</strong></Label>
                              <Input type="textarea" onChange={this.changeDescriptionSeo} name="description_seo" id="description_seo"
                                    placeholder="Mô tả seo" rows="3"/>
                            </div>
                            <div className="form-group">
                              <Label htmlFor="description_seo"><strong>Từ khóa seo</strong></Label>
                              <Input type="textarea" onChange={this.changeKeywordSeo} name="keyword_seo" id="keyword_seo"
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
                          <Label htmlFor="price_old"><strong>Giá gốc</strong></Label>
                          <Input type="number" onChange={this.changePriceOld} id="price_old" placeholder="Giá gốc" />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="code"><strong>Mã sản phẩm</strong></Label>
                          <Input type="text" onChange={this.changeCode} name="code" id="code" placeholder="Mã sản phẩm" />
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
                          <Label htmlFor="supplier_id"><strong>Nhà cung cấp</strong></Label>
                          <Select
                              name="supplier_id"
                              isMulti = {false}
                              onChange = {this.changeSupplierId}
                              options = {$this.state.listSupplier}
                            />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <Label htmlFor="styles_id"><strong>Loại sản phẩm</strong></Label>
                          <Select
                              name="styles_id[]"
                              isMulti = {true}
                              placeholder = "Loại sản phẩm"
                              onChange = {this.changeStyleProductId}
                              options = {$this.state.listStyleProduct}
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
                              <Button color="primary" onClick={this.togglePrimary} data-type="itemImage" className="mr-1">Chọn ảnh</Button>
                              <div className="showImage">
                                {this.imagePath()}{this.imageNumbers()}
                              </div>
                            </div>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                            <Label htmlFor="image"><strong>Ảnh slider</strong></Label>
                            <div className="clearfix">
                              <Button color="primary" onClick={this.togglePrimary} data-type="galleryImage" className="mr-1">Chọn ảnh</Button>
                              
                            </div>
                            <div className="listImage clearfix">
                              <table className="table table-bordered table-hover">
                                <thead>
                                  <tr>
                                    <th>Ảnh</th>
                                    <th>Sắp xếp</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.showSliderImage()}
                                </tbody>
                              </table>
                            </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="8">
                    <Row>

                      <Col sm="12">
                        <div className="col-sm-3" style={{float:"left"}}>
                          <Nav tabs className="box-tab-option">
                            <NavItem style={{display: "block",width:"100%"}}>
                            
                              <NavLink
                                className={classnames({ active: this.state.activeTabs === '1' })}
                                onClick={() => { this.toggles('1'); }}
                              >
                              <i className="fa fa-minus-circle" aria-hidden="true" data-key="0" onClick={this.removeTypeOption}></i>
                              <strong>Checkbox</strong>
                              </NavLink>
                            </NavItem>
                            <NavItem className="active" style={{display: "block",width:"100%"}}>
                              <NavLink
                                className={classnames({ active: this.state.activeTabs === '2' })}
                                onClick={() => { this.toggles('2'); }}
                              >
                              <i className="fa fa-minus-circle" aria-hidden="true" data-key="1" onClick={this.removeTypeOption}></i>
                              <strong>Radio</strong>
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <div className="clearfix"></div>
                          <div id="displayTypeOption">
                            {this.displayTypeOption}
                          </div>
                          <input className="form-control" placeholder="Thuộc tính" onClick={this.inputOptionOnclick}/>
                          <ul className="ulListTypeOption" style={$this.state.displayOption}>
                            <li onClick={this.typeOptionChange} value="checkbox">Checkbox</li>
                            <li onClick={this.typeOptionChange} value="radio">Radio</li>
                          </ul>
                        </div>
                        <div className="col-sm-9" style={{float:"left"}}>
                          <TabContent activeTab={this.state.activeTabs}>
                            <TabPane tabId="1">
                              <Row>
                                <Col sm="12">
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>
                                          T
                                        </th>
                                      </tr>
                                    </thead>
                                  </table>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="2">
                              <Row>
                                <Col sm="12">
                                  test12
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>
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


