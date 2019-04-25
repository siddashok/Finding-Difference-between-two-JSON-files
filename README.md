# Finding-Difference-between-two-JSON-files

This code helps to find the difference between two JSON objects

For example: 
We have the objects "madrid" and "barca"

var madrid = '{"type":"team","description":"Good","trophies":[{"ucl":"10"}, {"copa":"5"}]}';
var barca = '{"type":"team","description":"Bad","trophies":[{"ucl":"3"}, {"copa":"5"}]}';

And, the difference between these two objects would be: 
madrid ---> "description": "Good","trophies" :"ucl":"10"}';
barca  ---> "description" : "Bad","trophies":"ucl":"3";

The differences can be highlighted with a different color palette to make it more obvious. 
