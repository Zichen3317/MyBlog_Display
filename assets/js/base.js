function copyText(str) {
    var input = document.createElement("input");
    var body = document.querySelector("body");
    body.append(input);
    input.value = str
    input.select();
    document.execCommand("copy");
    input.remove();
}
