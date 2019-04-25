# Finding-Difference-between-two-JSON-files

<br> This code helps to find the difference between two JSON objects 

<br>For example
<br>We have the objects "madrid" and "barca"

<br>var madrid = '{"type":"team","description":"Good","trophies":[{"ucl":"10"}, {"copa":"5"}]}';
<br>var barca = '{"type":"team","description":"Bad","trophies":[{"ucl":"3"}, {"copa":"5"}]}';

<br>And, the difference between these two objects would be: 
<br>madrid ---> "description": "Good","trophies":"ucl":"10";
<br>barca  ---> "description" : "Bad","trophies":"ucl":"3";

<br>The differences can be highlighted with a different color palette to make it more obvious. 
