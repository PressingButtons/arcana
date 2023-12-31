var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Graphics } from "./graphics/graphics.js";
//testing graphics 
const g = new Graphics();
window.onload = (event) => __awaiter(void 0, void 0, void 0, function* () {
    yield g.bindCanvas(document.getElementById('game'));
    let color = [0, 0, 0.2, 1];
    g.fill(color);
});
