async function pipetest(word) {
  //Dynamic import instead
  const transformers = await import('@xenova/transformers');
  const pipe = await transformers.pipeline('summarization');
  const out = await pipe(word);
  console.log(out[0].summary_text);
  return out;
}

console.log(pipetest('The tower isqweqweasd'));
console.log(pipetest('The tower isqweqweasd'));
