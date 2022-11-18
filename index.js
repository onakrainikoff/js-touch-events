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
    const result = `Event Tap: interval=${interval}ms.`
    header.textContent = result
    console.log(result);
})

touchRegion.bind(touchArea, swipe, (e) => {
    const {velocity, currentDirection} = e.detail.data[0]
    const velocityRounded = parseFloat(velocity).toFixed(3)
    const direction = getDirection(currentDirection)
    let result = `Event Swipe: velocity=${velocityRounded}, direction=${direction}`
    header.textContent = result
    console.log(result);
})

function getDirection(deg) {
    let direction = []
    const right = 0
    const top = 90
    const left = 180
    const bottom = 270

    const sector = 67.5

    if (deg >= 360 - sector  || deg <= right + sector) {
        direction.push('right')
    }
    
    if (deg >= top - sector  && deg <= top + sector) {
        direction.push('top')
    }

    if (deg >= left - sector  && deg <= left + sector) {
        direction.push('left')
    }

    if (deg >= bottom - sector  && deg <= bottom + sector) {
        direction.push('bottom')
    }

    return direction
}