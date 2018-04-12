import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Col, Tabs, Icon } from 'antd'
import { config } from 'utils'
import {Notification} from '../../components';
import styles from './index.less'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item


class Login extends React.Component {

    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(['name', 'password'], (errors, values) => {
            if (errors) {
                console.error("handlerLogin", errors);
                return
            }
            this.props.dispatch({ type: 'login/login', payload: values })
        })
    }

    handlerRegister = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(['reg_name', 'reg_password', 'reg_password_again'], (errors, values) => {
            if (errors) {
                console.error("handlerLogin", errors);
                return;
            }
            if (values.reg_password && values.reg_password !== values.reg_password_again) {
                return Notification.error("两次密码不一致");
            }
            this.props.dispatch({
                type: 'login/register',
                payload: values
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.form}>
                <div className={styles.logo}>
                    <img alt={'logo'} src={config.logo} />
                    <span>{config.name}</span>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="user" />登录</span>} key="1">
                        <Form layout="horizontal">
                            <FormItem hasFeedback>
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入用户名',
                                        },
                                    ],
                                })(<Input size="large" onPressEnter={this.handleLogin} placeholder="用户名" />)}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        },
                                    ],
                                })(<Input size="large" type="password" onPressEnter={this.handleLogin} placeholder="密码" />)}
                            </FormItem>
                            <Row>
                                <Button type="primary" size="large" onClick={this.handleLogin} >
                                    登录
                                </Button>
                            </Row>
                        </Form>
                    </TabPane>
                    <TabPane tab={<span><Icon type="key" />注册</span>} key="2">
                        <Form layout="horizontal">
                            <FormItem hasFeedback>
                                {getFieldDecorator('reg_name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入用户名',
                                        },
                                    ],
                                })(<Input size="large" onPressEnter={this.handleLogin} placeholder="用户名" />)}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('reg_password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        },
                                    ],
                                })(<Input size="large" type="password" onPressEnter={this.handlerRegister} placeholder="密码" />)}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('reg_password_again', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '确认密码'
                                        },
                                    ],
                                })(<Input size="large" type="password" onPressEnter={this.handlerRegister} placeholder="确认密码" />)}
                            </FormItem>
                            <Row>
                                <Button type="primary" size="large" onClick={this.handlerRegister}>
                                    注册
                                </Button>
                            </Row>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}


Login.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default connect(({ login, loading }) => ({ login, loading }))(Form.create()(Login))


// connect(function ({login, loading}) {
//   return {

//   }
// })