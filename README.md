# JavaScript DOM Concepts – Q&A Guide

A concise reference for key DOM manipulation and event handling techniques in JavaScript.

---

## 1. DOM Selectors

- **getElementById** → Calls an element using `id=""` (unique).
- **getElementsByClassName** → Calls all elements with `class=""`.
- **querySelector** → Uses a CSS selector to find the **first** match.
- **querySelectorAll** → Same as `querySelector` but returns **all** matches.

---

## 2. Create & Insert a New Element

### HTML
```html
<div id="container"></div>
JavaScript
const newPara = document.createElement("p");
newPara.textContent = "Hello, JS!";
const container = document.getElementById("container");
container.appendChild(newPara);

3. Event Bubbling
When we click an element inside another, the event first happens on that element, then moves up to its parent, then the parent’s parent, until it reaches the top (document).

4. Event Delegation
Instead of adding an event listener to every child, we put one on the parent and let it handle events for all children. (Works because of event bubbling.)

5. preventDefault() vs stopPropagation()
preventDefault() → Stops the browser’s default action (like opening a link).

stopPropagation() → Stops the event from bubbling up to parent elements.

