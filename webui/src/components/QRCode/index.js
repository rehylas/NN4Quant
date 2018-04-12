import QRCodeLib from 'qrcode'
import React, {Component} from 'react';


const QRSIZE = {
    width: 128,
    height: 128
}
/**
 * @param {String} content 要生成二维码的内容
 * @param {String} id 二维码的标签 id，默认为 'qrcode'
 */
export default class QRCode extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            ok: true
        }
    }

    componentDidMount() {
        this.initCode(this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.initCode(nextProps)
    }

    initCode = (props) => {
        const {id = "qrcode", content = ""} = props;
        if (content) {
            const canvas = document.getElementById(id);
            QRCodeLib.toCanvas(canvas, content, QRSIZE, (err) => {
                if (err) {
                    console.log(err);
                    this.setState({ok: false});
                }
            })
        }
    }

    renderStatus = () => {
        const {ok} = this.state;
        const style = {
            height: 100
        }
        if (!ok) {
            return <div style={style}>
                    二维码生成失败，请稍后重试
                </div>
        }
    }


    render() {
        // const
        return (
            <div>
                <canvas id={this.props.id || "qrcode"}> 
                </canvas>
                {
                    this.renderStatus()
                }
            </div>
        )
    }
}