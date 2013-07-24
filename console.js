(function () {
    var element;

    function css(element, style) {

        Object.keys(style).forEach(function (key) {
            element.style[key] = style[key];
        });
    }
    
    function scrollToBottom() {
        element.scrollTop = element.scrollHeight;
    }

    function Inspect(obj, key) {
        var content = document.createElement('div'),
            top = document.createElement('div'),
            node = document.createElement('div'),
            on = false,
            elemsCreated = false,
            keyNode, text, holder;
        
        if (key) {
            keyNode = document.createElement('span');
            keyNode.innerHTML = key + ':&nbsp;';
            css(keyNode, {float: 'left', color: '#8a3991'});
            css(node, {float: 'left'});
            css(content, {overflow: 'hidden'});
            top.appendChild(keyNode);
        }

        content.appendChild(top);
        top.appendChild(node);
        if (typeof obj === 'number') {
            node.innerHTML = obj;
            css(node, {color: '#2d46d6'});
        } else if (typeof obj === 'string') {
            node.innerHTML = '"' + obj + '"';   
            css(node, {color: '#c83631'});
        } else if (obj === null) {
            node.innerHTML = 'null';   
            css(node, {color: '#838080'});
        } else if (obj instanceof Function) {
            node.innerHTML = obj.toString();
        } else {

            text = obj.constructor.name;
            if (Array.isArray(obj)) {
                text += '[' + obj.length + ']';
            }
            node.innerHTML = '▸' + text;
            holder = document.createElement('div');
            css(holder, {
                'padding-left': '10px',
                'display': 'none',
                'clear': 'both'
            });
            node.addEventListener('click', function () {
                if (!on) {
                    if (!elemsCreated) {
                        Object.keys(obj).forEach(function (key) {
                            var elem = Inspect(obj[key], key);
                            holder.appendChild(elem);
                        });
                        elemsCreated = true;
                    }
                    node.innerHTML = '▾' + text;
                    css(holder, {display: 'block'});
                    on = true;
                } else {
                    node.innerHTML = '▸' + text;
                    css(holder, {display: 'none'});
                    on = false;
                }
            }, false);

            content.appendChild(holder);
        }

        return content;
    }

    function createConsoleBlock() {
        element = document.createElement('div');
        css(element, { 
            'background-color': '#eee',
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '10px',
            'max-height': '200px',
            'overflow-y': 'scroll',
            '-webkit-overflow-scrolling': 'touch',
            'font-size': '10px'
        });
        document.body.appendChild(element);
    }

    window.addEventListener('load', function () {
        console.error = console.log = function (message) {
            if (!element) {
                createConsoleBlock();
            }
            element.appendChild(Inspect(message));
            scrollToBottom();
        };
    }, false);
}());

