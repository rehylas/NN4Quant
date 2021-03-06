import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Icon, Card, Button, Tag, Table } from 'antd'
import { color } from 'utils'
import { Page } from 'components'
import { NumberCard } from './components'
import styles from './index.less'
import ReactEcharts from 'echarts-for-react';

const ButtonGroup = Button.Group

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

class Dashboard extends React.Component {

    render() {
      const {dashboard = {}} = this.props;
      const { weather, sales, quote, numbers, recentSales, comments, completed, browser, cpu, user } = dashboard;

        const columns = [{
            title: '序号',
            dataIndex: 'key',
          }, {
            title: '交易时间',
            dataIndex: 'time',
          }, {
            title: '操作',
            dataIndex: 'note',
          }, {
            title: '交易数量',
            dataIndex: 'number',
          }, {
            title: '说明',
            dataIndex: 'msg',
          }];
        return (
          <div>
                {/* // <Page loading={loading.models.dashboard && sales.length === 0}> */}
                  {/* <Row gutter={24}>
                    {d}
                  </Row> */}
                  <Row gutter={24}>
                    <Col span={12}>
                      <Card title="比特币"
                        extra={
                          <ButtonGroup>
                            <Button type="primary" icon="cloud-download-o" onClick={() => {
                              this.props.dispatch({
                                type: 'dashboard/gotoset'
                              })
                            }}>存入</Button>
                            <Button icon="cloud-download" onClick={() => {
                              this.props.dispatch({
                                type: 'dashboard/gotoget'
                              })}
                              } >提取</Button>
                          </ButtonGroup>
                        }
                      >
                        <Icon style={{ fontSize: 26, color: '#EC6E17' }} type="pay-circle" /> <span style={{ fontSize: 70, color: '#EC6E17' }}>{user.btb}</span>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="以太币"
                        extra={
                          <ButtonGroup>
                            <Button type="primary" icon="cloud-download-o" onClick={() => {
                              this.props.dispatch({
                                type: 'dashboard/gotoset'
                              })
                            }}>存入</Button>
                            <Button icon="cloud-download" onClick={() => {
                              this.props.dispatch({
                                type: 'dashboard/gotoget'
                              })}
                              }>提取</Button>
                          </ButtonGroup>
                        }
                      >
                        <Icon style={{ fontSize: 26, color: '#8FC9FB' }} type="pay-circle-o" /> <span style={{ fontSize: 70, color: '#8FC9FB' }}>{user.ytb}</span>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card title="交易记录"
                        extra={
                          <ButtonGroup>
                            <Button type="primary" icon="retweet" onClick={() => {
                              this.props.dispatch({
                                type: 'dashboard/gotoTransaction'
                              })}
                              }  >我要交易</Button>
                          </ButtonGroup>
                        }
                      >
                        <Table
                          columns={columns}
                          dataSource={user.lists}
                          bordered
                          pagination={{
                            pageSize: 5,
                            showSizeChanger: true,
                          }
                          }
            
                        />
                      </Card>
            
                    </Col>
                  </Row>
            
            
                {/* // </Page> */}
                </div>
        )
    }
}

// function Dashboard ({ dashboard, loading }) {
//   const { weather, sales, quote, numbers, recentSales, comments, completed, browser, cpu, user } = dashboard
//   const numberCards = numbers.map((item, key) => (<Col key={key} lg={6} md={12}>
//     <NumberCard {...item} />
//   </Col>))
//   let demo = [
//     { icon: 'user-add', color: '#64ea91', title: '今日新增用户数', number: Math.floor(Math.random() * 10000) },
//     { icon: 'team', color: '#8fc9fb', title: '服务人次', number: Math.floor(Math.random() * 10000) },
//     { icon: 'message', color: '#d897eb', title: '平台消息', number: Math.floor(Math.random() * 10000) },
//     { icon: 'shopping-cart', color: '#f69899', title: '交易次数', number: Math.floor(Math.random() * 10000) },
//   ]
//   const d = demo.map((item, key) => (<Col key={key} lg={6} md={12}>
//     <NumberCard {...item} />
//   </Col>))

  
  
//   )
// }

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
