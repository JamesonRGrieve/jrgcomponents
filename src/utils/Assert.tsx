export default function assert(test: boolean, message?: string | undefined) {
  if (!test) throw new Error('Assertion Failure: ' + (message ?? 'No message provided.'));
}
