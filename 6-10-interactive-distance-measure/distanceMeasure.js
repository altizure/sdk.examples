/**
 * Create a distance measure tool
 * @public
 * @param {object} props
 */
let _this
class DistanceMeasure {
  constructor(props) {
    this.sandbox = props.sandbox
    this.enabled = false
    document.addEventListener('mousedown', this.handleMouseDown)
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
    this.lastDownEvent = undefined
    this.drawing = false
    this.drawingLine = undefined
    this.drawingLinePts = []
    this.lineCollection = []
    this.drawingTextTag = undefined
    // this.drawingTextTagCollection = []
    this.textCollection = []
    this.defaultOption = {
      name: 'pl2',
      sandbox: this.sandbox,
      color: 'white',
      opacity: 0.9,
      lineWidth: 0.3,
      interactable: true,
      labelsVisible: false,
    }
    this.defaultTextOption = {
      textStyle: {
        fillStyle: 'white',
        font: '500 36px Arial',
        outlineWidth: 5,
      },
      sandbox: sandbox,
      scale: 0.3
    }
    _this = this
  }
  start() {
    this.enabled = true
  }
  destruct() {
    document.removeEventListener('mousedown', this.handleMouseDown)
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('mousemove', this.handleMouseMove)
  }
  handleMouseDown(event) {
    if (_this.enabled) {
      _this.lastDownEvent = event
    }
  }
  handleMouseUp (event) {
    if (_this.enabled) {
      if (event.button === _this.lastDownEvent.button && Math.abs(event.x - _this.lastDownEvent.x) <= 3 && Math.abs(event.y - _this.lastDownEvent.y) <= 3) {
        if (event.button === 0 && !_this.drawing) {
          _this.startDraw(event)
        } else if (event.button === 0 && _this.drawing) {
          _this.addVertex(event)
        } else if (event.button === 2 && _this.drawing) {
          _this.endDraw(event)
        }
      }
    }
  }
  handleMouseMove (event) {
    if (_this.drawing && _this.enabled) {
      let pt = _this.sandbox.pickOnProjects(event)
      _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt)
      let pt0 = _this.drawingLinePts[_this.drawingLinePts.length - 1]
      _this.moveTextTag(pt0, pt)
    }
  }

  startDraw (event) {
    this.drawing = true
    let pt = this.sandbox.pickOnProjects(event)
    let points = [pt, pt]
    let option = Object.assign(this.defaultOption, { points })
    this.drawingLine = new altizure.PolyCylinderLineMarker(option)
    this.drawingLinePts = [Object.assign({}, pt)]
    this.addTextTag(pt)
  }
  addVertex (event)  {
    let pt = this.sandbox.pickOnProjects(event)
    this.drawingLine.setPoint(this.drawingLine.pointsNumber - 1, pt)
    this.drawingLine.addPoint(pt)
    this.drawingLinePts.push(Object.assign({}, pt))
    this.addTextTag(pt)
  }
  endDraw (event) {
    this.drawing = false
    let points = this.drawingLinePts
    let line = new altizure.PolyCylinderLineMarker(Object.assign(this.defaultOption, { points }))
    this.interactLine(line)
    this.lineCollection.push(line)
    if (this.drawingLine) {
      this.drawingLine.destruct()
      this.drawingLine = undefined
    }
    this.drawingLinePts = []
    if (this.drawingTextTag) {
      this.drawingTextTag.destruct()
      this.drawingTextTag = undefined
    }
    this.enabled = false
  }

  addTextTag(position) {
    if (this.drawingTextTag) {
      this.saveTextTag(this.drawingTextTag.position, this.drawingTextTag.text)
      this.drawingTextTag.destruct()
      this.drawingTextTag = undefined
    }
    let text = '0.0 m'
    let option = Object.assign(this.defaultTextOption, { position, text })
    this.drawingTextTag = new altizure.TextTagMarker(option)
  }
  moveTextTag(pt0, pt1) {
    if (this.drawingTextTag) {
      let lat = (pt0.lat + pt1.lat) / 2
      let lng = (pt0.lng + pt1.lng) / 2
      let alt = (pt0.alt + pt1.alt) / 2
      let pt = { lat, lng, alt }
      // let distance = this.drawingLine.length.toFixed(2)
      let distance = this.sandbox.calculateDistanceBetweenTwoPoints(pt0, pt1)
      this.drawingTextTag.position = pt
      this.drawingTextTag.text = `${distance.toFixed(2)} m`
    }
  }
  saveTextTag(position, text) {
    this.textCollection.push(new altizure.TextTagMarker(Object.assign(this.defaultTextOption, { position, text })))
  }

  interactLine(line) {
    line.on('mouseenter', (e) => {
      line.color = 'orange'
    })

    line.on('mouseleave', (e) => {
      line.color = 'white'
    })
  }
}