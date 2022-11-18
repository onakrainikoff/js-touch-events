const header = document.getElementsByTagName('header')[0];  
const touchArea = document.getElementsByTagName('body')[0];        
const touchRegion = new ZingTouch.Region(touchArea);

const tap = new ZingTouch.Tap({
    numInputs: 1,
    maxDelay: 300,
    tolerance: 10
})

const swipe = new ZingTouch.Swipe({
    numInputs: 1,
    maxRestTime: 500,
    escapeVelocity: 0.5
})

touchRegion.bind(touchArea, tap, (e) => {
    const {interval} = e.detail
    const result = `Tap: interval=${interval}ms.`
    header.textContent = result
    console.log(result);
})

touchRegion.bind(touchArea, swipe, (e) => {
    const {velocity, currentDirection} = e.detail.data[0]
    const velocityRounded = parseFloat(velocity).toFixed(3)
    const direction = getDirection(currentDirection)
    let result = `Swipe: velocity=${velocityRounded}, direction=${direction}`
    header.textContent = result
    console.log(result);
})

function getDirection(deg) {
    let direction
    if (deg >= 45 && deg <= 135) {
        direction = 'top'
    }
    if (deg > 135 && deg < 225) {
        direction = 'left'
    }
    if (deg >= 225 && deg <= 315) {
        direction = 'down'
    }
    if (deg > 315  || deg < 45) {
        direction = 'right'
    }
    return direction
}