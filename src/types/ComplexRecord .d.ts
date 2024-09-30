export type AnyType =
  | Record<
      string,
      | string
      | number
      | boolean
      | Record<string, string>
      | string[]
      | number[]
      | boolean[]
      | AnyType
      | AnyType[]
    >
  | string
  | number
  | boolean
  | AnyType
  | AnyType[];
