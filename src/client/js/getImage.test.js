import "@babel/polyfill"
import {generateImage} from './getImage'

describe("Genrating image URL", () => {
    test("Should return undefined if calledL", () => {
        document.body.innerHTML = '<input id="location" value="xyz">'
        expect(generateImage()).toBe(undefined)
    })
})