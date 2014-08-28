$(document).ready(function(){
  $("#test").on('click', calculateOutput);
  $("#input_box").keyup(function(event){
      if(event.keyCode == 13){
          $("#test").click();
      }
  });

  $('#clear').on('click', function(){
    $('#output').html('');
    $('#input_box').val('');
  });
});

  function calculateOutput() {
    var inputString = $('#input_box').val();
    if(inputString.charAt(0).search(/\"/) !== -1){
      inputString = inputString.substr(1);
    }
    if(inputString.charAt(inputString.length - 1).search(/\"/) !== -1){
      inputString = inputString.substr(0,inputString.length - 1);
    }
    var outputString = psTitlecase(inputString);
    var outputStringArray = outputString.split(" ");
    var modArray = [];
    var inputStringArray = inputString.split(" ");
    for(i = 0; i < inputStringArray.length; i++){
      if(inputStringArray[i].search(outputStringArray[i]) == -1){
        modArray.push(i);
      }
    }
    $('#output').html(outputString);
    for(i = 0; i < modArray.length; i++){
      $('#output').highlight(outputStringArray[modArray[i]], { caseSensitive: true });
    }
  }


var termIterator = 0;
var techDictionary = ["HTML5", ".NET", "AngularJS", "CSS", "Grunt.js", "Ajax", "Node.js", "iOS", "F#", "C#", "C++", "XPath", "SQL", "Java", "MVC", "Grunt", "App", "HTTP", "SAP", "Sass", "User", "XAML", "GitHub", "Seq", "Node", "iAD", "Ruby", "BizTalk", "ESB", "Bus", "VBA", "RxJava", "Solr", "Play", "phpMyAdmin", "Web", "ASP", "REST", "RESTful", "Durandal.js", "Scala", "Qt", "ExtJS", "MVVM ", "Unit", "XCTest", "Kodu", "scriptcs", "POV-Ray", "TestStack", "OWASP", "MongoDB", "SharePoint", "Apps", "Data", "D3.js", "JAX-WS", "CXF", "ABAP", "Play!", "API", "D", "DotNetNuke", "WCF", "MySQL", "LightSwitch", "WebRTC", "XSLT", "WPF", "Transact-SQL", "Art", "Svcs", "SignalR", "Win", "WP8", "CodedUI", "SpecFlow", "Tips", "AutoPlay", "NetBeans", "WordPress", "PyGame", "Unity3D", "T-SQL", "tSQLt", "WinJS", "JavaScript", "IndexedDB", "File", "Lua", "ServiceStack", "CakePHP", "SkyDrive", "AWS", "PowerShell", "ADO.NET", "NDepend", "OS", "Bash", "Backbone.JS", "xUnit.net", "CUDA", "Lite", "JustMock", "MVVM", "LINQ", "UML", "URL", "JIRA", "log4net", "ORM", "loC", "EF", "UI", "Mac", "OAuth2", "Oauth", "OpenID", "JSON", "JWT", "Pi", "MVC4", "FitNesse", "CLR", "NCrunch", "COM", "JUnit", "PhoneGap", "PC", "MATLAB", "BigQuery", "III", "II", "Get", "Direct2D", "ColdFusion", "N-Tier", "RSpec", "APIs", "Chef", "Objective-C", "XNA", "ExpressJS", "IntelliTrace", "ALM", "TFS", "XRM", "ActionBar", "FakeItEasy", "MonoGame", "MEF", "Moq", "FireBug", "NuGet", "JsRender", "TCP/IP", "TCP", "IP", "NoSQL", "NHibernate", "PostgreSQL", "LESS", "SASS", "RavenDB", "OData", "T4", "SVN", "StreamInsight", "Git", "XQuery", "Code", "WebMatrix", "Vim", "Prototype.js", "iPhone", "IronRuby", "VSTS", "MacRuby", "CouchDB", "VB6", "VB.NET", "WMI", "DbContext", "IIS", "CoffeeScript", "WF4", "TDD", "MSBuild", "PRISM", "EventMachine", "ReSharper", "AppFabric", "Blog", "CSOM", "MSIL", "Log", "ORMs", "Math", "MDX", "Riak", "CRM", "SEO", "GamesSalad", "RabbitMQ", "XML", "Core", "AppBuilder", "jQuery", "PerformancePoint", "OLTP", "iOS7", "MEAN", "PostSharp", "ISV", "C", "PHP", "Zend", "ENCOG"];

function psTitlecase(inputString) {
  var inputArray = inputString.split(" ");
  // if inputArray[0].charAt(0).match(/"/){}
  var lowerCaseTechDictionary = techDictionary.map(function (txt){
    return txt.substr(0).toLowerCase();
  });
  var lonelyTechTerms = [];
  var lonelyPunctuation = [];
  // remove trailing commas and colons from words, send them to the lonelyPunctuation bucket
  var twitterizedArray = inputArray.map(function (txt) {
    if(txt.search(/[,:\.]$/) !== -1){
      var indexOfPunctuation = txt.length - 1;
      punctuation = {
        index: inputArray.indexOf(txt),
        value: txt.substr(indexOfPunctuation)
      };
      lonelyPunctuation.push(punctuation);
      return txt.substr(0, indexOfPunctuation);
    } else {
      return txt;
    }
  });
  
  // downcase everything
  var lowerCaseArray = twitterizedArray.map(function (txt){
    return txt.substr(0).toLowerCase();
  });

  //move any elements matching items in techDictionary to an array, keeping track of their position
  // replace them with 'xxx' so that things like the hyphen rule wont f**** em up.
  var sanitizedArray = [];
  for(var i = 0; i < twitterizedArray.length; i++){
    if(lowerCaseTechDictionary.indexOf(lowerCaseArray[i]) !== -1){
      var techTerm = {
          index: i,
          term: techDictionary[lowerCaseTechDictionary.indexOf(lowerCaseArray[i])]
      };
      lonelyTechTerms.push(techTerm);
      sanitizedArray.push('xxx');
    }else{
      sanitizedArray.push(twitterizedArray[i]);
    }
  }

  var stageOne = sanitizedArray.map(function (txt) {
    // get the number of chars in a word minus special chars
    var specialCharCount, txtLength;
    if(txt.search(/[^A-z]/g) !== -1){
      specialCharCount = txt.match(/[^A-z]/g).length;
    } else {
      specialCharCount = 0;
    }
    txtLength = txt.length - specialCharCount;
    // lowercase it if it's neither the first nor last word, and it's less than 5 A-z chars
    if(txtLength < 5 && (twitterizedArray.indexOf(txt) !== 0) && (twitterizedArray.indexOf(txt) !== twitterizedArray.length - 1)){
      return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      // else upcase it
    } else {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}
  });

  // catch the small words that SHOULD be upcase
  var uppers = ['are', 'is', 'my', 'was', 'i', "be", "we", "we're", "isn't", "web", "page"];
  var stageTwo = stageOne.map(function (txt) {
    if (uppers.indexOf(txt) != -1) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    } else {return txt;}
  });

  // return the lonelyPunctuation
  if(lonelyPunctuation.length > 0){
    for(i = 0; i < lonelyPunctuation.length; i++){
      stageTwo[lonelyPunctuation[i].index] = stageTwo[lonelyPunctuation[i].index] + lonelyPunctuation[i].value;
    }
  }

  // catch the word after a colon
  var stageThree = [];
  for (i = 0; i < stageTwo.length; i += 1) {
    if (stageTwo[i].match(":","g") === null) {
      stageThree.push(stageTwo[i]);
    } else {
      stageThree.push(stageTwo[i]);
      stageThree.push(stageTwo[i + 1].charAt(0).toUpperCase() + stageTwo[i + 1].substr(1).toLowerCase());
      i += 1;
    }
  }

  // return the lonelyTechTerms to the string
  if(lonelyTechTerms.length > 0){
    var finalStage = [];
    for(i = 0, j = 0; i < stageThree.length; i++){
      if(stageThree[i].match("xxx","g") !== null){
        // add in punctuation if it's there
        finalStage.push(lonelyTechTerms[j].term + stageThree[i].substr(3,1));
        j++;
      } else {
        // catch vs.
        if(stageThree[i].match("vs$") !== null){
          finalStage.push("vs.");
          print('yep');
        } else {
        finalStage.push(stageThree[i]);
      }
      }
    }
  } else {
    var finalStage = stageThree;
  }

  return finalStage.join(" ");
}
