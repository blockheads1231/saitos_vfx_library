import APIItem from "./components/APIItem"

export function useMDXComponents(components: Record<string, any>) {
  return {
    APIItem,
    ...components,
  }
}