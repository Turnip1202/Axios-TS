"use strict";
class UIElement {
    animate(dx, dy, easing) {
        if (easing === 'ease-in') {
            // ...
        }
        else if (easing === 'ease-out') {
        }
        else if (easing === 'ease-in-out') {
        }
        else {
        }
    }
}
let button = new UIElement();
button.animate(0, 0, 'ease-in');
button.animate(0, 0, 'uneasy');
