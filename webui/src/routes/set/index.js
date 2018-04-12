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
	Tabs,
	Tooltip,
	Row,
	Col
} from 'antd';
// import PriceInput from './price';
import { request } from '../../utils/fetch';
import copy from 'copy-to-clipboard';
import {Notification, QRCode} from '../../components';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class SetPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			btcAddress: '',
			ethAddress: ''
		};
	}
	// handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	this.props.form.validateFieldsAndScroll((err, values) => {
	// 		console.log('values', values);
	// 		// console.log('this.dispatch', this.props.dispatch);
	// 		if (!err) {
	// 			this.props.dispatch({
	// 				type: 'deposit/deposit',
	// 				payload: values,
	// 			});
	// 		}
	// 	})
	// }

	componentDidMount() {
		request('userqueryCoinAddr', {
			method: 'post',
			data: {

			}
		}, (err, res) => {
			console.log('res!!!!  ', res);
			if (!err && res.data) {
				let data = res.data;
				this.setState({btcAddress: data.BTCAddress || '', ethAddress: data.ETHAddress})
			}
		})
	}

	// checkPrice = (rule, value, callback) => {
	// 	if (value.number <= 0) {
	// 		callback("数量必须大于 0");
	// 		return;
	// 	}
	// 	if (value.currency === '请选择') {
	// 		callback("请选择一种交易类型");
	// 		return;
	// 	}
	// 	callback();
	// }

	render() {
		const { submitting } = this.props
		const { getFieldDecorator, getFieldValue } = this.props.form
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 7 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
				md: { span: 10 },
			},
		}

		const submitFormLayout = {
			wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 10, offset: 7 },
			},
		}

		return (
			<div>
				<Row gutter={24}>
					<Col span={24}>
						<Card>

							<Tabs defaultActiveKey="1">
								<TabPane tab={<span><Icon type="pay-circle" />比特币</span>} key="1">
									<Row gutter={24}>
										<Col span={21}>
											<Input addonBefore="钱包地址" value={this.state.btcAddress} />
										</Col>
										<Col span={3}>
											<Button type="primary" onClick={(e) => {
												copy(this.state.btcAddress);
												Notification.info("已经复制到剪切板");
											}}>
												复制
											</Button>
										</Col>
									</Row>
									<Row type="flex" justify="center">
										<QRCode content={this.state.btcAddress} id={'btcAddress'}/>
									</Row>

								</TabPane>
								<TabPane tab={<span><Icon type="pay-circle-o" />以太币</span>} key="2">
									<Row gutter={24}>
										<Col span={21}>
											<Input addonBefore="钱包地址" value={this.state.ethAddress}/>
										</Col>
										<Col span={3}>
											<Button type="primary"  onClick={(e) => {
												copy(this.state.ethAddress);
												Notification.info("已经复制到剪切板");
											}}>
												复制
											</Button>
										</Col>
									</Row>
									<Row type="flex" justify="center">
										<QRCode content={this.state.ethAddress} id={'ethAddress'}/>
									</Row>
								</TabPane>
							</Tabs>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default connect(({ loading }) => ({ loading }))(Form.create()(SetPage))





// return (
		// 	<div>
		// 		<Row gutter={24}>
		// 			<Col span={24}>
		// 				<Card>
		// 				<Tabs defaultActiveKey="1">
		// 				<TabPane tab={<span><Icon type="pay-circle" />比特币</span>} key="1">
		// 					<Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
		// 						<FormItem {...formItemLayout} label="钱包地址">
		// 							{/* {getFieldDecorator('address', {
		// 								rules: [
		// 									{
		// 										required: true,
		// 										message: '请输入钱包地址',
		// 									},
		// 								],
		// 							})(<Input placeholder="钱包地址" value={this.state.btcAddress}/>)} */}
		// 							<Col span={21}>
		// 								<Input addonBefore="钱包地址"  value={this.state.btcAddress} />
		// 							</Col>
		// 							<Col span={3}>
		// 			                <Button type="primary"  >
		// 			                   复制
		// 			                 </Button>
		// 			               </Col>
		// 						</FormItem>
		// 						{/* <FormItem {...formItemLayout} label="数量">
		// 							{getFieldDecorator('price', {
		// 								initialValue: { number: 0, currency: '请选择' },
		// 								rules: [{ validator: this.checkPrice }],
		// 							})(<PriceInput />)}
		// 						</FormItem> */}
		// 						<FormItem {...submitFormLayout}>
		// 							<Button type="primary" htmlType="submit" className="login-form-button">
		// 								确认
		// 							</Button>
		// 						</FormItem>
		// 					</Form>
		// 				</TabPane>
		// 				<TabPane tab={<span><Icon type="pay-circle-o" />以太币</span>} key="2">
		// 					<Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
		// 						<FormItem {...formItemLayout} label="钱包地址">
		// 							{getFieldDecorator('address', {
		// 								rules: [
		// 									{
		// 										required: true,
		// 										message: '请输入钱包地址',
		// 									},
		// 								],
		// 							})(<Input placeholder="钱包地址" value={this.state.ethAddress} />)}
		// 							<Col span={3}>
		// 			                <Button type="primary"  >
		// 			                   复制
		// 			                 </Button>
		// 			               </Col>
		// 						</FormItem>
		// 						{/* <FormItem {...formItemLayout} label="数量">
		// 							{getFieldDecorator('price', {
		// 								initialValue: { number: 0, currency: '请选择' },
		// 								rules: [{ validator: this.checkPrice }],
		// 							})(<PriceInput />)}
		// 						</FormItem> */}
		// 						<FormItem {...submitFormLayout}>
		// 							<Button type="primary" htmlType="submit" className="login-form-button">
		// 								确认
		// 							</Button>
		// 						</FormItem>
		// 					</Form>
		// 				</TabPane>
		// 				</Tabs>
		// 				</Card>
		// 			</Col>
		// 		</Row>
		// 	</div>