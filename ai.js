async function generateAIQuestion(topic){

try{

const API_KEY =
"enter your API key here";

const response = await fetch(

`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,

{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

contents:[{

parts:[{
text:
`Create 1 simple MCQ question on ${topic}
with 4 options and one correct answer.`
}]

}]
})
}
);

const data = await response.json();

console.log(data);

if(data.candidates){

const result =
data.candidates[0]
.content.parts[0].text;

alert(result);

}else{

console.log(data);

alert("No response from AI");
}

}catch(error){

console.log(error);

alert("API Error");
}
}