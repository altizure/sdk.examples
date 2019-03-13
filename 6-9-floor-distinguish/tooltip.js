/**
 * Create a tooltip widget
 * @public
 * @param {object} props
 */

class Tooltip {
  constructor(props) {
    this.tooltip = document.createElement('span')
    this.tooltip.classList.add('tooltip', 'top')
    this.tooltip.innerHTML = props.content
    document.body.appendChild(this.tooltip)
    this.position = 'top'
  }

  show(e) {
    // this.tooltip.innerHTML = text
    this.tooltip.style.visibility = "visible"
    document.body.style.cursor = "pointer"
    this.move(e)
  }

  move(e) {
    this.positionDetect(e)
    switch (this.position) {
      case 'top':
        this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth / 2
        this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight - 8
        break;
      case 'left':
        this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth - 8
        this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight / 2
        break;
      case 'right':
        this.tooltip.style.left = e.clientX + 8
        this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight / 2
        break;
      case 'bottom':
        this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth / 2
        this.tooltip.style.top = e.clientY + 8
        break;
      case 'top_left':
        this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth - 8
        this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight - 8
        break;
      case 'top_right':
        this.tooltip.style.left = e.clientX + 8
        this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight - 8
        break;
      case 'bottom_left':
        this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth - 8
        this.tooltip.style.top = e.clientY + 8
        break;
      case 'bottom_right':
        this.tooltip.style.left = e.clientX + 8
        this.tooltip.style.top = e.clientY + 8
        break;
    }
  }

  hide() {
    this.tooltip.style.visibility = "hidden"
    document.body.style.cursor = "default"
  }

  positionDetect(e) {
    let that = this
    let cornorHeight = this.tooltip.offsetHeight
    let cornorWidth = this.tooltip.offsetWidth
    let bodyHeight = document.body.offsetHeight
    let bodyWidth = document.body.offsetWidth
    let prePosition = this.position
    if (e.clientX < cornorWidth && (e.clientY < cornorHeight)) {
      that.position = 'bottom_right'
    } else if ((e.clientX > (bodyWidth - cornorWidth)) && (e.clientY < cornorHeight)) {
      that.position = 'bottom_left'
    } else if ((e.clientX < cornorWidth) && (e.clientY > bodyHeight - cornorHeight)) {
      that.position = 'top_right'
    } else if ((e.clientX > (bodyWidth - cornorWidth)) && (e.clientY > bodyHeight - cornorHeight)) {
      that.position = 'top_left'
    } else if (e.clientY < cornorHeight) {
      that.position = 'bottom'
    } else if (e.clientX < cornorWidth) {
      that.position = 'right'
    } else if (e.clientX > (bodyWidth - cornorWidth)) {
      that.position = 'left'
    } else {
      that.position = 'top'
    }
    if(prePosition !== that.position) {
      this.tooltip.classList.remove('bottom_right', 'bottom_left', 'top_right', 'top_left', 'bottom', 'right', 'left', 'top')
      this.tooltip.classList.add(this.position)
    }
  }

  remove() {
    this.tooltip.remove()
  }
}