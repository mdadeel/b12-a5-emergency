1. getElementById, getElementsByClassName, querySelector, querySelectorAll
ans →

getElementById → calls an element using id="" (unique).

getElementsByClassName → calls all elements with class="".

querySelector → uses a CSS selector to find the first match.

querySelectorAll → same as querySelector but returns all matches.

2. Create & Insert a New Element
ans → HTML: <div id="container"></div>
const newPara = document.createElement("p");
newPara.textContent = "Hello, JS!";
const container = document.getElementById("container");
container.appendChild(newPara);
3. Event Bubbling
ans → When we click an element inside another, the event first happens on that element, then moves up to its parent, then parent’s parent, until it reaches the top (document).

4. Event Delegation
ans → Instead of adding an event listener to every child, we put one on the parent and let it handle events for all children (works because of event bubbling).

5. preventDefault() vs stopPropagation()
ans →

preventDefault() → stops the browser’s default action (like opening a link).

stopPropagation() → stops the event from bubbling up to parent elements.
