const leftSide = document.querySelector('#left-side')
const rightSide = document.querySelector('#right-side')
const hexInputBar = document.querySelector('#hex-color-input')
const rInput = document.querySelector('#R-input')
const gInput = document.querySelector('#G-input')
const bInput = document.querySelector('#B-input')
const redPalette = document.querySelector('.R-color-palette') 
const greenPalette = document.querySelector('.G-color-palette') 
const bluePalette = document.querySelector('.B-color-palette') 
const convertedPalette = document.querySelector('.converted-outcome')


const view = {
    hexConverter(arr) {    // (view) 把input value 轉換成 hex number
        let newArr = arr.map(item => {
            if (Number(item).toString(16).length < 2) return '0' + Number(item).toString(16)
            else return Number(item).toString(16)
        })
        return newArr
    },
    changePaletteColor(RGB) {     // (view) 改變紅藍綠小格的顏色         
        let redClicked = false
        let greenClicked = false
        let blueClicked = false
        RGB.forEach(item => {
            if (!redClicked && Number(rInput.value) !== 0 && item === RGB[0]) {
                let redCode = '#' + item + '0000'
                redPalette.style.backgroundColor = redCode
                redClicked = true

            } else if (!greenClicked && Number(gInput.value) !== 0 && item === RGB[1]) {
                let greenCode = '#' + '00' + item + '00'
                greenPalette.style.backgroundColor = greenCode
                greenClicked = true

            } else if (!blueClicked && Number(bInput.value) !== 0 && item === RGB[2]) {
                let blueCode = "#" + "0000" + item
                bluePalette.style.backgroundColor = blueCode
                blueClicked = true
            }
        })
    },
}

const controller = { 
    RGBContainer() {    // (controller)把輸入內容整合到array後，再轉換成hexadecimal 
        const RGBValue = [rInput, gInput, bInput]
        let RGB = []
        RGBValue.forEach(item => {
            if (Number(item.value) > 255  ) {    // 防呆，如果輸入值 > 255
                setTimeout(() => alert('Please input valid color code that is between 0 and 255.'), 500)
                item.value = '255'
            } else if (Number(item.value) < 0) {    // 防呆，如果輸入值 < 0
                setTimeout(() => alert('Please input valid color code that is between 0 and 255.'), 500)
                item.value = '0'
            }
            RGB.push(item.value)    // 把user的input value 塞進RGB array
        })   
        RGB = view.hexConverter(RGB)
        return RGB
    },
    foolProof(){
        let isError = false 
        const RGBValue = [rInput, gInput, bInput]
        RGBValue.some(item => {
            if (item.value === '' && !isError) {     // 如果輸入框為空                
                alert("There're some input fields got missed!")
                isError = true
                return
            } else if (isNaN(item.value) && !isError){  // 如果不是輸入數子
                alert("It's not valid input.")
                isError = true
                return
            }      
        })
        if(isError) return true
    },
}

// 監聽每一條input bar，要改變RGB小格子顏色用
leftSide.addEventListener('input', e => { 
    RGB = controller.RGBContainer()  
    view.changePaletteColor(RGB)
})

// 監聽RGB的input bar，和 convert button，要混合RGB三色並改變右邊palette顏色
leftSide.addEventListener('submit', e => {    
    e.preventDefault()
    if(controller.foolProof()) return
    RGB = controller.RGBContainer()
    let hexColor = '#' + RGB.join('')
    hexInputBar.value = hexColor
    convertedPalette.style.backgroundColor = hexColor
})

// // 監聽右邊input欄
hexInputBar.addEventListener('keyup', e => {
    e.preventDefault()
    if (e.keyCode === 13) {
        e.preventDefault()
        convertedPalette.style.backgroundColor = hexInputBar.value
    }
})