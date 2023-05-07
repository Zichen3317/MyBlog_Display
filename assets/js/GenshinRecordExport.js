function GetJsonData(){
//由cookie获取账号信息
//document.getElementById("MHYCookie");
console.debug("[GenshinRecordExport.js][GetJsonData]开始获取信息")
var cookies = "UM_distinctid=184e1b8729d3c1-00a5bfda74dcf2-7d5d5476-100200-184e1b8729e67b; _MHYUUID=ab298417-507c-4394-807d-476ccc088e8b; _MHYUUID=ab298417-507c-4394-807d-476ccc088e8b; DEVICEFP_SEED_ID=06c9c4969cac3855; DEVICEFP_SEED_TIME=1670234276143; _ga=GA1.1.1166336486.1670234277; _ga_KS4J8TXSHQ=GS1.1.1675421951.3.1.1675422128.0.0.0; CNZZDATA1275023096=1868227600-1670231419-https%253A%252F%252Fbbs.mihoyo.com%252F%7C1675953867; DEVICEFP=38d7ee66cbe38";
var account_info_url = 'https://webapi.account.mihoyo.com/Api/login_by_cookie?t='

var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
        xhr.withCredentials = true; // 设置 withCredentials 属性为 true，否则无法添加cookie到header中
        httpRequest.open('GET', account_info_url+Date.now()*100, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.setRequestHeader("cookie",cookies);//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        httpRequest.send();//第三步：发送请求  将请求参数写在URL中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;//获取到json字符串，还需解析
                console.log(json);
            }
        };
}
GetJsonData();