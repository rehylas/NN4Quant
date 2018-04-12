// import React from 'react'
// import { Icon,Form,Row,Col,Card,Button,Input, Select, Tabs} from 'antd'
// import { connect } from 'dva'
// import styles from './index.less'
// const ButtonGroup = Button.Group;
// import ewm from '../../public/ewm.jpg'
// const Option = Select.Option;
// const TabPane = Tabs.TabPane;
// const FormItem = Form.Item
// const selectBefore = (
//   <Select defaultValue="1" style={{ width: 180 }}>
//     <Option value="1">比特币钱包地址</Option>
//     <Option value="2">以太币钱包地址</Option>
//   </Select>
// );
// const Set = () => (<div>
//   <Row gutter={24}>
//     <Col span={24}>
//       <Card>

//         <Tabs defaultActiveKey="1">
//           <TabPane tab={<span><Icon type="pay-circle" />比特币</span>} key="1">
//             <Row gutter={24}>
//               <Col span={21}>
//                 <Input addonBefore="钱包地址" placeholder="0x000000" />
//               </Col>
//               <Col span={3}>
//                 <Button type="primary">
//                   复制
//                 </Button>
//               </Col>
//             </Row>
//             <Row type="flex" justify="center">
//               <img width="200" height="200" src={ewm} />
//             </Row>

//           </TabPane>
//           <TabPane tab={<span><Icon type="pay-circle-o" />以太币</span>} key="2">
//             <Row gutter={24}>
//               <Col span={21}>
//                 <Input addonBefore="钱包地址"  value="3243424324324324" />
//               </Col>
//               <Col span={3}>
//                 <Button type="primary"  >
//                   复制
//                 </Button>
//               </Col>
//             </Row>
//             <Row type="flex" justify="center">
//               <img width="200" height="200" src={ewm} />
//             </Row>

//           </TabPane>
//         </Tabs>

//       </Card>
//     </Col>
//   </Row>
// </div>)


// export default connect(({ role_list, loading }) => ({ role_list, loading }))(Set)
