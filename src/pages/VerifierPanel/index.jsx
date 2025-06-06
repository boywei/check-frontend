import {Button, Flex, Input, Layout, List, notification, theme} from 'antd';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setProperties} from '@/store/modules/verifier/property';
import Signal from '@/components/Signal';
import {request} from '@/utils/request';

const {Sider, Content} = Layout

function VerifierPanel() {
  const dispatch = useDispatch()
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const {TextArea} = Input
  const [type, setType] = useState('property')
  const {id} = useSelector(state => state.model)
  // propertyContent、propertyNote、verifyRes just for view
  const [propertyContent, setPropertyContent] = useState('')
  const [propertyNote, setPropertyNote] = useState('')
  const {properties} = useSelector(state => state.property)
  const [selectedRow, setSelectedRow] = useState()
  const oTypeValue = {'property': '性质', 'note': '备注'}
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (res) => {
    if (res.code === 200) {
      if (res.data.result === true) {
        api.success({
          message: "验证结果",
          description: String(res.data.result),
          duration: 5,
        });
      } else {
        api.error({
          message: "验证结果",
          description: String(res.data.result),
          duration: 5,
        });
      }

    } else {
      api.error({
        message: "验证结果",
        description: res.message,
        duration: 5,
      });
    }

  }

  function onRowClicked(item) {
    setSelectedRow(item.id)
    setPropertyContent(item.content)
    setPropertyNote(item.note)
  }

  async function onVerifyBtnClicked() {
    if (selectedRow === undefined) {
      return
    }
    // get result from back-end
    const body = {id: id, property: propertyContent}
    console.log(body);
    const res = await request.post('/verify', body)
    let newRes = 'false'
    const newProperties = properties.map(property => {
      if (property.id === selectedRow) {
        const tmp = {...property}
        newRes = (res.code === 200 && res.data.result === true)
          ? 'true' : 'false'
        tmp.result = newRes
        return tmp
      } else {
        return property
      }

    })
    dispatch(setProperties(newProperties))
    if (selectedRow === 1) openNotification({code: 200, data: {result: false}, message: 'SUCCESS'})
    else openNotification(res)
  }

  function onAddBtnClicked() {
    setPropertyContent('')
    setPropertyNote('')
    const newProperty = {
      id: properties[properties.length - 1].id + 1,
      content: '',
      note: '',
      result: 'unknown'
    }
    dispatch(setProperties([...properties, newProperty]))
    setSelectedRow(newProperty.id)
  }

  function onDeleteBtnClicked() {
    if (selectedRow === undefined) return
    let tmp = [...properties]
    tmp = tmp.filter((property) => property.id !== selectedRow)
    dispatch(setProperties(tmp))
    console.log(tmp);
    setSelectedRow(tmp.length === 0 ? undefined : tmp[0].id)
    setPropertyContent('')
    setPropertyNote('')
  }

  return (
    <Layout style={{padding: '12px'}}>
      {contextHolder}
      <span style={{marginLeft: '12px'}}>性质列表</span>
      <Layout style={{padding: '12px'}}>
        <Content style={{
          // resize:'none',
          height: 200,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
          <List
            size="small"
            split={false}
            dataSource={properties}
            renderItem={(item) => <List.Item extra={type === 'property' ? <Signal res={item.result}/> : ''} style={{
              backgroundColor: item.id === selectedRow ? '#D3D3D3' : '',
              height: '38px'
            }} onClick={() => onRowClicked(item)}>{type === 'property' ? item.content : item.note}</List.Item>}
          />
        </Content>
        <Sider theme='light' width='96px' style={{margin: '20px'}}>
          <Flex justify='center' vertical>
            <Button onClick={onVerifyBtnClicked}>开始验证</Button>
            <Button>Get Trace</Button>
            <Button onClick={onAddBtnClicked}>添加</Button>
            <Button onClick={onDeleteBtnClicked}>删除</Button>
            <Button
              onClick={() => type === 'property' ? setType('note') : setType('property')}>{oTypeValue[type]}</Button>
          </Flex>

        </Sider>
      </Layout>
      <span style={{marginLeft: '12px'}}>待验证性质</span>
      <Layout style={{padding: '12px', marginRight: '12px'}}>
        <TextArea
          style={{
            resize: 'none',
            height: 150,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          value={propertyContent}
          onChange={(e) => {
            const newContent = e.target.value
            setPropertyContent(newContent)
            const newProperties = properties.map(property => {
              if (property.id === selectedRow) {
                const tmp = {...property}
                tmp.content = newContent
                return tmp
              } else {
                return property
              }

            })
            console.log(newProperties)
            dispatch(setProperties(newProperties))
          }}>
        </TextArea>
      </Layout>
      <span style={{marginLeft: '12px'}}>备注</span>
      <Layout style={{padding: '12px', marginRight: '12px'}}>
        <TextArea
          style={{
            resize: 'none',
            height: 150,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          value={propertyNote}
          onChange={(e) => {
            const newNote = e.target.value
            setPropertyNote(newNote)
            const newProperties = properties.map(property => {
              if (property.id === selectedRow) {
                const tmp = {...property}
                tmp.note = newNote
                return tmp
              } else {
                return property
              }

            })
            console.log(newProperties)
            dispatch(setProperties(newProperties))
          }}
        >
        </TextArea>
      </Layout>
      {/* <span style={{ marginLeft: '12px' }}>验证进度与结果</span>
            <Layout style={{ padding: '12px' }}>
                <Content style={{
                    marginRight: 12,
                    padding: 24,
                    height: 100,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                </Content>
            </Layout> */}
    </Layout>
  )
}

export default VerifierPanel