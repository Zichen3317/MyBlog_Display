var RandonPageRange = [1,20]//随机的页面范围，可改

// 随机生成 [n, m] 之间的整数
function getRandomInt(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}


function GETPageData(pageUrl,PageRange) {
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

  //输出拼接后的api链接
  //console.debug("[GETPageData]apiUrl= "+apiUrl)
  
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
      //如果数据量过少，会出现返回的json内部没有数据，需要进行判断，
      //  如果为空数据则减少页数重新获取
      JsonData = data["data"]["rows"];
      Img_total =data["data"]["rows"].length;
      console.debug("[RandomImg.js][crawler]数据获取成功");

      if (Img_total === 0){
        //获得空数据，说明该tag下的数据量不足，将获取的页数范围减半重新获取
        RandomImg_Start(PageRange=[PageRange[0],PageRange[0]+parseInt((PageRange[1]-PageRange[0])/2)]);
        console.debug("[GETPageData]数据量不足，更改页数范围至=> "+PageRange[0]+","+(PageRange[0]+parseInt((PageRange[1]-PageRange[0])/2)));
      }else{
        //console.log(JsonData);
        //执行页面写入函数
        DisplayImg(JsonData,Img_total);
      }

    })
    .catch((error) => console.error(error));
}

function DisplayImg(PageData,Img_total) {
  //打印获取到的json数据
  //console.log(PageData);
  var RandomImgNum = getRandomInt(1,Img_total);  //获取[m，n]区间内的随机整数
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
  Img += `<img src=${RegularUrl} style="width: 100%;height: 80%;object-fit: contain;"></img>`;
  Display_Img.innerHTML = Img;
  //向下载按钮写入原图链接
  document.getElementById('Img-download').href=OriUrl;
  console.debug("[DisplayImg]完成写入");
}

function RandomImg_Start(PageRange=[1,2]) {
  //按钮绑定的引导函数
  console.debug("[RandomImg.js][RandomImg_Start]开始获取");
  //(n+1- m) * Math.random() + m;
  var RandomPageNum = getRandomInt(RandonPageRange[0],RandonPageRange[1])  //获取[m，n]区间内的随机整数
  console.debug(
    "[RandomImg.js][RandomImg_Start]RandomPageNum=" + RandomPageNum
  );

  var ImgNode = document.getElementById("ImgNode").value;
  var ImgTag = document.getElementById("ImgTag").value;
  console.debug("[RandomImg.js][RandomImg_Start]Tag="+ImgTag);

  if(ImgNode === "vilipix插画世界"){
    console.debug("[RandomImg.js][RandomImg_Start]选择节点：vilipix插画世界")

    if(PageRange!==0){//如果指定了页数范围就按指定的页数范围获取，如果没有就按照最上方设置的范围随机获取
      var ImgPageURL =
      `https://www.vilipix.com/tags/${ImgTag}/illusts?p=${getRandomInt(PageRange[0],PageRange[1])}`; //母链，页数随机
    }else{
      var ImgPageURL =
      `https://www.vilipix.com/tags/${ImgTag}/illusts?p=${getRandomInt(RandonPageRange[0],RandonPageRange[1])}`; //母链，页数随机
    }


  GETPageData(ImgPageURL,PageRange);
  }else{
    console.warn("未找到该节点："+ImgNode)
  }
}
//节点改变时更换tag选项
function NodeToTag(){
  const ImgTagSelect = document.getElementById("ImgTag");
  //先清空select里的tag
  ImgTagSelect.length = 0
  var ImgNode = document.getElementById("ImgNode").value;
  var vilipix_ImgTag = [//需要写入的option,第一个是option对外展示的内容,第二个是option的值
    ["风景","风景"],
    ["原神(中文Tag)","原神"],
    ["原神(英文Tag)","Genshin"],
    ["崩坏：星穹铁道(中文Tag)","崩坏：星穹铁道"],
    ["崩坏：星穹铁道(英文Tag)","HonkaiStarRail"],
    ["明日方舟(中文Tag)","明日方舟"]
    ["明日方舟(英文Tag)","Arknights"]
  ];
  if(ImgNode==="vilipix插画世界"){
    for(i=0;i<vilipix_ImgTag.length;i++){
      var opt = new Option(vilipix_ImgTag[i][0],vilipix_ImgTag[i][1]);
      ImgTagSelect.options.add(opt);
    }
  }
}

