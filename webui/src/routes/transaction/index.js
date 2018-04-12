import React from 'react'
import { Icon, Form, Row, Col, InputNumber, Button, Input, Select, Tabs, Table } from 'antd'
import { connect } from 'dva'
// import styles from './index.less'
require('./index.less')
import ewm from '../../public/ewm.jpg'
import { request } from '../../utils/fetch';
import {Notification} from '../../components';

const ButtonGroup = Button.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item

class Transaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topOrderData: {},
            targetCoinType: 0,
            payCoinType: 1
        }
    }

    componentDidMount () {
        const {targetCoinType, payCoinType} = this.state;
        this.loadTopOrder(targetCoinType, payCoinType);
    }

    componentWillUpdate (nextProps, nextState) {
        console.log(this.state,   nextState);
        if (
            this.state.targetCoinType !== nextState.targetCoinType ||
            this.state.payCoinType !== nextState.payCoinType
        ) {
            this.loadTopOrder(nextState.targetCoinType, nextState.payCoinType);
        }
    }

    handleBuy = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('values', values);
            if (err) {
                return Notification.error("请完成信息");
            }
            request('userBuy', {
                method: 'post',
                data: {
                    ...values
                }
            }, (err, res) => {
                if (res.retMsg === 'OK') {
                    return Notification.success("交易已提交");
                } else {
                    return Notification.error("请稍后重试");
                }
            })
        })
    }

    handleSell = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('values', values);
            if (err) {
                return Notification.error("请完成信息");
            }
            request('userSell', {
                method: 'post',
                data: {
                    ...values
                }
            }, (err, res) => {
                if (res.retMsg === 'OK') {
                    return Notification.success("交易已提交");
                } else {
                    return Notification.error("请稍后重试");
                }
            })
        })
    }

    loadTopOrder = (targetCoinType, payCoinType) => {
        request('topOrder', {
            method: 'post',
            data: {
                targetCoinType,
                payCoinType
            }
        }, (err, res) => {
            console.log('loadTopOrder', err, res);
            if (err) {
                return this.setState({topOrderData: {}})
            }
            if (res) {
                if (res.data) {
                    this.setState({ topOrderData: res.data });
                }
            }
        })
    }

    payCoinTypeChange = (value, options)  => {
        console.log('change', value, options);
        this.setState({payCoinType: value});
    }

    targetCoinTypeChange = (value, options) => {
        console.log('targetcointypeChange', value, options);
        this.setState({targetCoinType: value});
    }

    renderTopOrderData = (type = null, title = '') => {
        const { topOrderData } = this.state;
        function initColumns (type) {
            const priceMap = {'sell': '卖出价格', 'buy': '买入价格'};
            return [
                {
                    title: priceMap[type],
                    dataIndex: 'price',
                    key: 'price',
                    className: type,
                },
                {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount',
                    className: type
                }
            ];
        };
        if (Object.keys(topOrderData).length) {
            const {buyTop = [], sellTop = []} = topOrderData;
            // console.log('topOrderData', topOrderData, buyTop);
            return (
                    // <div>
                    // <h5>{title}</h5>
                    // {
                    //     type === 'buy' ? <Table dataSource={buyTop} columns={columns} pagination={false}/> : (
                    //         type === 'sell' ? <Table dataSource={sellTop} columns={columns} pagination={false}/> : <div>暂无数据</div>
                    //     )
                    // }
                    // </div>
                <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                    <Table dataSource={buyTop} columns={initColumns('buy')} pagination={false} style={{color: 'red'}}/>
                    <br/>
                    <Table dataSource={sellTop} columns={initColumns('sell')} pagination={false} />
                </div>
            )
        }
        return <div> 暂无数据 </div>
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
        };
        const item = {};
        return (<div className={"test"}>
            <Row gutter={24}>
            <Col span={18}>
                <Form layout="horizontal">
                    <FormItem label="目标货币" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('targetcointype', {
                            initialValue: '0',
                            rules: [
                                {
                                    required: true,
                                    message: '种类不能为空'
                                },
                            ]
                        })(<Select style={{ width: '100%' }}  onChange={this.targetCoinTypeChange}>
                            <Option value="0">比特币</Option>
                            <Option value="1">以太币</Option>
                        </Select>)}
                    </FormItem>
                    <FormItem label="支付货币" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('paycointype', {
                            initialValue: '1',
                            rules: [
                                {
                                    required: true,
                                    message: '支付货币不能为空'
                                },
                            ]
                        })(<Select style={{ width: '100%' }} onChange={this.payCoinTypeChange}>
                            <Option value="0">比特币</Option>
                            <Option value="1">以太币</Option>
                        </Select>)}
                    </FormItem>
                    <FormItem label="买入/卖出数量" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('note', {
                            initialValue: item.note,
                            rules: [
                                {
                                    required: true,
                                    message: '数量不能为空'
                                },
                            ]
                        })(<InputNumber style={{ width: '100%' }} min={0} step={0.1} />)}
                    </FormItem>
                    <FormItem label="购买/卖出价格" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('price', {
                            initialValue: item.note,
                            rules: [
                                {
                                    required: true,
                                    message: '价格不能为空'
                                },
                            ]
                        })(<InputNumber style={{ width: '100%' }} min={0} step={0.1} />)}
                    </FormItem>
                </Form>
                <Row type="flex" justify="center">
                    <ButtonGroup>
                        <Button size="large" type="primary" icon="cloud-download" onClick={this.handleBuy}>买入</Button>
                        <Button size="large" type="dashed" icon="cloud-upload" onClick={this.handleSell}>卖出</Button>
                    </ButtonGroup>
                </Row>
            </Col>
            <Col span={5} pull={1}>
                {
                    this.renderTopOrderData('buy', '买入')
                }
            </Col>
            {/* <Col span={4}>
                {
                    this.renderTopOrderData('sell', '卖出')
                }
            </Col> */}
            </Row>
        </div>
        )
    }

}



export default Form.create()(Transaction)