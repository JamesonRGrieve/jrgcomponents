export default function deepMerge(...objects: any[]) {
  const deepCopyObjects = objects.map((object) => JSON.parse(JSON.stringify(object)));
  return deepCopyObjects.reduce((merged, current) => ({ ...merged, ...current }), {});
}
