import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import qs from 'qs';
import axioApi from './../../../config/axioConfig';
let $this;

class Login extends Component {

  constructor(props){
		super(props);
		this.state = {email:'', password:''}
		$this = this;
	}
	handleEmailChange(e){
		$this.setState({
			email : e.target.value
		})	
	}
	handlePasswordChange(e){
		$this.setState({
			password : e.target.value
		})	
	}
	saveRegister(e){
		e.preventDefault();
    const user = {email:$this.state.email, password:$this.state.password}
    //console.log(user);
		axioApi.post("api/auth/login", qs.stringify(user)).then((res) => {
      // here we go// success login
      if(res.data.auth === true){
        // store in localStorage
        localStorage.setItem('token', res.data.token);
        // set axios header
        axioApi.defaults.headers.common['x-access-token'] = res.data.token;
        $this.props.history.push({
            pathname: '/',
            //search: '?query=abc',
            redirectfrom: 'dashboard'
        })
      }
    }).catch((err) => {
        alert("Tài khoản hoặc mật khẩu không đúng!");
        console.log(err);
    });
  };
    
  render() {
    return (
      <div className="app flex-row align-items-center">
        
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <form onSubmit={this.saveRegister}>
                        <h1>Đăng nhập</h1>
                        <p className="text-muted">Hệ thống quản trị AI</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="email" onChange={this.handleEmailChange} name="email" placeholder="Email" autoComplete="email" required/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" onChange={this.handlePasswordChange} name="password" placeholder="Mật khẩu" autoComplete="password" required/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <button type="submit"  className="btn btn-primary">Submit</button>
                        </InputGroup>
                        
                        {/* <Row>
                          <Col xs="6">
                            <Button color="primary" className="px-4">Đăng</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Quên mật khẩu?</Button>
                          </Col>
                        </Row> */}
                      </form>
                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Giới thiệu</h2>
                        <p>Chúng tôi chuyên cấp cấp dịch vụ website, phần mềm. Hỗ trợ kỹ thuật kinh doanh xin gọi số 0966665040</p>
                        <Link to="/register">
                          <Button color="primary" className="mt-3" active tabIndex={-1}>Liên hệ!</Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        
      </div>
    );
  }
}

export default Login;
