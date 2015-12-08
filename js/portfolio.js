$(document).ready(function(){

  $(".list-group-item").on("click",function(e){
    e.preventDefault();

    $.ajax({
      type :"GET",
      url : $(this).attr("href"),
      content_security_policy: "default-src 'self' style-src 'self' 'unsafe-inline'", 
      //content_security_policy: "unsafe-inline", 
      Content_Security_Policy: "script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='",
      success : gitCommitApiSuccessHandler
    });
    
    function gitCommitApiSuccessHandler (commits){
      for (i=0 ; i <commits.length; i++){
        var newCommitRecord = buildCommitRecord(commits[i]);         
      }
    }

    function buildCommitRecord (commitsRecords) {
      var commitSha = commitsRecords.sha;
      var commitAuthor = commitsRecords.commit.author.name;
      var commitDate = commitsRecords.commit.author.date;
      var commitMessage = commitsRecords.message;

      console.log (commitSha+"author"+commitAuthor+"Date"+commitDate+"Message"+commitMessage);
    }

  }); //When repo link is clicked

  //To get the github details
  $.ajax({
    type : "GET",
    url : "https://api.github.com/users/c-das/repos",
    success : githubSuccessApiHandler 
  }); //End Github Ajax Query to pull Repos

  function githubSuccessApiHandler (repoList) {

    for(i=0; i <repoList.length ; i++){
        var newRepo = buildRepoList(repoList[i]);
        $(".list-group").append(newRepo); //Add the repo link to the DOM 
        //console.log(repoList[i]); // Creates Repolist in the console
      }  
  }

  function buildRepoList (repoData) {

    var commitsApiUrl = "https://api.github.com/repos/";
    commitsApiUrl += repoData.owner.login + "/";
    commitsApiUrl += repoData.name + "/commits";

    console.log(commitsApiUrl);

    var newLink = $("<a>")
              .attr("href",commitsApiUrl)
              .addClass("list-group-item")
              .append(repoData.full_name);

    return newLink;
  }

});
