import { useEffect } from 'react';

export function assert(test: boolean, message?: string | undefined) {
  if (!test) throw new Error('Assertion Failure: ' + (message ?? 'No message provided.'));
}

export default function useAssertion(assertion: boolean, message: string, dependencies: []) {
  useEffect(() => {
    assert(assertion, message);
  }, [assertion, message, dependencies]);
}
