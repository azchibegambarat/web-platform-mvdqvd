var target = null;
var numberIndex = 0;
let validator = {
  set: function (obj, prop, value) {
    if (prop === 'target') {
      obj.width.value = `${value.offsetWidth}px`;
      obj.height.value = `${value.offsetHeight}px`;
      if (value.tagName.toLowerCase() == 'input') obj.value.value = vaule.value;
      else obj.value.value = value.innerHTML;
    }
    // The default behavior to store the value
    obj[prop] = value;

    // Indicate success
    return true;
  },
};
var property = new Proxy({}, validator);

document.addEventListener('DOMContentLoaded', function (event) {
  var right = document.getElementsByClassName('right')[0];
  var toolbar = document.getElementsByClassName('toolbar')[0];
  var dragable = document.querySelectorAll('[draggable="true"]');

  property.width = toolbar.querySelector("input[id='width']");
  property.height = toolbar.querySelector("input[id='height']");
  property.value = toolbar.querySelector("input[id='value']");

  dragDropHandle(right, dragable);
  propertyHandle(toolbar);
});
function dragDropHandle(element, dragable) {
  dragable.forEach((x) => {
    x.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('whois', e.target.id);
    });
  });

  element.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  element.addEventListener('dragenter', (e) => {
    target = e.target;
  });

  element.addEventListener('drop', (e) => {
    e.preventDefault();
    console.log(e);
    let node = document
      .getElementById(e.dataTransfer.getData('whois'))
      .cloneNode(true);
    node.removeAttribute('id');
    node.removeAttribute('draggable');
    node.setAttribute('class', `${node.getAttribute('class')}_left`);
    node.innerHTML = '';
    node.value = '';
    node.id = numberIndex++;
    node.onclick = (eeee) => {
      property.target = eeee.target;
    };

    if (node.tagName.toLowerCase() === 'label') {
      node.innerHTML = 'lable';
    }
    target.appendChild(node);
  });
}

function propertyHandle(element) {
  element.querySelector("input[id='width']").addEventListener('change', (e) => {
    setWidth(e.target.value);
  });
  element
    .querySelector("input[id='height']")
    .addEventListener('change', (e) => {
      setHeight(e.target.value);
    });
  element.querySelector("input[id='value']").addEventListener('change', (e) => {
    setValue(e.target.value);
  });
}

function setWidth(width) {
  property.target.style.width = width;
}
function setHeight(height) {
  property.target.style.height = height;
}
function setValue(value) {
  if (property.target.tagName.toLowerCase() == 'input')
    property.target.value = value;
  else property.target.innerHTML = value;
}
