import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    Card,
    InputNumber,
    Radio,
    Icon,
    Tooltip,
    Row,
    Col
} from 'antd';

import { request } from '../../utils/fetch';
import {Notification} from '../../components';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// @connect(({ login, loading }) => (
class GetPage extends React.Component {


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('values', values);
            if (err) {
                return Notification.error("请完善提取信息");
            }
            request('userDraw', {
                method: 'post',
                data: {
                    ...values
                }
            }, (err, res) => {
                if (res.retMsg === 'OK') {
                    return Notification.success("提取成功");
                } else {
                    return Notification.error("系统繁忙");
                }
                // console.log("response--- :", err, res);
            })
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        }
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const item = {};
        return (<div>
            <Form layout="horizontal" onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem label="虚拟币种类" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('coinType', {
                        initialValue: '0',
                        rules: [
                            {
                                required: true,
                                message: '种类不能为空'
                            },
                        ]
                    })(<Select style={{ width: '100%' }}>
                        <Option value="0">比特币提取</Option>
                        <Option value="1">以太币提取</Option>
                    </Select>)}
                </FormItem>
                <FormItem label="钱包地址" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('userCoinAddr', {
                        initialValue: item.name,
                        rules: [
                            {
                                required: true,
                                message: '地址不能为空'
                            },
                        ]
                    })(<Input placeholder="请输入地址" />)}
                </FormItem>
                <FormItem label="提取数量" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('amount', {
                        initialValue: item.note,
                        rules: [
                            {
                                required: true,
                                message: '数量不能为空'
                            },
                        ]
                    })(<InputNumber style={{ width: '100%' }} min={0} step={0.1} />)}
                </FormItem>
                <FormItem {...submitFormLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        确认
                    </Button>
                </FormItem>

            </Form>

        </div>)
    }
}

export default connect(({ loading }) => ({ loading }))(Form.create()(GetPage))
