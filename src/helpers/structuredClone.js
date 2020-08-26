import v8 from 'v8';

export default function structuredClone(obj) {
  return v8.deserialize(v8.serialize(obj));
}
