export let AILib: any;

try {
  const req = require('@lukasolsen/logpulse-ai');
  AILib = req.AI;
} catch (e) {
  AILib = null;
}
