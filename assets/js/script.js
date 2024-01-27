// ------------------------------- INITIAL DATA --------------------------------
 
let currentColor = 'black' // Canvas default color
let screen = document.querySelector('#tela') // Canvas Draw field

let canDraw = false // Canvas Draw permission controller
let context = screen.getContext('2d') // Canvas draw context

// Canvas default background color
context.fillStyle = 'white'
context.fillRect(0, 0, screen.width, screen.height)

// Canvas mouse horizontal and vertical initial declaration
let mouseX; 
let mouseY;

// ------------------------------- EVENTS --------------------------------------

// Select a color by clicking
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
})

// Controls Draw mode
screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)

// Resets canvas field
document.querySelector('.clear').addEventListener('click', clearScreen)

// Exports canvas draw to image and downloads it
document.querySelector('.convert').addEventListener('click', canvasImg)

// ------------------------------- FUNCTIONS -----------------------------------

// Change the white border (.active class) between the clicked colors.
function colorClickEvent(event) {
    let color = event.target.getAttribute('data-color')
    currentColor = color

    document.querySelector('.color.active').classList.remove('active')
    event.target.classList.add('active')
}

// Enable draw mode
function mouseDownEvent(event) {
    canDraw = true

    // Vertical (y-axis)  and  horizontal (x-axis) position relative to the canvas screen
    let pointX = event.pageX - screen.offsetLeft
    let pointY = event.pageY - screen.offsetTop
}

// Enable draw brush tracking while the mouse cursor is pressed
function mouseMoveEvent(event) {
    if(canDraw) {
        draw(event.pageX, event.pageY)
    }
}

// Disable draw mode
function mouseUpEvent() {
    canDraw = false
    mouseX = undefined
    mouseY = undefined
}

// Canvas draw mode
function draw(x, y) {

    // Vertical (y-axis)  and  horizontal (x-axis) position relative to the canvas screen
    let pointX = x - screen.offsetLeft 
    let pointY = y - screen.offsetTop 
    
    // Canvas draw settings
    context.beginPath()
    context.lineWidth = 5
    context.lineJoin = "round"
    context.moveTo(mouseX, mouseY)
    context.lineTo(pointX, pointY)
    context.closePath()
    context.strokeStyle = currentColor
    context.stroke()

    // Horizontal and vertical actual position
    mouseX = pointX
    mouseY = pointY
    
}

// Clear canvas screen
function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

// Convert the canvas to an image and download it
function canvasImg() {

    // Canvas draw to data URL
    let dataURL = screen.toDataURL('image/png')
   
    // Link element (a) with the data URL as the href
    let link = document.createElement('a')
    link.href = dataURL

    // Download image
    link.download = 'imagem.png'
    link.click()

}