import { ConnectionState, IFluidContainer } from 'fluid-framework'
import { DownOutlined } from '@ant-design/icons'
import React, { useEffect, useState, useRef } from 'react'
import { createBrainstormModel } from '../Sticker/BrainstormModel'
import { BrainstormView } from '../Sticker/view/BrainstormView'
import { initializeIcons } from '@fluentui/react'
import { InkingTool } from '@microsoft/live-share-canvas'
import { DefaultColor } from '../Sticker/view/Color'
import { useNavigate } from 'react-router-dom'
import { getEmpathy, setEmpathy } from '../../utils/empathyId'
import {
  AzureClient,
  AzureContainerServices,
} from '@fluidframework/azure-client'
import { NOTE_SIZE } from '../Sticker/view/Note.style'
import { Dropdown, Popover } from 'antd'
import { connectionConfig, containerSchema } from '../Sticker/Config'
import { useLiveCanvas } from '@microsoft/live-share-react'
import { NoteData } from '../Sticker/Types'
import './Empathy.css'
import { Col, Row, Layout, Space } from 'antd'
const { Header } = Layout
const Empathy: React.FC = () => {
  const ScenarioInfo = (
    <div style={{ width: '360px' }}>
      Empathy Maps help to rapidly put your team in the user’s shoes and align
      on pains and gains—whether at the beginning of a project or mid-stream
      when you need to re-focus on your user.
    </div>
  )
  const navigate = useNavigate()
  const backHomePage = async () => {
    navigate('/homeScreen')
  }

  interface MenuItem {
    label: JSX.Element
    key: string
  }
  const scenario = () => {
    navigate('/scenariomap')
  }

  const notSupport = () => {
    alert('Not Support')
  }

  const items: MenuItem[] = [
    {
      label: <div onClick={notSupport}>Stackholder Map</div>,
      key: '0',
    },
    {
      label: <div onClick={scenario}>Scenario Map</div>,
      key: '1',
    },
    {
      label: <div onClick={notSupport}>Big Idea Vignettes</div>,
      key: '2',
    },
    {
      label: <div onClick={notSupport}>Priorization Grid</div>,
      key: '3',
    },
    {
      label: <div onClick={notSupport}>Needs Statement</div>,
      key: '4',
    },
    {
      label: <div onClick={notSupport}>Storyboadrding</div>,
      key: '5',
    },
    {
      label: <div onClick={notSupport}>Assumption and Questions</div>,
      key: '6',
    },
    {
      label: <div onClick={notSupport}>Feedback Grid</div>,
      key: '7',
    },
    {
      label: <div onClick={notSupport}>Experience-Based Roadmap</div>,
      key: '8',
    },
  ]

  function uuid() {
    return 'mmmmmmmm-mmmm-4mmm-nmmm-mmmmmmmmmmmm'.replace(
      /[mn]/g,
      function (id) {
        var now = (Math.random() * 16) | 0,
          ID = id === 'x' ? now : (now & 0x3) | 0x8
        return ID.toString(16)
      }
    )
  }

  const [container, setContainer] = useState<IFluidContainer | null>(null)
  const [services, setServices] = useState<AzureContainerServices | null>(null)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const liveCanvasRef = useRef(null)
  const [active, setActive] = useState(true)
  const [tool, setTool] = useState(InkingTool.pen)
  const [isCursorShared, setIsCursorShared] = useState(true)
  const [color, setColor] = React.useState(DefaultColor)
  const [zIndexDiv, setZIndexDiv] = useState(1)
  const [isDrawingMode, setIsDrawingMode] = useState(false)
  const [imgSrc, setImgSrc] = useState(null)
  const imageRef = useRef(null)
  const [isImageMoveMode, setIsImageMoveMode] = useState(false)

  const { liveCanvas } = useLiveCanvas(
    'CUSTOM-LIVE-CANVA',
    liveCanvasRef,
    active,
    tool,
    undefined,
    undefined,
    undefined,
    undefined,
    isCursorShared
  )

  const audience = React.useMemo(() => services?.audience, [services])
  const [members, setMembers] = React.useState(
    audience ? Array.from(audience.getMembers().values()) : []
  )
  const setMembersCallback = React.useCallback(
    () =>
      setMembers(audience ? Array.from(audience.getMembers().values()) : []),
    [setMembers, audience]
  )
  React.useEffect(() => {
    if (container && audience) {
      container.on('connected', setMembersCallback)
      audience.on('membersChanged', setMembersCallback)
      return () => {
        container.off('connected', setMembersCallback)
        audience.off('membersChanged', setMembersCallback)
      }
    }
  }, [container, audience, setMembersCallback])

  const model = React.useMemo(() => {
    if (container) {
      // @ts-ignore
      return createBrainstormModel(container)
    }
  }, [container])

  useEffect(() => {
    const start = async () => {
      initializeIcons()
      const getContainerId = async (): Promise<{
        containerId: string
        isNew: boolean
      }> => {
        let isNew = false
        const penResult = await getEmpathy()
        if (penResult === null) {
          isNew = true
        }
        //@ts-ignore
        return { containerId: penResult, isNew }
      }
      const { containerId, isNew } = await getContainerId()
      const client = new AzureClient(connectionConfig)
      let container: IFluidContainer
      let services: AzureContainerServices
      if (isNew) {
        ;({ container, services } = await client.createContainer(
          containerSchema
        ))
        setEmpathy(await container.attach())
      } else {
        ;({ container, services } = await client.getContainer(
          containerId,
          containerSchema
        ))
      }
      if (container.connectionState !== ConnectionState.Connected) {
        await new Promise<void>((resolve) => {
          container.once('connected', () => {
            resolve()
          })
        })
      }
      setContainer(container)
      setServices(services)
    }
    start().catch((error) => console.error(error))
  }, [])

  const addSticker = () => {
    console.log('Sticker') // for test
    setZIndexDiv(1)
    const { scrollHeight, scrollWidth } = document.getElementById('NoteSpace')!
    const id = uuid()
    const newCardData: NoteData = {
      id,
      position: {
        x: Math.floor(Math.random() * (scrollWidth - NOTE_SIZE.width)),
        y: Math.floor(Math.random() * (scrollHeight - NOTE_SIZE.height)),
      },
      lastEdited: {
        // future work
        // @ts-ignore
        userId: '',
        // future work
        // @ts-ignore
        userName: ' ',
        time: Date.now(),
      },
      // future work
      // @ts-ignore
      author: ' ',
      numLikesCalculated: 0,
      didILikeThisCalculated: false,
      color,
    }
    //@ts-ignore
    model.SetNote(id, newCardData)
  }

  const clickPen = () => {
    console.log('Pen') // for test
    //@ts-ignore
    liveCanvasRef.current.style.pointerEvents = 'auto'
    setTool(InkingTool.pen)
  }

  const clickLaser = () => {
    console.log('Laser') // for test
    //@ts-ignore
    liveCanvasRef.current.style.pointerEvents = 'auto'
    setTool(InkingTool.laserPointer)
  }

  const useSticker = () => {
    console.log('Move Sticker') // for test
    //@ts-ignore
    liveCanvasRef.current.style.pointerEvents = 'none'
    setIsImageMoveMode(false)
  }

  const clickEraser = () => {
    console.log('Eraser') // for test
    //@ts-ignore
    liveCanvasRef.current.style.pointerEvents = 'auto'
    setTool(InkingTool.eraser)
  }

  const handleMouseOverCanvas = () => {
    if (isDrawingMode) {
      //@ts-ignore
      liveCanvasRef.current.style.pointerEvents = 'auto'
    }
  }

  const handleMouseOutCanvas = () => {
    if (isDrawingMode) {
      //@ts-ignore
      liveCanvasRef.current.style.pointerEvents = 'none'
    }
  }

  //@ts-ignore
  const handleMouseUp = () => {
    //@ts-ignore
    setIsDragging(false)
  }

  //@ts-ignore
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      //@ts-ignore
      reader.onloadend = () => {
        //@ts-ignore
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  //@ts-ignore
  const handleMouseDown = (e) => {
    //@ts-ignore
    setIsDragging(true)
    //@ts-ignore
    setStartX(e.clientX)
  }

  //@ts-ignore
  const handleDragStart = (e) => {
    const rect = e.target.getBoundingClientRect()
    e.dataTransfer.setData('offsetX', e.clientX - rect.left)
    e.dataTransfer.setData('offsetY', e.clientY - rect.top)
  }

  //@ts-ignore
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setScale((prev) => Math.max(prev - 0.1, 0.5))
    } else {
      setScale((prev) => Math.min(prev + 0.1, 3))
    }
  }

  //@ts-ignore
  const handleMouseMove = (e) => {
    //@ts-ignore
    if (isDragging) {
      //@ts-ignore
      const diffX = e.clientX - startX
      //@ts-ignore
      setRotation((prev) => prev + diffX * 0.5)
      //@ts-ignore
      setStartX(e.clientX)
    }
  }

  //@ts-ignore
  const handleDrop = (e) => {
    e.preventDefault()
    const x =
      e.clientX -
      e.target.getBoundingClientRect().left -
      e.dataTransfer.getData('offsetX')
    const y =
      e.clientY -
      e.target.getBoundingClientRect().top -
      e.dataTransfer.getData('offsetY')
    //@ts-ignore
    imageRef.current.style.left = `${x}px`
    //@ts-ignore
    imageRef.current.style.top = `${y}px`
  }

  const useImg = () => {
    console.log('Move Picture')
    setIsImageMoveMode(true)
    setZIndexDiv(1)
  }

  if (!container || !services) {
    return <div>Loading...</div>
  }

  const headerStyle: React.CSSProperties = {
    color: 'black',
    backgroundColor: 'white',
    position: 'relative',
    height: '70px',
    border: 'solid black 1px',
    width: '100%',
    padding: '0',
    margin: '0',
  }

  return (
    <Space direction="vertical" style={{ width: '1280px' }}>
      <div style={{ height: '30px' }}></div>
      <Header style={headerStyle}>
        <Row style={{ width: '100%', margin: '0' }}>
          <Col span={6} className="col-left">
            <div
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'black',
              }}>
              <Popover
                content={ScenarioInfo}
                title="Empathy Map"
                trigger="hover">
                Empathy Map
              </Popover>
            </div>
            <div className="col-dropdown">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </Col>
          <Col className="col-right" span={18}>
            <div className="every-div" onClick={addSticker}>
              <img className="every-img" src="/images/sticker.png" alt="" />
              <div className="header-text">Sticker</div>
            </div>
            <div className="every-div" onClick={clickLaser}>
              <img className="every-img" src="/images/laser.png" alt="" />
              <div className="header-text">Laser</div>
            </div>
            <div className="every-div" onClick={clickPen}>
              <img className="every-img" src="/images/line.png" alt="" />
              <div className="header-text">Pen</div>
            </div>
            <div className="every-div">
              <img className="every-img" src="/images/picture.png" alt="" />
              <div className="header-text">
                <label htmlFor="fileInput">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  Picture
                </label>
              </div>
            </div>
            <div className="every-div" onClick={clickEraser}>
              <img className="every-img" src="/images/era.png" alt="" />
              <div className="header-text">Eraser</div>
            </div>
            <div className="every-div" onClick={useSticker}>
              <img
                className="every-img"
                src="/images/move_sticker.png"
                alt=""
              />
              <div className="header-text">Move Sticker</div>
            </div>
            <div className="every-div" onClick={useImg}>
              <img className="every-img" src="/images/move_pic.png" alt="" />
              <div className="header-text">Move Picture</div>
            </div>
            <div className="every-div" onClick={backHomePage}>
              <img className="every-img" src="/images/backa.png" alt="" />
              <div className="header-text">Back</div>
            </div>
          </Col>
        </Row>
      </Header>

      <div className="empathy-container">
        <div
          onMouseOver={handleMouseOverCanvas}
          onMouseOut={handleMouseOutCanvas}
          ref={liveCanvasRef}
          className="empathy-live"
        />
        <div
          style={{
            zIndex: zIndexDiv,
            pointerEvents: isImageMoveMode ? 'auto' : 'none',
          }}
          className="empathy-brain"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}>
          {imgSrc && (
            <img
              onMouseUp={handleMouseUp}
              style={{
                position: 'absolute',
                width: '150px',
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              alt=""
              onMouseMove={handleMouseMove}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              ref={imageRef}
              src={imgSrc}
              draggable="true"
              onDragStart={handleDragStart}
            />
          )}
        </div>
        <div
          style={{
            zIndex: -10,
          }}>
          <BrainstormView container={container} services={services} />
        </div>
      </div>
    </Space>
  )
}
export default Empathy
