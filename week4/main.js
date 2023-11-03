var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://your-github-username.github.io/your-repositoryname/cities1.json');
ourRequest.onload = function() {
var ourData = ourRequest.responseText;
console.log(ourData[0]);
};
ourRequest.send();
