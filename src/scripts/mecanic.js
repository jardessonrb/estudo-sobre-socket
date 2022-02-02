var init = '';
var end = '';
var vez = null;
var parentButton = null;

function reset() {
    init = '';
    end = '';
}

function select(id) {
    init = id;
    const button = document.getElementById(id).parentNode;
    console.log(button.id);
}

function finish(id){
    end = id;
    const button = document.getElementById('1');
    const div    = document.getElementById(id);
    div.appendChild(button);
}