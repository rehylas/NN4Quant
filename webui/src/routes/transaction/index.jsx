import React from 'react'
import { Icon,Form,Row,Col,InputNumber,Button,Input, Select, Tabs} from 'antd'
import { connect } from 'dva'
import styles from './index.less'
const ButtonGroup = Button.Group;
import ewm from '../../public/ewm.jpg'
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item
const selectBefore = (
  <Select  style={{ width: 180 }}>
    <Option value="1">比特币提取</Option>
    <Option value="2">以太币提取</Option>
  </Select>
);

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const Get = ({
  item={},
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue
  }
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      console.log('提交表单：',data)
    })
  }
  return (<div>
    <Form layout="horizontal">
      <FormItem label="目标货币" hasFeedback {...formItemLayout}>
        {getFieldDecorator('buy', { initialValue: '1',
          rules: [
            {
              required: true,
              message:'种类不能为空'
            },
          ] })(<Select  style={{ width: '100%' }}>
          <Option value="1">比特币</Option>
          <Option value="2">以太币</Option>
        </Select>)}
      </FormItem>
      <FormItem label="支付货币" hasFeedback {...formItemLayout}>
        {getFieldDecorator('pay', { initialValue: '2',
          rules: [
            {
              required: true,
              message:'支付货币不能为空'
            },
          ] })(<Select  style={{ width: '100%' }}>
          <Option value="1">比特币</Option>
          <Option value="2">以太币</Option>
        </Select>)}
      </FormItem>
      <FormItem label="买入/卖出数量(仅剩2.3个)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('note', { initialValue: item.note,
          rules: [
            {
              required: true,
              message:'数量不能为空'
            },
          ] })( <InputNumber  style={{ width: '100%' }} min={0} max={2.3} step={0.1}  />)}
      </FormItem>
      <FormItem label="购买价格" hasFeedback {...formItemLayout}>
        {getFieldDecorator('price', { initialValue: item.note,
          rules: [
            {
              required: true,
              message:'价格不能为空'
            },
          ] })( <InputNumber  style={{ width: '100%' }} min={0}  step={0.1}  />)}
      </FormItem>
    </Form>
    <Row type="flex" justify="center">
      <ButtonGroup>

        <Button size="large"  type="primary" icon="cloud-download" onClick={handleOk}>买入</Button>
        <Button size="large"  type="dashed" icon="cloud-upload" onClick={handleOk}>卖出</Button>
      </ButtonGroup>
    </Row>

  </div>)
}


export default Form.create()(Get)
