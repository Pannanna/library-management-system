export function LogMethod(
  _target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    console.log(`[LOG] ${propertyKey} hívás`, args);
    return original.apply(this, args);
  };

  return descriptor;
}