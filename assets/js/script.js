// ------------------------------- INITIAL DATA --------------------------------
 
let currentColor = 'black' // Canvas default color
let screen = document.querySelector('#tela') // Canvas Draw field

let useTool = true // Canvas tool controller
let canDraw = false // Canvas Draw permission controller
let context = screen.getContext('2d') // Canvas draw context

// Brush size 
let brushSizeEl = document.querySelector('#brushSize')
let brushSizeLabel = document.querySelector('.brushSizeNumber')
let brushSizeValue = 15

// Eraser size
let eraserSizeEl = document.querySelector('#eraserSize')
let eraserSizeLabel = document.querySelector('.eraserSizeNumber')
let eraserSizeValue = 15

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

// Switch between the tools
document.querySelectorAll('.tool').forEach(item => {
    item.addEventListener('click', function(event) {
        changeTool(event)
        toolSelected()
    })
})

// Change and show brush size 
brushSizeEl.addEventListener('input', showBrushSize)

// Change and show eraser size 
eraserSizeEl.addEventListener('input', showEraserSize)

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

// Change the white border (.activeTool class) between the clicked tools.
function changeTool(event) {
    document.querySelector('.activeTool').classList.remove('activeTool')
    event.currentTarget.classList.add('activeTool')
}

// Change draw tool mode
function toolSelected() {

    let bucketEl = document.querySelector('#bucket')
    let eraserEl = document.querySelector('#eraser')
    let brushEl = document.querySelector('#brush')

    let brushSelected = brushEl.classList.contains('activeTool')
    let bucketSelected = bucketEl.classList.contains('activeTool')
    let eraserSelected = eraserEl.classList.contains('activeTool')

    if(brushSelected) {
        return 'brush'
    } else if (bucketSelected) {
        return 'bucket'
    } else if (eraserSelected) {
        return 'eraser'
    }

}

// ------------------------------- DRAW MODE -----------------------------------

// Enable draw mode
function mouseDownEvent(event) {
    
    let tool = toolSelected()
    
    if (tool === 'brush') {
        useTool = true // Enable brush mode
    } else if (tool === 'bucket') {
        context.fillStyle = currentColor
        context.fillRect(0, 0, screen.width, screen.height)
    } // Bucket mode 

    if(useTool) {
        canDraw = true
    } else {
        // Vertical and horizontal position relative to the canvas screen
        let pointX = event.pageX - screen.offsetLeft
        let pointY = event.pageY - screen.offsetTop
    }
    
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

    // Vertical and horizontal position relative to the canvas screen
    let pointX = x - screen.offsetLeft 
    let pointY = y - screen.offsetTop
    
    // Canvas draw settings
    let tool = toolSelected()
    let bgColor = context.fillStyle
    
    if (tool === 'eraser') {
        context.strokeStyle = bgColor
        context.lineWidth = eraserSizeValue
    } else {
        context.strokeStyle = currentColor
        context.lineWidth = brushSizeValue
    }

    context.beginPath()
    context.lineJoin = "round"
    context.moveTo(mouseX, mouseY)
    context.lineTo(pointX, pointY)
    context.closePath()
    context.stroke()

    // Horizontal and vertical actual position
    mouseX = pointX
    mouseY = pointY
    
}

// ------------------------- RESET AND EXPORT CANVAS ----------------------------

// Clear canvas screen
function clearScreen() {
    context.fillStyle = 'white'
    context.fillRect(0, 0, screen.width, screen.height)
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

// Show eraser current size
function showEraserSize(event) {
    let eraserSize = parseInt(event.target.value)
    eraserSizeLabel.textContent = eraserSize
    eraserSizeValue = eraserSize
}

// Show brush current size
function showBrushSize(event) {
    let brushSize = parseInt(event.target.value)
    brushSizeLabel.textContent = brushSize
    brushSizeValue = brushSize
}