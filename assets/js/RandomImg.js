var RandonImgRange = [1,30]//随机的图片范围，这个不能改
var RandonPageRange = [1,20]//随机的页面范围，可改

function GETPageData(pageUrl) {
  //获得一整个页面的图片数据
  console.debug("[RandomImg.js][crawler]正在获取图片数据");
  //获得页面信息，算offset的值
  //假设p=n，则offset应为(n-1)*30
  let offset = (pageUrl.split("p=")[1] - 1) * 30;
  //获取分类
  let classification = pageUrl.split("/")[4];
  //拼接得到api链接
  let apiUrl =
    "https://m.vilipix.com/api/v1/picture/public?limit=30&offset=" +
    offset +
    "&sort=new&tags=" +
    classification;
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45",
    },
    Referer: pageUrl,
  })
    .then((response) => response.json())
    .then((data) => {
      JsonData = data["data"]["rows"];
      console.debug("[RandomImg.js][crawler]数据获取成功");
      //console.log(JsonData);
      //执行页面写入函数
      DisplayImg(JsonData);
    })
    .catch((error) => console.error(error));
}

function DisplayImg(PageData) {
  //打印获取到的json数据
  console.log(PageData);
  var RandomImgNum = (RandonImgRange[1]+1- RandonImgRange[0]) * Math.random() + RandonImgRange[0];  //获取[m，n]区间内的随机整数
  console.debug("[RandomImg.js][RandomImg_Start]RandomPageNum=" + RandomImgNum);
//展示在页面上的是压缩后图片以节约资源，下载的图片链接是原始图片
  var ImgData = PageData[parseInt(RandomImgNum - 1)];
  var OriUrl = ImgData["original_url"];
  var ImgName = ImgData["title"];
  var RegularUrl = ImgData["regular_url"];

  //将图片展示到页面上
  console.debug("[DisplayImg]开始写入页面");
  //写入部分
  const Display_Img = document.getElementById("Display_Img");
  //清空元素内原有图片
  Display_Img.innerHTML="";
  let Img = "";
  //标题
  Img += `
    <div class="rin-card-title2 mdui-typo">
    <a href="">#</a> ${ImgName}
  </div>
  `;
  var like_total = ImgData["like_total"];
  var tags = ImgData["tags"];
  var created_at = ImgData["created_at"].split(".")[0].replace("T"," ");
  //图片相关信息
  Img +=`
  <div class="rin-article-more" style="display: flex;justify-content: left;flex-wrap: wrap;">
  <div style="margin-left: 10px;">
      <img src="../../assets/img/tool/like.png" style="width: 12px;height: 12px;">&nbsp;${like_total}
  </div>
  <div style="margin-left: 10px;">
      Tags：&nbsp;${tags}
  </div>
  <div style="margin-left: 10px;">
      Created_at:&nbsp;${created_at}
  </div>
</div>
  `
  //图片
  Img += `<img src=${RegularUrl} style="width: 100%;height: 90%;object-fit: contain;"></img>`;
  Display_Img.innerHTML += Img;
  //向下载按钮写入原图链接
  document.getElementById('Img-download').href=OriUrl;
  console.debug("[DisplayImg]完成写入");
}

function RandomImg_Start() {
  //按钮绑定的引导函数
  console.debug("[RandomImg.js][RandomImg_Start]开始获取");
  //(n+1- m) * Math.random() + m;
  var RandomPageNum = (RandonPageRange[1]+1- RandonPageRange[0]) * Math.random() + RandonPageRange[0];  //获取[m，n]区间内的随机整数
  console.debug(
    "[RandomImg.js][RandomImg_Start]RandomPageNum=" + RandomPageNum
  );

  var ImgNode = document.getElementById("ImgNode").value;
  var ImgTag = document.getElementById("ImgTag").value;
  if(ImgNode === "vilipix插画世界"){
    console.debug("[RandomImg.js][RandomImg_Start]选择节点：vilipix插画世界")
    var ImgPageURL =
    `https://www.vilipix.com/tags/${ImgTag}/illusts?p=${RandomPageNum}`; //母链，页数随机
  GETPageData(ImgPageURL);
  }else{
    console.warn("未找到该节点："+ImgNode)
  }
}
