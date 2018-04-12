import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input ,Col,Tabs,Icon } from 'antd'
import { config } from 'utils'
import styles from './index.less'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item


const Login = ({
  loading,
  dispatch,
  login,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }
  console.log('HELP:',login)
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form className="login">
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><Icon type="user" />登录</span>} key="1">
            <FormItem hasFeedback>
              {getFieldDecorator('userName', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message:'请输入密码'
                  },
                ],
              })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
            </FormItem>
            <Row>
              <Button type="primary" size="large" onClick={handleOk} loading={loading.effects.login}>
                登录
              </Button>
            </Row>
          </TabPane>
          <TabPane tab={<span><Icon type="key" />注册</span>} key="2">
            <FormItem hasFeedback>
              {getFieldDecorator('reg_userName', {
                rules: [
                  {
                    // required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('reg_password', {
                rules: [
                  {
                   // required: true,
                    message:'请输入密码'
                  },
                ],
              })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('reg_password_again', {
                rules: [
                  {
                   // required: true,
                    message:'确认密码'
                  },
                ],
              })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="确认密码" />)}
            </FormItem>
            <Row>
              <Button type="primary" size="large" onClick={this.handlerRegister} loading={loading.effects.register}>
                注册
              </Button>
            </Row>
          </TabPane>
        </Tabs>


      </form>
    </div>
  )
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