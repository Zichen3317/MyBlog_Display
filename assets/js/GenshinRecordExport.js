function GetJsonData() {
  //由cookie获取账号信息
  //document.getElementById("MHYCookie");
  console.debug("[GenshinRecordExport.js][GetJsonData]开始获取信息");

  // cookie 值作为查询参数添加到 URL 中
  var cookies = document.getElementById("MHYCookie");
  var account_info_url =
    "https://webapi.account.mihoyo.com/Api/login_by_cookie";
  var url =
    account_info_url +
    "?t=" +
    Date.now() * 100 +
    "&cookies=" +
    encodeURIComponent(cookies);

  // 基于XHR发送GET请求
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var responseText = xhr.responseText;
      var data = JSON.parse(responseText); // 将JSON数据转换为JS对象
      console.log(data); // 访问JS对象中的值
    }
  };
  xhr.send();
}
GetJsonData();
