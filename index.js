import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  Row,
  Col,
  Icon,
  Breadcrumb,
  Menu,
  Layout,
  Form,
  Select,
  Switch,
  Radio,
  Card,
  message,
  Button,
  Upload,
  DatePicker,
  Progress
} from "antd";
import moment from "moment";

import ColorPicker from "./ColorPicker";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const theme = [{index: "山丹丹那个开花红艳艳", color: "#FF0000"}, {index: "抹茶妹妹专属", color: "	#7FFF00"}, {
  index: "眼前的黑不是黑",
  color: "#3B3B3B"
}, {index: "妈妈快看土豪 别看 你会瞎的", color: "#FFD700"},
  {index: "基佬紫", color: "#BA55D3"}, {index: "粉红色的回忆", color: "#FF00FF"}, {
    index: "你喜欢浪 我便成海",
    color: "#98F5FF"
  }, {index: "我看到你的内心 你的内心实在是太邪恶了", color: "#EEEE00"}];

class App extends Component {
  constructor(props) {
    super(props);
    let initialValue = {
      '@primary-color': 'blue',
      '@body-background': 'white',
    }
    let vars = {};

    try {
      vars = Object.assign({}, initialValue, JSON.parse(localStorage.getItem('app-theme')));
      console.log(vars)
    } finally {
      this.state = { vars, initialValue };
      window.less
        .modifyVars(vars)
        .then(() => { })
        .catch(error => {
          message.error(`Failed to update theme`);
        });
    }

  }

  componentWillMount() {

  }

  resetTheme = () => {
    localStorage.setItem('app-theme', '{}');
    const initialValue=JSON.stringify(this.state.initialValue)
    this.setState({vars: JSON.parse(initialValue)});
    console.log(this.state)
    window.less
      .modifyVars(this.state.initialValue)
      .catch(error => {
        message.error(`Failed to reset theme`);
      });
  }
  changeColor = (colorCode)=> {
    const {vars}=this.state
    vars[
      '@primary-color'
      ]=colorCode
  }
  changeColor1 = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {vars}=this.state
      window.less
        .modifyVars(vars)
        .then(() => {
          // message.success(`Theme updated successfully`);
          this.setState({ vars });
          localStorage.setItem("app-theme", JSON.stringify(vars));
        })
        .catch(error => {
          message.error(`Failed to update theme`);
        });
      console.log(this.state);
      this.props.form.resetFields();
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    return (
      <div className="App">
        <Form>
          <Row>
            <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="主题"
          >
            {getFieldDecorator("theme", {

            })(
              <Select placeholder="请选择主题颜色" onChange={this.changeColor} style={{width:'100%'}}>
                {theme.map((item)=> {
                  return ( <Option key={item.color} value={item.color}>{item.index}</Option>)
                })
                }
              </Select>
            )}
            </FormItem>
              </Col>
            <Col span={1}>
        <Button type="primary"  onClick={this.resetTheme} style={{marginLeft:"10px",marginTop:"5px"}}>初始化</Button>
              </Col>
            <Col span={1}>
        <Button type="primary" onClick={this.changeColor1} style={{marginLeft:"10px",marginTop:"5px"}}>切换主题</Button>
              </Col>
            </Row>
      </Form>
      </div>
    );
  }
}

App = Form.create()(App);
ReactDOM.render(<App />, document.getElementById("root"));
