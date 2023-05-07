function GetCommitData(CommitNum=1){//默认只获取最新的一条commit历史
    //https://api.github.com/repos/Zichen3317/MyBlog_Display/commits
    //返回内容结构:[{"commit":{"commiter":{"date":"2023-05-07T04:20:13Z"},"message": "1.2.2.3.2"}}]
    console.debug("[RandomImg.js][GetCommitData]开始获取");
    var commit_data=[];
    fetch("https://api.github.com/repos/Zichen3317/MyBlog_Display/commits", {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.debug(data)
        if(data.length>=CommitNum && CommitNum!==1){
          for(i=0;i<CommitNum;i++){
            commit_data.push({"time":data[i]["commit"]["committer"]["date"].split(".")[0].replace("T"," ").replace("Z"," "),
          "message":data[i]["commit"]["message"]})
          }
        }else{
          commit_data.push({"time":data[0]["commit"]["committer"]["date"].split(".")[0].replace("T"," ").replace("Z"," "),
          "message":data[0]["commit"]["message"]})
        }
        //处理完毕后开始写入
        console.debug("[RandomImg.js][GetCommitData]开始写入");
        const Commit_div = document.getElementById("Commit");
        let commitContent = "";
        for(i=0;i<commit_data.length;i++){
          commitContent += `
          <span style="color:rgb(181, 40, 203)">[${commit_data[i]["time"]}]&nbsp;--&nbsp;</span><span style="color: rgb(195, 128, 3)">${commit_data[i]["message"]}</span><br>
          `
          //console.debug(commit_data[i]["time"]+" --- "+commit_data[i]["message"])
        };
  
        Commit_div.innerHTML = commitContent;
        console.debug("[RandomImg.js][GetCommitData]完成写入");
      })
      .catch((error) => console.error(error));
  
    }