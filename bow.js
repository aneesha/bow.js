"use strict";

// Javascript implementation to create Bag of Words (BOW) models
// (i.e document-term matrix)

var bow = (typeof exports === "undefined")?(function bow() {}):(exports);
if(typeof global !== "undefined") { global.bow = bow; }

bow.version = "0.5";

bow.tokenizer = function tokenizer(obj) {
  if (!arguments.length || obj == null || obj == undefined) return []

  var str = obj.toString().replace(/^\s+/, '')

  for (var i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1)
      break;
    }
  }

  return str
    .split(/\s+/)
    .map(function (token) {
      return token.replace(/^\W+/, '').replace(/\W+$/, '').toLowerCase()
    })
}

bow.removestopwords = function removestopwords(obj) {
  if (!arguments.length || obj == null || obj == undefined) return []

  var stopwords = ["a", "about", "above", "above", "across", "after",
    "afterwards", "again", "against", "all", "almost", "alone", "along",
    "already", "also","although","always","am","among", "amongst",
    "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone",
    "anything","anyway", "anywhere", "are", "around", "as",  "at", "back",
    "be","became", "because","become","becomes", "becoming", "been",
    "before", "beforehand", "behind", "being", "below", "beside",
    "besides", "between", "beyond", "bill", "both", "bottom","but",
    "by", "call", "can", "cannot", "cant", "co", "con", "could",
    "couldnt", "cry", "de", "describe", "detail",  "do", "does", "done",  "down",
    "due", "during", "each", "eg", "eight", "either", "eleven","else",
    "elsewhere", "empty", "enough", "etc", "even", "ever", "every",
    "everyone", "everything", "everywhere", "except", "few", "fifteen",
    "fify", "fill", "find", "fire", "first", "five", "for", "former",
    "formerly", "forty", "found", "four", "from", "front", "full",
    "further", "get", "give", "go", "had", "has", "hasnt", "have",
    "he", "hence", "her", "here", "hereafter", "hereby", "herein",
    "hereupon", "hers", "herself", "him", "himself", "his", "how",
    "however", "hundred", "ie", "if", "in", "inc", "indeed",
    "interest", "into", "is",  "it", "its", "itself", "keep",
    "last", "latter", "latterly", "least", "less", "ltd", "made",
    "many", "may", "me", "meanwhile", "might", "mill", "mine",
    "more", "moreover", "most", "mostly", "move", "much", "must", "my",
    "myself", "name", "namely", "neither", "never", "nevertheless", "next",
    "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now",
    "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto",
    "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out",
    "over", "own","part", "per", "perhaps", "please", "put", "rather", "re",
    "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several",
    "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so",
    "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere",
    "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them",
    "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore",
    "therein", "thereupon", "these", "they", "thick", "thin", "third", "this",
    "those", "though", "three", "through", "throughout", "thru", "thus", "to",
    "together", "too", "top", "toward", "towards", "twelve", "twenty", "two",
    "un", "under", "until", "up", "upon", "us", "very", "via", "was", "way", "we",
    "well", "were", "what", "whatever", "when", "whence", "whenever", "where",
    "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever",
    "whether", "which", "while", "whither", "who", "whoever", "whole", "whom",
    "whose", "why", "will", "with", "within", "without", "would", "yet", "you",
    "your", "yours", "yourself", "yourselves", "the",
    // contractions?
    "didnt", "doesnt", "dont", "isnt", "wasnt", "youre", "hes", "ive", "theyll",
    "whos", "wheres", "whens", "whys", "hows", "whats", "were", "shes", "im", "thats"
    ];
    
    var filtered_text = [];
    
    for (var i in obj) 
    {
      if (stopwords.indexOf(obj[i])==-1)
      {
        filtered_text.push(obj[i]);
      }
    }
    
    return filtered_text;
}

bow.makevocabulary = function makevocabulary(obj) {
  if (!arguments.length || obj == null || obj == undefined) return []

  var vocabulary = [];
  for (var doc in obj) 
  {
    for (var i in obj[doc])
    {
      if (vocabulary.indexOf(obj[doc][i])==-1)
      {
        vocabulary.push(obj[doc][i]);
      }
    }
  }
  return vocabulary;
}

bow.makematrix = function makematrix(vocab_obj,obj) {
  if (!arguments.length || obj == null || obj == undefined) return []

  var vocab_size = vocab_obj.length;
  var document_size = obj.length;
  var matrix = numeric.rep([document_size,vocab_size],0);
  
  for (var doc=0; doc<obj.length; doc++)
  {
    for (var term=0; term<vocab_obj.length; term++)
    {
      var vocab_pos = vocab_obj.indexOf(obj[doc][term]);
      if (vocab_pos!=-1)
      {
        matrix[doc][vocab_pos] += 1;
      }
    }
  }
  return matrix;
}
