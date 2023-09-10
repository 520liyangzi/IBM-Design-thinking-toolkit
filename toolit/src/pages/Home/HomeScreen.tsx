import './HomeScreen.css'
import { Popover } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Layout, Space } from 'antd'

const { Header, Footer, Content } = Layout
const HomeScreen = () => {
  const navigate = useNavigate()

  const notSupport = () => {
    alert('Not Support')
  }

  const empathy = () => {
    navigate('/empathymap')
  }

  const scenario = () => {
    navigate('/scenariomap')
  }

  const empathyInfo = (
    <div style={{ width: '360px' }}>
      Empathy Maps help to rapidly put your team in the user’s shoes and align
      on pains and gains—whether at the beginning of a project or mid-stream
      when you need to re-focus on your user.
    </div>
  )

  const ScenarioInfo = (
    <div style={{ width: '360px' }}>
      As-is Scenario Maps help to document collective understanding of user
      workflows and are best used as precursors to exploring new ideas. To-be
      Scenario Maps tell the story of a better experience for your user.
    </div>
  )

  const noInfo = <div style={{ width: '360px' }}>Not Support</div>

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '40px',
    paddingInline: 50,
    lineHeight: '64px',
    marginTop: '50px',
    color: 'black',
    backgroundColor: 'white',
    fontWeight: 'bold',
    position: 'relative',
  }

  const logoStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '100px',
    height: '40px',
  }

  const footerStyle: React.CSSProperties = {
    color: 'blue',
    backgroundColor: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-end',
  }

  return (
    <Space direction="vertical" style={{ width: '1280px' }}>
      <Header style={headerStyle}>
        IBM Design Thinking Toolkit
        <img className="logo" src="/images/IBM.png" alt="" style={logoStyle} />
      </Header>

      <div style={{ height: '50px' }}></div>

      <Content>
        <Row>
          <Col span={4} offset={0.8}>
            <div className="box" onClick={notSupport}>
              <Popover placement="bottom" content={noInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Stakeholder Map</div>
            </div>
          </Col>

          <Col span={4} offset={1}>
            <div className="box" onClick={empathy}>
              <Popover placement="bottom" content={empathyInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Empathy Map</div>
            </div>
          </Col>

          <Col span={4} offset={1}>
            <div className="box" onClick={scenario}>
              <Popover
                placement="bottom"
                content={ScenarioInfo}
                trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Scenario Map</div>
            </div>
          </Col>

          <Col span={4} offset={1}>
            <div className="box" onClick={notSupport}>
              <Popover placement="bottom" content={noInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Big Idea Vignettes</div>
            </div>
          </Col>

          <Col span={4} offset={1}>
            <div className="box" onClick={notSupport}>
              <Popover placement="bottom" content={noInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Prioritization Grid</div>
            </div>
          </Col>
        </Row>

        <div style={{ height: '30px' }}></div>

        <Row>
          <Col span={4} offset={0.8}>
            <div className="box" onClick={notSupport}>
              <Popover placement="bottom" content={noInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Needs Statement</div>
            </div>
          </Col>

          <Col span={4} offset={1}>
            <div className="box" onClick={notSupport}>
              <Popover placement="bottom" content={noInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Storyboarding</div>
            </div>
          </Col>

          <Col span={4} offset={1}>
            <div className="box" onClick={notSupport}>
              <Popover placement="bottom" content={noInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Assumptions and Questions</div>
            </div>
          </Col>

          <Col span={4} offset={1}>
            <div className="box" onClick={notSupport}>
              <Popover placement="bottom" content={noInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Feedback Grid</div>
            </div>
          </Col>

          <Col span={4} offset={1}>
            <div className="box" onClick={notSupport}>
              <Popover placement="bottom" content={noInfo} trigger="hover">
                <img className="information" src="/images/info.png" alt="" />
              </Popover>
              <div className="text">Experience Based Roadmap</div>
            </div>
          </Col>
        </Row>
      </Content>

      <Footer style={footerStyle}>
        <a
          href="www.baidu.com"
          style={{ color: 'blue', transform: 'translate(55px, 0px)' }}>
          <img className="play" src="/images/link.png" alt="" />
          IBM SkillsBuild - Design Thinking
        </a>
      </Footer>
    </Space>
  )
}

export default HomeScreen
