export const openai = {

name:"openai",

async run({prompt}){

if(!process.env.OPENAI_API_KEY){

return {
data:"[OPENAI MOCK] "+prompt
};

}

try{

const mod =
  await import("openai");

const client =
  new mod.default({
    apiKey:
      process.env.OPENAI_API_KEY
  });

const response =
  await client.chat.completions.create({

    model:"gpt-4o-mini",

    messages:[
      {
        role:"user",
        content:prompt
      }
    ]

  });

return {
data:
response.choices[0]
.message.content
};

}catch(err){

return {
data:"[OPENAI FALLBACK] "+prompt
};

}

}

};
