// ------------------------------- INITIAL DATA --------------------------------
 
let currentColor = 'black' // Canvas default color
let screen = document.querySelector('#tela') // Canvas Draw field

let context = screen.getContext('2d') // Canvas draw context
let canDraw = false // Canvas Draw permission controller

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