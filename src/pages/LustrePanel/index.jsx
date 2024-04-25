import { Button,Flex,Input,Card,ConfigProvider } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LustrePanel(){
    const {TextArea} = Input
    const navigate = useNavigate()
    const [value,setValue] = useState("")
    const outputResult = `SUM:\nInvProp[l32c1]\nAnswer: valid\nRuntime: 0.06 sec`
    const outputJson = {
        "declaration": "",
        "automatons": [
          {
            "name": "A",
            "parameters": "c1, c2, c3, c4, c5 bool",
            "locations": [
              {
                "id": 1,
                "name": "A",
                "invariant": ""
              },
              {
                "id": 2,
                "name": "B",
                "invariant": ""
              },
              {
                "id": 3,
                "name": "C",
                "invariant": ""
              },
              {
                "id": 4,
                "name": "D",
                "invariant": ""
              },
              {
                "id": 5,
                "name": "E",
                "invariant": ""
              },
              {
                "id": 6,
                "name": "",
                "invariant": ""
              },
              {
                "id": 7,
                "name": "",
                "invariant": ""
              }
            ],
            "transitions": [
              {
                "id": 1,
                "source_id": 1,
                "target_id": 6,
                "select": "",
                "guard": "c1",
                "sync": "",
                "update": "S1()"
              },
              {
                "id": 2,
                "source_id": 6,
                "target_id": 7,
                "select": "",
                "guard": "!c2",
                "sync": "",
                "update": "S3()"
              },
              {
                "id": 3,
                "source_id": 6,
                "target_id": 2,
                "select": "",
                "guard": "c2",
                "sync": "",
                "update": "S2()"
              },
              {
                "id": 4,
                "source_id": 7,
                "target_id": 3,
                "select": "",
                "guard": "c4",
                "sync": "",
                "update": "S4()"
              },
              {
                "id": 5,
                "source_id": 7,
                "target_id": 4,
                "select": "",
                "guard": "!c4 && c5",
                "sync": "",
                "update": "S5()"
              },
              {
                "id": 6,
                "source_id": 7,
                "target_id": 5,
                "select": "",
                "guard": "!c4 & !c5",
                "sync": "",
                "update": "S6()"
              }
            ],
            "init": 1,
            "declaration": "func S1(){}\n\nfunc S2(){}\n\nfunc S3(){}\n\nfunc S4(){}\n\nfunc S5(){}\n\nfunc S6(){}"
          }
        ],
        "system_declaration": [
          "system A;"
        ]
      }
    return(
        <>    
        <Button onClick={()=>{navigate('/editor')}}>返回</Button>
        <Flex style={{margin:'36px 120px'}} gap='large'>
        <Flex vertical style={{width:'50%'}} gap='middle'>
            <div>

                <Button style={{float:'left'}} size="large" onClick={()=>setValue(JSON.stringify(outputJson))}>状态机验证</Button>
                <Button style={{float:'right'}} size="large" onClick={()=>setValue(outputResult)}>数据流验证</Button>
            </div>
            <TextArea style={{resize:'none',height:'600px'}}></TextArea>
        </Flex>
        <ConfigProvider
            theme={{
                token: {
                    colorBorderSecondary:'#d9d9d9'
                },
            }}
        >
            <Card style={{width:'50%', whiteSpace:'pre-wrap'}}>{value}</Card>
        </ConfigProvider>
        
        
        </Flex>
        </>

    
    )
}

export default LustrePanel