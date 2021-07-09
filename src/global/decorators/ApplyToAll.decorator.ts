/* eslint-disable @typescript-eslint/ban-types */

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApplyToAll(
  decorator: MethodDecorator,
  options: { exclude?: string[] },
): ClassDecorator {
  return (target: Function): void => {
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);

    for (const [propName, descriptor] of Object.entries(descriptors)) {
      const isMethod = typeof descriptor.value === 'function' && propName !== 'constructor';
      if (options.exclude?.includes(propName) || !isMethod)
        continue;

      decorator(target, propName, descriptor);
      Object.defineProperty(target.prototype, propName, descriptor);
    }
  };
}
