import "@babel/polyfill"
import {generateWeather} from './getWeather'


describe("Generating Weather", () => {
        test("should return undefined if called", () => {
            document.body.innerHTML = '<input id="location" value="xyz">'
              expect(generateWeather()).toBe(undefined);
            });
          });
